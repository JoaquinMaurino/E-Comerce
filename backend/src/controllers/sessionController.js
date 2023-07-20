import passport from "passport";

export const registertUser = async (req, res, next) => {
  try {
    passport.authenticate("register", async (err, user) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Register error", error: err.message });
      }
      if (!user) {
        return res.status(401).send("Email already used");
      }
      return res
        .status(200)
        .send(`User ${user.first_name} registered successfully`);
    })(req, res, next);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    passport.authenticate("login", (err, user) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Login error", error: err.message });
      }
      if (!user) {
        return res.status(401).send("Wrong email or password");
      }
      req.session.login = true;
      req.session.user = user;
      /* return res.redirect("/productsView") */
      return res.status(200).send({message: `Welcome ${user.first_name}, you loged in as ${user.role}`})
    })(req, res, next);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const destroySession = async (req, res) => {
  try {
    if (req.session.login) {
      req.session.destroy();
      res.status(200).send("Session finalized.");
    } else {
      res.status(401).send("No active session");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getSession = async (req, res) => {
  try {
    if (req.session.login) {
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("No active session");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

