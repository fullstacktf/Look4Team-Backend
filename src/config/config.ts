export default {
  jwtSecret: 'supersecret',
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://127.0.0.1:27017/look4team'
};
