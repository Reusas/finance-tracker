const bcrypt = require('bcrypt');
import pool from '@/lib/db';
export default async function handler(req,res)
{
    if(req.method == "POST")
    {
        const {email,password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        console.log(email, hashedPassword);


        try
        {
            const result = await pool.query(
                
                'INSERT INTO users (email,password) VALUES ($1, $2) RETURNING *',
                [email,hashedPassword]

            );
        }
        catch(error)
        {
            console.log("Failed inserting data into database");
            return res.status(500).json({message: "Database error"});
        }
        

        return res.status(200).json({message: "Signed up"});
    }
}