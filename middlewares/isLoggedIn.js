import jwt from 'jsonwebtoken';
import UserModal from '../modals/User.js';

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({
            status: false,
            message: 'Unautharised access',
            data: null
        });

        const decoded = jwt.verify(token, "onlineTaks@1234");
        const user = await UserModal.findOne({ email: decoded.email }).select('-password');
        if (!user) return res.status(404).json({
            status: false,
            message: 'User not found',
            data: null
        })
        req.user = { email: user.email, id: user._id };
        next();
    } catch (error) {
        console.log('Is Logged In Middleware  :: ', error.message);
        return res.status(404).json({ status: false, message: ' unautherise access' })

    }
}