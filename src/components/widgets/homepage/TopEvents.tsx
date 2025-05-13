import EventCard from '@/components/ui/EventCard'
import React from 'react'
import { events } from '@/components/utils/constants'
const TopEvents = () => {
    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-[40px] font-bold'>Top Events</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5'>
                {
                    events.map((item, i) => {
                        return (
                            //@ts-ignore
                            <EventCard key={i} event={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopEvents