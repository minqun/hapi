const { env } = process;
if (env.NODE_ENV == 'development') {
  require('env2')('./.env.dev');
} else {
  require('env2')('./.env.prod');
  
}
const config = {
  host: env.HOST,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  wxSecret: env.WX_APPSECRET,
  wxRollback: env.WX_ROLLBACK,
  wxAppid: env.APP_ID,
  wxPayApiKey: 'test'
};
module.exports = config;