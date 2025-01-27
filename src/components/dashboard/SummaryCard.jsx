import React from 'react'

const SummaryCard = ({ icon, text, number, color }) => {
    return (
        <div className='rounded flex bg-gray-300'>
            <div className={`flex justify-center items-center  ${color} text-white px-2 md:text-3xl`}>
                {icon}
            </div>
            <div className='pl-4 py-1'>
                <p className='text-sm font-semibold md:text-md'>{text}</p>
                <p className='text-xl font-bold'>{number}</p>
            </div>
        </div>
    )
}

export default SummaryCard
