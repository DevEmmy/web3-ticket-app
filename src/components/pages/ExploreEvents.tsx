"use client"
import React from 'react'
import EventSearch from '../widgets/EventSearch'
import CategoryScroll from '../widgets/Categories'
import EventCard from '../ui/EventCard'
import { useEvents } from '@/hooks/useEvents'

const ExploreEvents = () => {
    const { data: events, isLoading, error } = useEvents();

    return (
        <div className='py-20 px-[5%]'>
            <h2 className='py-5 text-center text-[42px]'>Explore Events</h2>

            <EventSearch />
            <CategoryScroll />
            
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"/>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">
                    Failed to load events
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5'>
                    {events?.map((item, i) => (
                        <EventCard key={i} event={item} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExploreEvents