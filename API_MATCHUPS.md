# API de Matchups - Age of Empires IV

Esta documentação descreve os endpoints disponíveis na API de matchups para o Age of Empires IV.

## Base URL

```
/api/matchups
```

## Endpoints

### Obter Todos os Matchups

```
GET /api/matchups
```

Retorna uma lista paginada de todos os matchups com opções de filtragem.

**Parâmetros de Query:**
- `page` (opcional): Número da página (default: 1)
- `limit` (opcional): Quantidade de itens por página (default: 10)
- `civilization` (opcional): Filtrar por civilização (pode ser civilization1 ou civilization2)
- `mapType` (opcional): Filtrar por tipo de mapa
- `strategyType` (opcional): Filtrar por tipo de estratégia (Ataque, Defesa, Geral)

**Exemplo de Resposta:**
```json
{
  "success": true,
  "count": 10,
  "total": 324,
  "page": 1,
  "pages": 33,
  "data": [
    {
      "civilization1": "Abássidas",
      "civilization2": "Chineses",
      "mapTypes": [...],
      "generalTips": {...},
      "counterUnits": {...},
      "modSpecificStrategies": [...],
      "alternativeStrategies": [...],
      ...
    },
    ...
  ]
}
```

### Obter Estatísticas dos Matchups

```
GET /api/matchups/stats
```

Retorna estatísticas gerais sobre os matchups disponíveis.

**Exemplo de Resposta:**
```json
{
  "success": true,
  "data": {
    "totalMatchups": 324,
    "uniqueCivilizations": {
      "count": 18,
      "list": ["Ingleses", "Franceses", ...]
    },
    "strategiesStats": {
      "attack": 324,
      "defense": 324,
      "team": 2
    },
    "mapTypes": [
      {
        "_id": "Planícies Abertas",
        "count": 324
      },
      ...
    ]
  }
}
```

### Obter Estratégias por Tipo

```
GET /api/matchups/strategies/:type
```

Retorna todas as estratégias do tipo especificado (Ataque, Defesa, Geral).

**Parâmetros de Path:**
- `type`: Tipo de estratégia (Ataque, Defesa, Geral)

**Parâmetros de Query:**
- `civilization` (opcional): Filtrar por civilização

**Exemplo de Resposta:**
```json
{
  "success": true,
  "count": 18,
  "data": [
    {
      "name": "Estratégia de Ataque para Ingleses",
      "description": "Uma abordagem ofensiva focada em pressão early game usando os pontos fortes de Ingleses",
      "civilization": "Ingleses",
      "early": [...],
      "mid": [...],
      "late": [...],
      "units": [...],
      "technologies": [...],
      "strategyType": "Ataque"
    },
    ...
  ]
}
```

### Obter Matchups por Tipo de Mapa

```
GET /api/matchups/maps/:mapType
```

Retorna todos os matchups que incluem o tipo de mapa especificado.

**Parâmetros de Path:**
- `mapType`: Nome do tipo de mapa (ex: "Planícies Abertas", "Montanha", "Floresta", etc.)

**Exemplo de Resposta:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "civilization1": "Ingleses",
      "civilization2": "Franceses",
      "mapTypes": [...],
      ...
    },
    ...
  ]
}
```

### Obter Matchups por Civilização

```
GET /api/matchups/civilization/:civ
```

Retorna todos os matchups para uma civilização específica (onde a civilização é civilization1 ou civilization2).

**Parâmetros de Path:**
- `civ`: Nome da civilização

**Exemplo de Resposta:**
```json
{
  "success": true,
  "count": 17,
  "data": [
    {
      "civilization1": "Ingleses",
      "civilization2": "Franceses",
      ...
    },
    {
      "civilization1": "Ingleses",
      "civilization2": "Mongóis",
      ...
    },
    ...
  ]
}
```

### Obter Matchup Específico

```
GET /api/matchups/:civ1/:civ2
```

Retorna o matchup entre duas civilizações específicas.

**Parâmetros de Path:**
- `civ1`: Nome da primeira civilização
- `civ2`: Nome da segunda civilização

**Exemplo de Resposta:**
```json
{
  "success": true,
  "data": {
    "civilization1": "Ingleses",
    "civilization2": "Franceses",
    "mapTypes": [...],
    "generalTips": {...},
    "counterUnits": {...},
    "modSpecificStrategies": [...],
    "teamStrategies": [...],
    "alternativeStrategies": [...]
  }
}
```

### Criar Novo Matchup

```
POST /api/matchups
```

Cria um novo matchup entre duas civilizações.

**Corpo da Requisição:**
```json
{
  "civilization1": "Nome da Civilização 1",
  "civilization2": "Nome da Civilização 2",
  "mapTypes": [...],
  "generalTips": {...},
  "counterUnits": {...},
  "modSpecificStrategies": [...],
  "alternativeStrategies": [...],
  "teamStrategies": [...]
}
```

**Exemplo de Resposta:**
```json
{
  "success": true,
  "message": "Matchup entre Nome da Civilização 1 e Nome da Civilização 2 criado com sucesso",
  "data": {
    "civilization1": "Nome da Civilização 1",
    "civilization2": "Nome da Civilização 2",
    ...
  }
}
```

### Atualizar Matchup Existente

```
PUT /api/matchups/:civ1/:civ2
```

Atualiza um matchup existente entre duas civilizações. Permite adicionar ou modificar partes específicas do matchup sem substituir completamente.

**Parâmetros de Path:**
- `civ1`: Nome da primeira civilização
- `civ2`: Nome da segunda civilização

**Corpo da Requisição (Exemplo para atualizar apenas mapTypes):**
```json
{
  "mapTypes": [
    {
      "mapName": "Novo Tipo de Mapa",
      "advantage": "Civilization1",
      "strategies": {...}
    }
  ]
}
```

**Exemplo de Resposta:**
```json
{
  "success": true,
  "message": "Matchup entre Nome da Civilização 1 e Nome da Civilização 2 atualizado com sucesso",
  "data": {
    "civilization1": "Nome da Civilização 1",
    "civilization2": "Nome da Civilização 2",
    ...
  }
}
```

### Busca Avançada de Matchups

```
POST /api/matchups/search
```

Permite buscar matchups usando múltiplos critérios de filtragem.

**Corpo da Requisição:**
```json
{
  "civilizations": ["Ingleses", "Franceses"],
  "mapTypes": ["Planícies Abertas", "Floresta"],
  "strategyTypes": ["Ataque", "Defesa"],
  "units": ["Longbow", "Knight"],
  "technologies": ["Sanctity", "Táticas de Cavalaria"],
  "modNames": ["Empire Wars", "Regicide"],
  "teamSizes": ["2v2", "3v3"],
  "page": 1,
  "limit": 10
}
```

**Exemplo de Resposta:**
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "page": 1,
  "pages": 2,
  "data": [
    {
      "civilization1": "Ingleses",
      "civilization2": "Franceses",
      ...
    },
    ...
  ]
}
```

