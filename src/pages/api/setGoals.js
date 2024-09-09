export default function handler(req,res)
{
    if(req.method == "POST")
    {
        const data = req.body;
        console.log(data);

        return res.status(200).json({message: "Goal created"});
    }
}