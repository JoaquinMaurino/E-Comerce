import passport from "passport";

export const passportError = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res
          .status(401)
          .send({ error: info.message ? info.message : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const roleVerification = (roles) => {
  let condition;  
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "User not authorized" });
    }
    roles.forEach((roleSent) => {
      if (req.user.role !== roleSent) {
        condition = true
      } else {
        condition = false
      }
    });
    if(condition){
      return res.status(401).send({
        error: "User does not possess the required permissions",
      });
    }
    next();
  };
};
