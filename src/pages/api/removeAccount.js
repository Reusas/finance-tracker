import pool from "@/lib/db";
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
export default async function handler(req,res)
{
    if(req.method == 'POST')
    {
        const {password} = req.body;

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

            const passCorrect = await bcrypt.compare(password,oldPassword);

            

            if(!passCorrect)
            {
                return res.status(401).json({message: "Password incorrect"});
            }

            const query2 = await pool.query("DELETE from users WHERE id = ($1)", [userID]);
            const query3 = await pool.query("DELETE from transactions WHERE user_id = ($1)", [userID]);

            return res.status(200).json({message: "Account removed"});
        }



        catch(error)
        {
            return res.status(500).json({message: "Failed to remove account"});
        }




    }

    
}