// Ignore this mess
require('dotenv').config()
const express = require('express')
const next = require('next')
const mysql = require('mysql')
const DiscordOauth2 = require('discord-oauth2')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3000
const session = require('express-session')
const request = require('request')

// Discord oauth variables
const oauth = new DiscordOauth2()
const client_id = process.env.DISCORD_CLIENT_ID
const client_secret = process.env.DISCORD_CLIENT_SECRET
const scope = 'indetify'
const redirect_uri = 'http://localhost:3000/login'

// Lets next do its thing before doing server stuff
app.prepare().then(() => {
  // Initializes express server
  const server = express()
  var database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })
  // the config for how the session variables are setup/stored
  sess_config = {
    secret: 'legit good templates',
    cookie: {}
  }
  // cuz why not
  if (process.env.NODE_ENV === 'production') {
    sess_config.cookie.secure = true
  }
  // make the server use the session
  server.use(session(sess_config))

  // Here all parsing handled by the server goes

  // Discord Oauth2 handeled on ./login

  //
  //   IMPORTANT TODO: IF PLAYER HAVE BEEN SEEMLESLY CONNECTED FOR MORE THAN A WEEK, WE HAVE TO GET A REAUTH TOKEN
  //     STORE TOKEN / TOKENDATE / REAUTH TOKEN IN DATABASE?
  //

  server.get('/login', (req, res) => {
    // isset(req.query.code)
    if (typeof req.query.code !== 'undefined') {
      // sending a token request to steam
      var token = oauth
        .tokenRequest({
          clientId: client_id,
          clientSecret: client_secret,
          code: req.query.code,
          scope: scope,
          grantType: 'authorization_code',
          redirectUri: redirect_uri

          // Have to grant login or not when the response is acctually recieved
        })
        .then((result) => {
          if (isset(result.access_token)) {
            // Get user info
            oauth.getUser(result.access_token).then((user_data) => {
              console.log(user_data)
              req.session.username = user_data.username
              req.session.profile_pic =
                'https://cdn.discordapp.com/avatars/' +
                user_data.id +
                '/' +
                user_data.avatar +
                '.jpeg'
              // Check if user is already in database, if not, add him/her (can be done in background)

              database.query(
                `select * from ${process.env.DB_DATABASE}.users where discord_id=` +
                  user_data.id,
                (err, result) => {
                  if (err) throw err

                  // If i dont get a result of 1 or "more", i should add them
                  if (!result.length > 0) {
                    database.query(
                      `insert into ${
                        process.env.DB_DATABASE
                      }.users(discord_id, username, profile_created, profile_pic) values ('${
                        user_data.id
                      }','${user_data.username}','${Date.now()}','${
                        req.session.profile_pic
                      }')`,
                      (err, result) => {
                        if (err) throw err
                        console.log('added user ')
                      }
                    )
                  }
                }
              )

              //})

              req.session.loggedin = true
              res.redirect('/')
            })
          } else {
            res.send(
              'That didnt work. Please contact support and we will look into it.'
            )
          }
        })
    } else {
      if (req.session.loggedin !== true) {
        //redirect to the discord auth page
        res.redirect(
          'https://discordapp.com/api/oauth2/authorize?client_id=697087272050229339&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify'
        )
      } else {
        // if logged in, why are they here
        var data = {
          loggedin: req.session.loggedin,
          username: req.session.username,
          profile_pic: req.session.profile_pic
        }
        res.send(JSON.stringify(data))
      }
    }
  })

  server.get('/logout', (req, res) => {
    req.session.loggedin = false
    res.redirect('/')
  })

  server.get('/templates', (req, res) => {
    /*
      params = {
        sort_by = posted | votes | views
      }
      */
    sort_by = ''
    if (isset(req.params.sort_by)) {
    } else {
    }
  })

  server.get('/templates/:id', (req, res) => {
    /*
    params = {
      id = an integer refering to the id of the template ( in our database )

    }
    */
    res.send(req.params.id)
  })

  // gets contents from template links
  server.get('/api/template/:id', (req, res) => {
    /*
    params = {
      id = an integer refering to the id of the template ( in discords system )

    }

    example :  https://discord.new/2ar44SuZ5vzA
                                  |-----------|
    */

    request.get(
      'https://discordapp.com/api/v6/guilds/templates/' + req.params.id,
      (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          res.send(body)
        } else {
          res.send('file dosent exist')
        }
      }
    )
  })

  // Self explainatory ( can you remove one function, and make this hackable? lol )
  server.get('/users/:id', (req, res) => {
    /*
    params = {
      id = an integer refering to the id of the user ( in our database )
    }
    */

    //database.connect((err) =>{
    //  if (err) throw err;

    database.query(
      'select * from discordstyle.users where user_id=' +
        parseInt(req.params.id),
      (err, result) => {
        if (err) throw err
        if (result.length > 0) {
          var data = result[0]
          res.send(JSON.stringify(data))
        } else {
          res.send('User does not exist')
        }
      }
    )

    //})
  })

  // let next handle the rest, to make it easy for the rest of you
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // host the server
  server.listen(port, (err) => {
    if (err) throw err
    console.log('Hosting on localhost:3000')
  })
})

function isset(x) {
  return typeof x !== 'undefined'
}
