const bcrypt = require('bcrypt');
import pool from '@/lib/db';
import jwt from 'jsonwebtoken'
export default async function handler(req,res)
{
    if(req.method =='POST')
    {
        const {password,newPassword} = req.body;
        const token = req.cookies.token;

        if(!token)
        {
            return res.status(400).json({message: "Unauthorized"});
        }

        try
        {
            const decodedToken = jwt.verify(token, 'secretKey');
            const userID = decodedToken.userID;

            const query = await pool.query("SELECT password from users WHERE id = ($1)", [userID]);
            const oldPassword = query.rows[0].password;

            const passCorrect = bcrypt.compare(password,oldPassword);

            if(!passCorrect)
            {
                return res.status(401).json({message: "Password incorrect"});
            }

            const hashedNewPass = await bcrypt.hash(newPassword,10);
            console.log(hashedNewPass);
            
            const newQuery = await pool.query("UPDATE users SET password = ($1) WHERE id = ($2)",[hashedNewPass,userID]);
            return res.status(200).json({message: "Pass changed"}); 

        }



        catch(error)
        {
            return res.status(500).json({message: "Failed to change password"});
        }




    }
}