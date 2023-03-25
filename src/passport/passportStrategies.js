import { userModel } from "../dao/models/user.model.js";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";


//Github Strategy
passport.use("github", new GitHubStrategy({
    clientID: "Iv1.6ea8ece480d47686",
    clientSecret: "82cc9b6eec285393f1dfb15053b858fd96238b67",
    callbackURL: "http://localhost:8080/user/github"
},
    async (accessToken, refreshToken, profile, done) => {
        const user = await userModel.findOne({ email: profile._json.email });

        if (!user) {
            const newUser = {
                firstName: profile._json.name.split(" ")[0],
                lastName: profile._json.name.split(" ")[1] || " ",
                email: profile._json.email,
                password: " "
            }
            const userDB = await userModel.create(newUser);
            done(null, userDB);
        } else {
            done(null, user);
        }
    }
));


const cookieExtractor = (req) => {
    const token = req.cookies.token;
    return token;
}

//JWT Strategy
passport.use("jwt", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "secretJWT"
}, async (jwt_payload, done) => {
    done(null, jwt_payload.user);
}
));



passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(err, user);
});


//App ID: 306482
//Client ID: Iv1.6ea8ece480d47686
//Client Secret: 82cc9b6eec285393f1dfb15053b858fd96238b67