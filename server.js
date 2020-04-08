// Ignore this mess
const express = require('express')
const next = require('next')
const mysql = require("mysql")
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
  var database = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "test123"
  });
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

  //
  //   IMPORTANT TODO: IF PLAYER HAVE BEEN SEEMLESLY CONNECTED FOR MORE THAN A WEEK, WE HAVE TO GET A REAUTH TOKEN
  //     STORE TOKEN / TOKENDATE / REAUTH TOKEN IN DATABASE?
  //


  server.get('/login', (req,res) => {
    // isset(req.query.code)
    if(typeof req.query.code !== 'undefined'){
      // sending a token request to steam
      var token = oauth.tokenRequest({
        clientId: client_id,
        clientSecret: client_secret,
        code: req.query.code,
        scope: scope,
        grantType: "authorization_code",
        redirectUri: redirect_uri

      // Have to grant login or not when the response is acctually recieved
      }).then((result)=>{
          if(typeof result.access_token !== 'undefined'){
            // Get user info
            oauth.getUser(result.access_token).then((user_data)=>{
              console.log(user_data);
              req.session.username = user_data.username;
              req.session.profile_picture = "https://cdn.discordapp.com/avatars/" + user_data.id + "/" + user_data.avatar + ".jpeg"
              // Check if user is already in database, if not, add him/her (can be done in background)

              database.connect((err) => {

                if ( err ) throw err;

                // console.log("connected!");

                database.query("select * from discordstyle.users where discord_id="+ user_data.id, (err, result) =>{

                  if (err) throw err;

                  // If i dont get a result of 1 or "more", i should add them
                  if(!result.length>0){
                    database.query("insert into discordstyle.users(discord_id, username, profile_created, profile_pic) values ('"+user_data.id+"','"+user_data.username+"','"+Date.now()+"','"+ req.session.profile_picture +"')", (err, result)=>{
                        if (err) throw err;

                        console.log("added user ");
                    })
                  }

                  //console.log("Result: " + result);

                });

              })

              req.session.loggedin = true;
              res.redirect("/");
            })

          }else{
            res.send("That didnt work. Please contact support and we will look into it.");
          }
      })
    }else{
      if (req.session.loggedin !== true){
        //redirect to the discord auth page
        res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=697087272050229339&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify");
      }else{
      // if logged in, why are they here
        res.redirect("/");
      }
    }

  })

  server.get("/logout", (req, res) => {
    req.session.loggedin = false;
    res.redirect("/")
  })

  server.get('/templates/:id', (req, res) => {
    res.send(req.params.id);

  })

  server.get('/users/:id', (req,res) => {
    res.send(req.params.id);
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
