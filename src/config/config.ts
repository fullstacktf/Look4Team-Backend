export default {
  jwtSecret: 'supersecret',
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://db:27017/look4team'
};
