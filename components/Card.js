import React from "react";
import Image from "next/image";

const Card = (props) => {
  return (
    // Left
    <div className="flex gap-4 items-center m-2 mt-5 
    cursor-pointer rounded-xl hover:bg-slate-800 hover:scale-105 
    transition transform duration-200 ease-out ">
      <div className="relative h-16 w-16">
        <Image src={props.img} layout="fill" className="rounded-lg" />
      </div>
      {/* // right */}
      <div>
        <h2 className="text-white">{props.name}</h2>
        <h2 className="text-white">{props.distance}</h2>

      </div>
    </div>
  );
};

export default Card;
