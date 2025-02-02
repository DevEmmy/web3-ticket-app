import Button from '@/components/ui/Button'
import React from 'react'

const Banner = () => {
  return (
    <div className='grid grid-cols-[3fr_1.5fr]'>
        <div className='flex flex-col gap-5'>
            <h2 className='text-[60px] font-bold'>Next-Gen Ticketing: Secure, Fast & Decentralized</h2>
            <p className='text-[24px] text-lightGray'>No more fake tickets! Your event passes are minted on the blockchain, ensuring authenticity and easy transfers.</p>
            <Button className='bg-primary font-bold'>Get a Ticket</Button>
        </div>
    </div>
  )
}

export default Banner