### Excluir um Tipo de Mapa de um Matchup

```
DELETE /api/matchups/:civ1/:civ2/maps/:mapName
```

Remove um tipo de mapa específico de um matchup existente.

**Parâmetros de Path:**
- `civ1`: Nome da primeira civilização
- `civ2`: Nome da segunda civilização
- `mapName`: Nome do tipo de mapa a ser removido

**Headers:**
- `Authorization`: Bearer [seu_token_jwt]

**Exemplo de Resposta:**
```json
{
  "success": true,
  "message": "Tipo de mapa Planícies Abertas removido com sucesso do matchup entre Ingleses e Franceses",
  "data": {
    "civilization1": "Ingleses",
    "civilization2": "Franceses",
    ...
  }
}
```

### Excluir uma Estratégia Alternativa

```
DELETE /api/matchups/:civ1/:civ2/strategies/:strategyType/:civilization
```

Remove uma estratégia alternativa específica de um matchup.

**Parâmetros de Path:**
- `civ1`: Nome da primeira civilização
- `civ2`: Nome da segunda civilização
- `strategyType`: Tipo da estratégia (Ataque, Defesa, Geral)
- `civilization`: Nome da civilização para qual a estratégia foi criada

**Headers:**
- `Authorization`: Bearer [seu_token_jwt]

**Exemplo de Resposta:**
```json
{
  "success": true,
  "message": "Estratégia do tipo Ataque para Ingleses removida com sucesso do matchup entre Ingleses e Franceses",
  "data": {
    "civilization1": "Ingleses",
    "civilization2": "Franceses",
    ...
  }
}
```

## Autenticação

Alguns endpoints requerem autenticação:

- Todos os endpoints de criação (POST)
- Todos os endpoints de atualização (PUT)
- Todos os endpoints de exclusão (DELETE)

Para autenticar, inclua o header de Authorization:

```
Authorization: Bearer [seu_token_jwt]
```

### Níveis de Acesso

- **Usuário Autenticado**: Pode adicionar, atualizar estratégias e remover partes específicas de matchups
- **Administrador**: Pode excluir matchups inteiros e realizar todas as operações

## Códigos de Status

- `200 OK`: Requisição bem-sucedida
- `400 Bad Request`: Parâmetros inválidos
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## Exemplos de Uso

### Buscar Todos os Matchups com Ingleses
```
GET /api/matchups?civilization=Ingleses
```

### Buscar Matchups com Estratégias de Ataque
```
GET /api/matchups?strategyType=Ataque
```

### Buscar Matchups em Mapas de Montanha
```
GET /api/matchups?mapType=Montanha
```

### Buscar Todos os Matchups dos Ingleses
```
GET /api/matchups/civilization/Ingleses
```

### Buscar Matchup Específico
```
GET /api/matchups/Ingleses/Franceses
```

### Buscar Estratégias de Defesa para os Mongóis
```
GET /api/matchups/strategies/Defesa?civilization=Mongóis
```

### Adicionar Novo Matchup
```
POST /api/matchups
Content-Type: application/json

{
  "civilization1": "Ingleses",
  "civilization2": "Sacro Império Romano-Germânico",
  "mapTypes": [...],
  ...
}
```

### Atualizar Estratégia de Ataque
```
PUT /api/matchups/Ingleses/Franceses
Content-Type: application/json

{
  "alternativeStrategies": [
    {
      "name": "Estratégia de Ataque Atualizada para Ingleses",
      "description": "Uma abordagem ofensiva aprimorada para Ingleses contra Franceses",
      "civilization": "Ingleses",
      "strategyType": "Ataque",
      "early": ["Nova tática early game"],
      "mid": ["Nova tática mid game"],
      "late": ["Nova tática late game"],
      "units": ["Longbow Melhorado", "Man-at-Arms"]
    }
  ]
}
```

### Busca Avançada por Múltiplos Critérios
```
POST /api/matchups/search
Content-Type: application/json

{
  "civilizations": ["Ingleses", "Mongóis"],
  "mapTypes": ["Planícies Abertas"],
  "units": ["Longbow", "Mangudai"]
}
```

### Excluir um Tipo de Mapa
```
DELETE /api/matchups/Ingleses/Franceses/maps/Floresta
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Excluir uma Estratégia
```
DELETE /api/matchups/Ingleses/Franceses/strategies/Ataque/Ingleses
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
``` 