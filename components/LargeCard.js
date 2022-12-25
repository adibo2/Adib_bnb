import React from 'react'
import Image from 'next/image'
import art from "/public/images/art.jpg"

const LargeCard = (props) => {
  return (
    <section className='relative py-16 cursor-pointer'>
        <div className="relative h-72 min-w-[300px]">
            <Image src={art} layout="fill" objectFit="cover"
            className='rounded-2xl'></Image>

        </div>
        <div className='absolute top-32 left-12'>
            {/* <h3 className='text-4xl mb-3 w-64'>{props.title}</h3>
            <p>{props.description}</p> */}
            <h3 className='text-4xl mb-3 w-64'>Explore the city avaible</h3>
            <p className='text-white'>Hope You enjoyed</p>
            <button className='text-sm text-white 
            bg-gray-900 px-4 py-2 rounded-lg mt-5'>Take your time 😁</button>

        </div>

    </section>
  )
}

export default LargeCard