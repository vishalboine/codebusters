const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const role = foundUser.role
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "role": role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ role, accessToken });

    } else {
        res.sendStatus(401);
    }
}

const handleChangePassword = async (req,res) => {
    const { user, cpwd, npswd } = req.body;
    if (!user || !cpwd) return res.status(400).json({ 'message': 'Username and password are required.' });


    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(cpwd, foundUser.password);

    if(match) {
        const newHashedPswd = await bcrypt.hash(npswd, 10);
        await User.findOneAndUpdate(
            { username: user },
           { $set: { password: newHashedPswd }},
           { new: true }

        )

        res.json({message: 'Password Updated succesfully.'})
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin, handleChangePassword };