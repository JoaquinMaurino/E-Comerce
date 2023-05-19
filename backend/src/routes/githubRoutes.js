import { Router } from "express";
import passport from "passport";

const routerGithub = Router();
//Register
routerGithub.get(
  "/github",
  passport.authenticate("/githubRegister", { scope: ["user:email"] }),
  async (req, res) => {
    req.session.login = true;
    res.status(200).send("You have been registered with GitHub successfully");
  }
);

//Login
routerGithub.get(
  "/githubLogin",
  passport.authenticate("github", async (req, res) => {
    req.session.login = true;
    req.session.user = req.user;
    res
      .status(200)
      .send(
        `You have been loged in with GitHub successfully, welcome $${req.session.user.first_name}`
      );
  })
);

export default routerGithub;
