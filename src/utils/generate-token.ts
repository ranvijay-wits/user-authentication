import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();



const secretKey: string | undefined = process.env.SECRET_KEY;
function generateAccessToken(id: string | null) {
    return jwt.sign({ userId: id }, secretKey as string);
}


export { generateAccessToken }
