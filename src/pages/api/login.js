const bcrypt = require('bcrypt');
export default async function handler(req,res)
{
    if(req.method =='POST')
    {
        const {email,password} = req.body;

        // database stuff here later

        const user = {email: 'virgilp@com', passwordHash: bcrypt.hash('virgil16',10)};

        if(email !=user.email)
        {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const isPasswordCorrect = bcrypt.compare(password,user.passwordHash);

        if(!isPasswordCorrect)
        {
            // Same message to avoid username enumeration
            return res.status(401).json({message: "Invalid email or password"});
        }

        // everything is correct:

        return res.status(200).json({message: "Login successful", token:"tempToken"});
    }
}