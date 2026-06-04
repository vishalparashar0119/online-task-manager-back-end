import jwt from "jsonwebtoken"

export const genJwtToken = (email, userId) => {
    const jwtToken = jwt.sign({ email: email, userId: userId }, process.env.JWT_SECERET, {
        expiresIn: "30d"
    });
    return jwtToken;
}