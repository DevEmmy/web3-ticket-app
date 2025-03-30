import React from 'react'
import EventSearch from '../widgets/EventSearch'
import RentalCard from '../ui/RentalCard'

const rentalItems = [
    {
      title: "Sound Systems",
      description: "Professional sound systems available for your next event. Secure with smart contracts.",
      buttonText: "View Equipment",
    },
    {
      title: "Lighting Equipment",
      description: "Professional lighting equipment available for your next event. Secure with smart contracts.",
      buttonText: "View Equipment",
    },
    {
      title: "Stage Setup",
      description: "Professional stage setup available for your next event. Secure with smart contracts.",
      buttonText: "View Equipment",
    },
    {
      title: "LED Screens",
      description: "High-quality LED screens for presentations, concerts, and outdoor events.",
      buttonText: "View LED Screens",
    },
    {
      title: "DJ Equipment",
      description: "Premium DJ controllers, mixers, and turntables for your event.",
      buttonText: "View DJ Equipment",
    },
    {
      title: "Projectors & Screens",
      description: "Full HD projectors and screens for conferences, movies, and presentations.",
      buttonText: "View Projectors",
    },
    {
      title: "Catering Equipment",
      description: "Professional catering and buffet equipment for weddings and corporate events.",
      buttonText: "View Catering Equipment",
    },
    {
      title: "Photography & Videography",
      description: "Cameras, tripods, and accessories for professional event coverage.",
      buttonText: "View Photography Gear",
    },
    {
      title: "Tents & Canopies",
      description: "High-quality tents and canopies for outdoor events and exhibitions.",
      buttonText: "View Tents",
    },
    {
      title: "Furniture & Seating",
      description: "Luxury chairs, tables, and lounge seating for corporate events and weddings.",
      buttonText: "View Event Furniture",
    },
  ];
  
const ExploreRentals = () => {
    return (
        <div className='py-20 px-[5%]'>
            <h2 className='py-5 text-center text-[42px]'>Explore Rentals</h2>
            <EventSearch />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 '>
            {rentalItems.map((item, index) => (
            <RentalCard key={index} {...item} index={index + 1} />
          ))}
            </div>
        </div>
    )
}

export default ExploreRentals