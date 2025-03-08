# Sistema de Matchups - Age of Empires IV

## Visão Geral

Este sistema fornece estratégias detalhadas para todos os possíveis confrontos (matchups) entre civilizações em Age of Empires IV. O banco de dados contém 324 matchups no total, cobrindo todas as combinações de civilizações jogando contra todas as outras.

## Estrutura dos Matchups

Cada matchup contém as seguintes informações:

- **Civilização 1 vs Civilização 2**: Identificação das duas civilizações envolvidas
- **Tipos de Mapa**: Estratégias específicas para diferentes tipos de mapa
  - Vantagem (Civilization1, Civilization2, ou Neutral)
  - Estratégias para cada civilização por fase do jogo (early, mid, late)
  - Unidades recomendadas
  - Tecnologias recomendadas
  - Landmarks importantes
- **Estratégias Alternativas**: Abordagens específicas de ataque e defesa
  - Estratégias de Ataque: Focadas em agressão e pressão early game
  - Estratégias de Defesa: Focadas em economia segura e superioridade late game
  - Cada estratégia inclui fases do jogo, unidades e tecnologias recomendadas
- **Dicas Gerais**: Recomendações gerais para cada civilização
- **Unidades Contra**: Detalhes sobre quais unidades são eficazes contra quais unidades inimigas
- **Estratégias para Modos Específicos**: Táticas para modos de jogo como Empire Wars e Regicide
- **Estratégias de Equipe**: (Para alguns matchups) Estratégias para jogos 2v2, 3v3 e 4v4
  - Papéis recomendados para cada civilização
  - Civilizações aliadas recomendadas
  - Sinergias entre civilizações
  - Táticas de equipe

## Tipos de Matchups

O sistema contém dois tipos de matchups:

1. **Matchups Detalhados**: 12 matchups completamente detalhados com estratégias específicas, unidades contra, e recomendações para diferentes tipos de mapa e modos de jogo.

2. **Matchups Básicos**: 313 matchups com estrutura básica que podem ser expandidos no futuro.

## Como Executar o Seed

Para popular o banco de dados com os matchups, você pode escolher entre duas opções:

1. **Apenas Matchups Detalhados**:
   ```
   npm run seed
   ```

2. **Todos os Matchups (Detalhados + Básicos)**:
   ```
   USE_COMPLETE_MATCHUPS=true npm run seed
   ```

## Configuração

A configuração para determinar qual método de seed usar está no arquivo `.env`:

```
USE_COMPLETE_MATCHUPS=false  # Usar apenas matchups detalhados
USE_COMPLETE_MATCHUPS=true   # Usar todos os matchups (324 total)
```

## Expansão Futura

O sistema foi projetado para permitir a expansão futura:

1. Os matchups básicos podem ser gradualmente aprimorados com estratégias mais detalhadas
2. Cada matchup já está preparado para suportar estratégias de ataque e defesa específicas
   - As estratégias de ataque focam em agressão, raides e pressão militar
   - As estratégias de defesa focam em desenvolvimento econômico seguro e superioridade no late game
3. Novas civilizações podem ser facilmente adicionadas ao sistema

## Civilizações Incluídas

O sistema atual suporta as seguintes civilizações:

1. Ingleses
2. Franceses
3. Russos (Rus)
4. Mongóis
5. Chineses
6. Abássidas
7. Sultanato de Delhi
8. Sacro Império Romano-Germânico
9. Otomanos
10. Bizantinos
11. Japoneses
12. Malianos
13. Ordem do Dragão
14. Zhu Xi's Legacy
15. Jeanne d'Arc
16. Ayyubids
17. Dinastia Qarahanid (Civilização futura)
18. Normandos (Civilização futura)

## Estatísticas

- Total de matchups: 324
- Matchups detalhados: 12
- Matchups básicos: 313
- Civilizações suportadas: 18
- Tipos de mapa com estratégias específicas: Variados por matchup 