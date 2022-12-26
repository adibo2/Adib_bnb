import React from "react";
import Image from "next/image";

const Card = (props) => {
  return (
    // Left

    <div className="group flex gap-4 items-center m-2 mt-5 
    cursor-pointer rounded-xl hover:bg-[#002] 
    transition transform duration-200 ease-out ">
      <div className="relative h-20 w-20 group-hover:scale-[.85]  transition transform duration-200 ease-out">
        <Image src={props.img} layout="fill" objectFit="cover" className="rounded-lg blur-[6px] brightness-[80%] group-hover:scale-[.83] " />
        <Image src={props.img} layout="fill" objectFit="cover" className="rounded-lg " />
      </div>
      {/* // right */}
      <div className="px-[1.5rem] whitespace-nowrap group-hover:pr-[2.5rem] group-hover:pl-[.5rem]  transition-all duration-100 ease-out">
        <h3 className="text-white whitespace-nowrap  ">{props.name}</h3>
        <p className="text-white whitespace-nowrap ">{props.distance}</p>
        <p className="text-white text-xs whitespace-nowrap ">{props.avaible}</p>


      </div>
    </div>
  );
};

export default Card;
