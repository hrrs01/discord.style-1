const express = require('express')
const next = require('next')
const DiscordOauth2 = require("discord-oauth2");
const dev = process.env.NODE_ENV !== 'production'
const app = next ({dev})
const handle = app.getRequestHandler()
const port = 3000
const session = require('express-session')


const oauth = new DiscordOauth2();
const client_id = "697087272050229339"
const client_secret = "JvzF9Eu_mvqCZRM0MPXrVsRh-T6V239R"
const scope = "indetify"
const redirect_uri = "http://localhost:3000/login"


app.prepare().then(() =>{
  const server = express()

  sess_config = {
      secret: "legit good templates",
      cookie: {}
  }
  if (process.env.NODE_ENV === 'production'){
    sess_config.cookie.secure = true;
  }
  server.use(session(sess_config))

  server.get('/login', (req,res) => {
    if(typeof req.query.code !== 'undefined'){
      oauth.tokenRequest({
        clientId: client_id,
        clientSecret: client_secret,
        code: req.query.code,
        scope: scope,
        grantType: "authorization_code",
        redirectUri: redirect_uri

      }).then(console.log("yup"))
      req.session.loggedin = true;
    }

    if (req.session.loggedin == null){
      res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=697087272050229339&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify");
    }else{
      res.redirect("/");
    }


  })

  server.get('*', (req, res) => {
    return handle(req,res);
  })
  server.listen(port, (err) => {
    if(err) throw err
    console.log("Hosting on localhost:3000")

  })

});
