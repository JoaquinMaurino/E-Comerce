
export const roleVerification = (roles) => {
  let condition;
  return async (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send({ error: "User not authorized" });
    }
    roles.forEach((roleSent) => {
      if (req.session.user.role !== roleSent) {
        condition = true;
      } else {
        condition = false;
      }
    });
    if (condition) {
      return res.status(401).send({
        error: "User does not possess the required permissions",
      });
    }
    next();
  };
};

export const isSessionActive = async (req, res, next) => {
  try {
    if (req.session.login) {
      return next();
    }
    return res.status(401).send("No active session");
  } catch (error) {
    res.status(500).send({
      message: "Server internal error",
      error: error.message,
    });
  }
};
