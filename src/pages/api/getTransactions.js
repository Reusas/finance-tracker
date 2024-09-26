import pool from '@/lib/db';
export default async function handler(req,res)
{

        if(req.method == "POST")
        {
                const {userID} = req.body;

                

                try
                {
                        const result = await pool.query('SELECT id,date,amount,type,category FROM transactions WHERE user_id = ($1);',[userID]);
                        return res.status(200).json(result.rows); 
                }
                catch(err)
                {
                        return res.status(500).json({message: "Database error"});
                }

        
        }

        
    
}