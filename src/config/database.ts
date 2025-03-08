export const config = {
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/age4-strategy',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}; 