export default function SummaryCard({title,content})
{
    return(
        <div className="p-4 ">
        <div className='bg-white rounded-lg pb-20 max-w-sm w-80 h-80'>
            <h2 className ='text-center mb-4 font-bold'>{title}</h2>
            <p className="text-center">{content}$</p>
        </div>
        </div>
    );
}