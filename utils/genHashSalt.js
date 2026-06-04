import bcrypt from 'bcrypt';

export const genHashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log("Gen Hash Password :: ", error.message);
    }
}

export const checkHashPassword = async ( password , hashPssword) =>{
    try {
        const isMatch = await bcrypt.compare(password , hashPssword);
        return isMatch;
    } catch (error) {
        console.log("Check Hash Password :: " , error.message);
    }
}