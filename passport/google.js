const GoogleStrategy =
  require("passport-google-oauth").OAuth2Strategy;
const userQueries = require("../database/userQueries");

const googleConfig = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:3000/auth/gmail/callback",
};

function googleCallback(
  accessToken,
  refreshToken,
  profile,
  done
) {
  const user = {
    id: profile.id,
    username: profile.emails[0].value,
  };
  let username = profile.emails[0].value;
  console.log("Google Callback Function", user);
  let googleId = profile.id;
  console.log("Google id", googleId);
  userQueries
    .getByGmail(username)
    .then((queryRow) => {
      // I can grab the object back, based on the username that I passed in
      console.log("gmail ", queryRow[0]);
      if (queryRow.length === 0) {
        console.log("creating new user");
        // 1. print out the
        console.log(queryRow);
        userQueries
          .postGmail(postEmail, postId)
          .then(() => {
            console.log(
              "Just posted, trying to retrieve user "
            );
            userQueries
              .getByGmail(postEmail)
              .then((user) => {
                console.log("can grab ");
                console.log(user);
                return done(null, user);
              });
          });
        //   .then((newIds) => {
        //     console.log("New user", newIds);
        //     user.id = newIds[0];
        //     console.log("Posted user:", user);
        //     return done(null, user);
        //   });

        // 1. grab the user by email
        // pass it into the callback function
        // 3. check if it returns what you want
        // userQueries
        //   .getByGmail(postEmail)
        //   .then((user) => {
        //     console.log(
        //       "Let's see if we can grab the user"
        //     );
        //     console.log(user);
        //   })
        //   .catch((error) => {
        //     done(error, false, {
        //       message: "couldn't add user",
        //     });
        //   });
      } else {
        console.log("grabbing user");
        console.log(
          "user exists LOOK HERE - I WANT TO GRAB THE USER ID "
        );
        userQueries.getByGmail(username).then((user) => {
          console.log("Get id here please");
          console.log(user[0]);

          return done(null, user[0]);
        });
        // user.id = id;
      }
    })
    .catch((error) => {
      return done(error, false, {
        message: "Couldn't access database",
      });
    });
}
const google = new GoogleStrategy(
  googleConfig,
  googleCallback
);
module.exports = { google: google };
