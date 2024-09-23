import pool from '@/lib/db';

export default async function handler(req,res)
{
    if(req.method == "POST")
    {
        const data = req.body;


        try
        {
            const result = await pool.query("INSERT INTO transactions (user_id,date,amount,type,category) VALUES ($1,$2,$3,$4,$5)",
            [data.userID,data.date,data.amount,data.type,data.category]);
            console.log("Data added");
            return res.status(200).json({message: "Data added"});


        }
        catch(error)
        {
            console.log("Failed to add data");
            return res.status(500).json({message: "Database error"});
        }



        
    }
}