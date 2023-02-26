const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

const googleLogin = (req, res, next) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: 'your_google_client_id',
                clientSecret: 'your_google_client_secret',
                callbackURL: 'http://localhost:3000/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                // Bu callback fonksiyonunda kullanıcının bilgileri işlenebilir.
                console.log(profile);
                console.log(accessToken);
                console.log(refreshToken);
                // Örneğin, veritabanında kullanıcı kontrol edilip oluşturulabilir ve JWT belirteci oluşturulabilir.
                try {
                    // Google'dan gelen e-posta adresi ile kullanıcı sorgulanır
                    const user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        // Kullanıcı zaten kaydedilmiş, güncelleme yapılır
                        user.googleId = profile.id;
                        user.name = profile.displayName;
                        user.picture = profile.photos[0].value;
                        await user.save();
                    } else {
                        // Yeni kullanıcı kaydedilir
                        const newUser = new User({
                            email: profile.emails[0].value,
                            name: profile.displayName,
                            picture: profile.photos[0].value,
                            googleId: profile.id,
                        });
                        await newUser.save();
                    }

                    // JWT belirteci oluşturulur
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.json({ token });
                } catch (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Server error' , success:false});
                }
            }
        )
    );

    // Google login sayfasına yönlendirilir.
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

const googleCallback = (req, res, next) => {
    // Google OAuth 2.0'dan dönen yanıt işlenir ve kullanıcı bilgileri alınır.
    passport.authenticate('google', { failureRedirect: '/login' })(req, res, next);
    res.redirect('/dashboard');
};

module.exports = { googleLogin, googleCallback };
