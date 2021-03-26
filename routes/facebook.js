const   express   =     require("express"),
        mongoose = require("mongoose"),
        passport                       = require("passport"),
        LocalStrategy                  = require("passport-local"),
        FacebookStrategy                      = require("passport-facebook"),
        passportLocalMongoose          = require("passport-local-mongoose"),
        User                    = require("../models/user"),
        bodyParser =    require("body-parser");


        const userRouter = express.Router();

        userRouter.use(passport.initialize());
        userRouter.use(passport.session());
        passport.serializeUser(function(user, done) {
          done(null, user);
        });
        
        passport.deserializeUser(function(obj, done) {
          done(null, obj);
        });
var FACEBOOK_CLIENT_ID= 428790928218100;
var FACEBOOK_CLIENT_SECRET= "0efc172953db1554ff44e8b035b0145b";
var FACEBOOK_CALLBACK_URL= "http://localhost:3000/auth/facebook/callback";
        passport.use(
          new FacebookStrategy(
            {
              clientID: FACEBOOK_CLIENT_ID,
              clientSecret: FACEBOOK_CLIENT_SECRET,
              callbackURL: FACEBOOK_CALLBACK_URL,
              profileFields: ["email", "name"]
            },

            function(accessToken, refreshToken, profile, done) {
              const { username, name } = profile._json;
              const userData = {
                username:username,
                name: name,
            
              };
              new User(userData).save();
              done(null, profile);
            }
          )
        );




userRouter.get("/auth/facebook", passport.authenticate("facebook"));

userRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);




module.exports = userRouter;