import local from "passport-local";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import { createCryptPass, validatePass } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy; //Estrategia local de auntenticacion

const initializePassport = () => {
  //Ruta a implementar => 'register'
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        //Done = res.status
        //Validar y crear usuario
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await managerUsers.getElementByEmail(username); //Username => email
          if (user) {
            //Usuario existente
            return done(null, false);
          } else {
            const cryptPass = createCryptPass(password);
            const cart = await managerCart.addElements();
            const userCreated = await managerUsers.addElements([
              {
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                password: cryptPass,
                cartId: cart[0]._id,
              },
            ]);
            return done(null, userCreated); //Usuario creado correctamente
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await managerUsers.getElementByEmail(username);
          if (!user) {
            //User not found
            return done(null, false);
          }
          if (validatePass(password, user.password)) {
            //Valid user and password
            return done(null, user);
          }
          return done(null, false); //Invalid password
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Iniciar la sesion del usuario
  passport.serializeUser((user, done) => {
    if (Array.isArray(user)) {
      done(null, user[0]._id);
    } else if (user && user._id) {
      done(null, user._id);
    } else {
      done(new Error("Invalid user object"));
    }
  });

  //Eliminar la sesion del usuario
  passport.deserializeUser(async (id, done) => {
    const user = await managerUsers.getElementById(id);
    done(null, user);
  });

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/authSession/githubSession",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await managerUsers.getElementByEmail(
            profile._json.email
          );
          if (user) {
            //Usuario ya existe
            done(null, user);
          } else {
            const cryptPass = createCryptPass("coder123");
            const userCreated = await managerUsers.addElements([
              {
                first_name: profile._json.name,
                last_name: " ",
                email: profile._json.email,
                age: 18,
                password: cryptPass,
              },
            ]);
            done(null, userCreated);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
