const bcrypt = require('bcrypt');
import {serialize} from 'cookie';
import jwt from 'jsonwebtoken'
export default async function handler(req,res)
{
    if(req.method =='POST')
    {
        const {email,password} = req.body;

        // database stuff here later
        //
        const user = {
         email: 'virgilp@com',
         passwordHash: await bcrypt.hash('virgil16',10),
        };



        if(email !=user.email)
        {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.passwordHash);

        if(!isPasswordCorrect)
        {
            // Same message to avoid username enumeration
            return res.status(401).json({message: "Invalid email or password"});
        }

        // everything is correct:


        
        
        const token = jwt.sign({email:user.email}, 'secretKey',{expiresIn: '1h' });

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
}