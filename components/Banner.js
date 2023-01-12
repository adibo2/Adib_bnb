import React from 'react'
import Image from 'next/image'
import bg from "/public/img/bg.jpg"
import Header from './Header'
import { gsap } from "gsap";
import { useEffect,useRef } from 'react';
import { useLayoutEffect } from 'react';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { useState } from 'react';
const Banner = () => {

  const [scrolling,setScrolling]=useState(false)
 
  const pres=useRef();
  // const banner=document.getElementById('banner');
  // const button=document.getElementById('button');
  useEffect(()=>{
    const scroll=()=>{
      if(window.pageYOffset > 210){
        setScrolling(true);
        console.log('lsdkmqkdlmqkdmql')
      }
      else{
        setScrolling(false)
      }
    }
    window.addEventListener('scroll',scroll);
    return ()=>{
      window.removeEventListener('scroll',scroll)
    }

  },[])


  useEffect(()=>{
    const ctx=gsap.context(()=>{
        gsap.from(pres.current,{stagger:0.7,y:150,opacity:0,transformOrigin:"center center",duration:0.7})          
    })
    return ()=>ctx.revert();
},[])
   

  return (
    




    <div  className={`${scrolling  ? 'bg-[length:180%]' : 'bg-[length:150%]'} relative h-[450px]  sm:h-[580px]
    lg:h-[680px] xl:h-[730px] 2xl:h-[900px] `}>
      <Header></Header>
        <Image  src={bg} 
        layout="fill"
        objectFit='cover'
        className={`${scrolling ? ' transition-all transform duration-200 ease-out ' : ' transition-all transform duration-200 ease-out '} `} />

        <div ref={pres} className='absolute top-1/2 w-full pl-7 sm:pl-16 mr-auto'>
            <h1 id="h1" className={` ${scrolling ? ' transition-all transform duration-200 ease-out opacity-0 scale-[.9] -translate-y-[50px]' : 'transition-all transform duration-200 ease-out scale-100 opacity-100 translate-y-0 '} text-2xl text-white sm:text-4xl `}>Not sure where to go?</h1>
            <h1 id="h1" className={`${scrolling ? 'transition-all transform duration-200 ease-out opacity-0  scale-[.9]  -translate-y-[50px]' : ' transition-all transform duration-200 ease-out scale-100 opacity-100 translate-y-0'} text-2xl text-white sm:text-4xl`}>Perfect we got you.</h1>

            <button id="button" className={`${scrolling ? 'transition-all transform duration-200 ease-out opacity-0 scale-[.8]  -translate-y-[50px]': 'transition-all transform duration-200 ease-out scale-100 opacity-100 translate-y-0 '} text-gray-800 px-8 bg-white py-2 shadow-md 
            rounded-full font-bold my-3 hover:shadow-xl active:scale-90 duration-150 `}>Explore Now</button>
        </div>

    </div>
    

    
    
  )
}

export default Banner