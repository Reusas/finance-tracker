export default async function handler(req,res)
{

        // Get from database here later
        const transactionData = 
        [
            {id: 1, date: "08/27/2024", amount: "100", type: "expense", category: "Bills"},
            {id: 2, date: "08/26/2024", amount: "10", type: "expense", category: "Food"},
            {id: 3, date: "08/22/2024", amount: "1000", type: "income", category: "Other"},
        ];


        return res.status(200).json(transactionData);
    
}