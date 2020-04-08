// Ignore this mess
const express = require('express')
const next = require('next')
const DiscordOauth2 = require("discord-oauth2");
const dev = process.env.NODE_ENV !== 'production'
const app = next ({dev})
const handle = app.getRequestHandler()
const port = 3000
const session = require('express-session')

// Discord oauth variables
const oauth = new DiscordOauth2();
const client_id = "697087272050229339"
const client_secret = "JvzF9Eu_mvqCZRM0MPXrVsRh-T6V239R"
const scope = "indetify"
const redirect_uri = "http://localhost:3000/login"

// Lets next do its thing before doing server stuff
app.prepare().then(() =>{

  // Initializes express server
  const server = express()

  // the config for how the session variables are setup/stored
  sess_config = {
      secret: "legit good templates",
      cookie: {}
  }
  // cuz why not
  if (process.env.NODE_ENV === 'production'){
    sess_config.cookie.secure = true;
  }
  // make the server use the session
  server.use(session(sess_config))

  // Here all parsing handled by the server goes

  // Discord Oauth2 handeled on ./login
  server.get('/login', (req,res) => {
    // isset(req.query.code)
    if(typeof req.query.code !== 'undefined'){
      var token = oauth.tokenRequest({
        clientId: client_id,
        clientSecret: client_secret,
        code: req.query.code,
        scope: scope,
        grantType: "authorization_code",
        redirectUri: redirect_uri

      }).then((result)=>{
          if(typeof result.access_token !== 'undefined'){
            console.log(result);
            req.session.loggedin = true;
            res.redirect("/");
          }else{
            res.send("That didnt work. Please contact support and we will look into it.");
          }

      })
    }else{
      if (req.session.loggedin !== true){
        res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=697087272050229339&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify");
      }else{
      // if logged in, why are they here
        res.redirect("/");
      }
    }




    // if not logged in, redirect to discords auth page



  })

  // let next handle the rest, to make it easy for the rest of you
  server.get('*', (req, res) => {
    return handle(req,res);
  })


  // host the server
  server.listen(port, (err) => {
    if(err) throw err
    console.log("Hosting on localhost:3000")

  })

});
