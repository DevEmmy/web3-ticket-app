import EventCard from '@/components/ui/EventCard'
import React from 'react'
import { events } from '@/components/utils/constants'
const BrowseEvents = () => {
  return (
    <div className='flex flex-col gap-3'>
        <h2 className='text-[40px] font-bold'>Browse Events in</h2>

        <div className='grid grid-cols-3 gap-5'>
            {
                events.map((item, i)=>{
                    return(
                        <EventCard key={i} event={item}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default BrowseEvents