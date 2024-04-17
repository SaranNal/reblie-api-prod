const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models");
const UserModel = db.users;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy =   new Strategy(opts, function (jwt_payload, done) {
  UserModel.findOne({
    where: { id: jwt_payload.id, status: true },
    attributes: ["id", "firstName", "lastName", "email", "token"],
  })
    .then((user) => {
      if (!user) {
        const customError = new Error('Custom unauthorized error message');
        return done(customError, false);
        // return done(null, false);
      }
      return done(null, user, { scope: user.email });
    })
    .catch((e) => {
      return done(e);
    });
});

passport.use(jwtStrategy);

const authenticateUser = passport.authenticate("jwt", { session: false,failWithError: true});
const authenticateUserConditional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return authenticateUser(req, res, next);
  }
  return next();
};

module.exports = {
  authenticateUser,
  authenticateUserConditional,
};
