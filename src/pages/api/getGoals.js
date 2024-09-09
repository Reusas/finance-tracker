export default async function handler(req,res)
{

        // Get from database here later
        const goalData = 
        [
            {id: 1, name: "Food", amount: "100"},

        ];


        return res.status(200).json(goalData);
    
}