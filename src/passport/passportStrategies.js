import { userModel } from "../dao/models/user.model.js";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "../config/config.js";

//Github Strategy
passport.use("github", new GitHubStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
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
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});