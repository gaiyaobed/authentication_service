const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Options } = require('../config/gauth.config');
const User = require('../models/Users');
const { sendWelcomeMail } = require('../controllers/MessagingController/sendWelcomeMail');

passport.use(
  new GoogleStrategy(
    {
      ...Options,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({
          where: { email: profile.emails[0].value },
        });
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
            refresh_token: '',
            is_verified: true,
            provider: 'google',
          });

          if (user) {
            // new response to sign user in immediately after verification
            const fullName = `${user.first_name} ${user.last_name}`;
            // Todo: add await if needed later
            sendWelcomeMail(fullName, user.email);
          }

        }

        if (!user) throw new Error('Errors');
        request.user = user;
        cb(false, user);
      } catch (err) {
        cb(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(false, user.dataValues);
});
