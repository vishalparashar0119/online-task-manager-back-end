import jwt from "jsonwebtoken"

export const genJwtToken = (email, userId) => {
    const jwtToken = jwt.sign({ email: email, userId: userId }, "onlineTaks@1234");
    return jwtToken;
}