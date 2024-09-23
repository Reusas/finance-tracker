const bcrypt = require('bcrypt');
import {serialize} from 'cookie';
import jwt from 'jsonwebtoken'
import pool from '@/lib/db';
export default async function handler(req,res)
{
    if(req.method =='POST')
    {
        const {email,password} = req.body;
        var dbPassword = '';
        var userID =0;

        try
        {
            const result = await pool.query("SELECT password, id from users WHERE email=($1);", [email]);
            dbPassword = result.rows[0].password;
            userID = result.rows[0].id;
            console.log(userID);
        }
        catch(error)
        {
            return res.status(500).json({message: "Database error"});
        }

        bcrypt.compare(password,dbPassword, (err,isMatch) =>{

            if(err){
                console.log(err);
            }

            if(!isMatch)
            {
                return res.status(401).json({message: "Invalid email or password"});
                
            }

            if(isMatch){
                const token = jwt.sign({userID:userID}, 'secretKey',{expiresIn: '1h' });

                const cookie = serialize('token',token,{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600,
                    path: '/',
                });
        
                console.log("Token generated -> " + token);
        
                res.setHeader("Set-Cookie",cookie);
                return res.status(200).json({message: "Login sucessful"}); 
            }

        });



    }
}