import pool from '@/lib/db';
export default async function handler(req,res)
{
    const {userID,type} = req.body;


    try
    {
        const result = await pool.query(
            "SELECT category, SUM(amount::INTEGER) AS total_sum FROM transactions WHERE user_id =($1) and type = ($2) GROUP BY category;",
            [userID,type]
        );
        return res.status(200).json(result.rows);
    }
    catch(error)
    {
        return res.status(500).json({message: "Database error"});
    }
}