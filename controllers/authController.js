import UserModal from "../modals/User.js";
import { checkHashPassword, genHashPassword } from "../utils/genHashSalt.js";
import { genJwtToken } from "../utils/genJwtToken.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const user = await UserModal.findOne({ email });

        if (user) return res.status(409).json({ success: false, message: 'user already exist with this email' });

        const hashPassword = await genHashPassword(password);

        const newUser = await UserModal.create({
            fullName,
            email,
            password: hashPassword,
        });

        const token = genJwtToken(newUser.email, newUser._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        });

    } catch (error) {
        console.log("Auth Controller : Register User ::", error.message);
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModal.findOne({ email });

        if (!user) return res.status(409).json({ success: false, message: 'Invalid Credentials' });

        const isMatch = await checkHashPassword(password, user.password);
        if (!isMatch) return res.status(409).json({ success: false, message: 'Invalid Credentials' });

        const token = genJwtToken(user.email, user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: user
        });

    } catch (error) {
        console.log("Auth Controller : Register User ::", error.message);
    }
}

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({ success: true, message: "logout successfully" });
  } catch (error) {
    console.log("Auth controller : Logout User::", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Somthing went wrong!" });
  }
};
