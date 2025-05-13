"use client"
import EventCard from '@/components/ui/EventCard'
import { useEvents } from '@/hooks/useEvents';
import React from 'react'
// import { events } from '@/components/utils/constants'
const EventInMyLocation = () => {
    const { data: events, isLoading, error } = useEvents();
    return (
        <div className='flex flex-col gap-3 mb-12'>
            <h2 className='text-[40px] font-bold'>Events Near You</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5'>
                {
                    events?.map((item, i) => {
                        return (
                            <EventCard key={i} event={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventInMyLocation