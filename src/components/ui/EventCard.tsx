import Image from 'next/image'
import React from 'react'
import Button from './Button'

const EventCard = () => {
  return (
    <div className='flex flex-col gap-2 p-3 w-full border rounded-3xl border-primary'>
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwBzcQt2uI-BHaUOo6zucN86WDdD75pOVmw&s"} alt='Event Image' width={300} height={"300"} className='w-full rounded-2xl'/>
        <h2 className='text-[24px] font-semibold'>Solana Event 2025</h2>
        <p>Sans Francisco</p>
        <p>Januray 25, Wednesday - 9PM WAT</p>
        <p className='text-lightGray'>Free</p>
        <Button className='w-full text-center font-bold bg-primary'>Get Ticket</Button>
    </div>
  )
}

export default EventCard