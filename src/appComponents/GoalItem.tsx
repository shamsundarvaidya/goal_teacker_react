import * as React from 'react'


const GoalItem:React.FC = ({data})=>{


    return(
        <div className='grid grid-cols-4 gap-4 border-b border-gray-200'>
            <div>
                {data.title}
            </div>

            <div>
                {data.status}
            </div>

            <div>
                {data.end_date}
            </div>

        </div>
    )
}

export default GoalItem