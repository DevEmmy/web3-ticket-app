import EventCard from '@/components/ui/EventCard'
import React from 'react'

const EventInMyLocation = () => {
  return (
    <div className='flex flex-col gap-3'>
        <h2 className='text-[40px] font-bold'>Events in Lagos</h2>

        <div className='grid grid-cols-3 gap-5'>
            {
                [1,2,3,4,5].map((item, i)=>{
                    return(
                        <EventCard key={i} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default EventInMyLocation