import { cookies } from 'next/headers'; 
export default function handler(req,res)
{
    if(req.method == 'POST')
    {
        if (req.method === 'POST') {
            // Delete the JWT cookie by setting it to expire
            res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'); // Modify as needed
            res.status(200).json({ message: 'Signed out successfully' });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}