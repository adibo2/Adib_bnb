import React from 'react'
import Image from 'next/image'

const MediumCard = (props) => {
  return (
    <div className='cursor-pointer hover:scale-105 transform transition
    duration-300 ease-out'>
        <div className='relative h-60 w-72'>
            <Image src={props.img} layout='fill' 
            className='rounded-xl'></Image>
        </div>
        <h3 className='text-xl text-white mt-3'>{props.title}</h3>
    </div>
  )
}

export default MediumCard