import React from 'react'
import Image from 'next/image'
import bg from "/public/img/bg.jpg"
import Header from './Header'

const Banner = () => {
  return (
    <>

    <div className='relative h-[450px] sm:h-[550px]
    lg:h-[650px] xl:h-[700px] 2xl:h-[850px] '>
      <Header></Header>
        <Image src={bg} 
        layout="fill"
        objectFit='cover' />

        <div className='absolute top-1/2 w-full pl-7 sm:pl-16 mr-auto'>
            <p className=' text-2xl text-white sm:text-4xl'>Not sure where to go?</p>
            <p className='text-2xl text-white sm:text-4xl'>Perfect we got you.</p>

            <button className=' text-gray-800 px-8 bg-white py-2 shadow-md 
            rounded-full font-bold my-3 hover:shadow-xl active:scale-90 duration-150 '>Explore Now</button>
        </div>

    </div>
    
    </>
  )
}

export default Banner