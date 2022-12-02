const User = require("../../models/auth");
const { generateToken } = require("../../../utils/services/auth");

module.exports = async (req, res) => {
  const { access_token } = req.body;
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
  const { id: googleId, email, name, picture: avatarUrl } = await userRes.json();
  const _user = await User.findOne({ email });
  if(_user) return res.status(200).json({
    token: generateToken({ id: _user._id }),
    user: _user,
    message: "Success to Sign In."
  });
  const user = await User.create({ googleId, name, avatarUrl, email, password: "1234567890" });
  user.password = undefined;
  return res.status(201).json({
    token: generateToken({ id: user._id }),
    user,
    message: "Success to Sign Up."
  });
}
