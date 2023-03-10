import React from "react";
import { useState } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

const InfoCard = ({
  img,
  location,
  title,
  amenities,
  star,
  price,
  total,
  bedrooms,
  beds,
  host_name,
  host_thumbnail_url,
}) => {
  const [fillHeart, setFillHeart] = useState("");

  return (
      <div
        style={{ transition: "all .5s ease" }}
        className="mt-7 flex  flex-col relative   h-65 w-full p-3 cursor-pointer  bg-white shadow-md hover:shadow-lg pr-3transition transform duration-300 ease-out hover:scale-[1.02] group rounded-2xl"
      >
        {/* md:flex-row */}
        {/* <div className="w-0 pt-5 mr-2 bg-black md:group-hover:w-[1px] transition-all duration-900 ease-in"></div> */}
        <div
          style={{ backfaceVisibility: "none" }}
          className="relative  min-h-[20rem] rounded-2xl shadow-sm pb-10 hover:shadow-md md:h-60 md:w-full lg:w-full xl:w-full hover:opacity-95 flex-shrink-0 overflow-hidden "
        >
          {/* lg:w-80 */}
          <Image
            src={img}
            layout="fill"
            objectFit="cover"
            style={{ transition: "all 3s ease" }}
            className="scale-[1.2]  group-hover:scale-[1]  rounded-2xl transition transform duration-300 ease-in"
          />
          <HeartIcon
            onClick={() =>
              fillHeart === ""
                ? setFillHeart("text-red-400 fill-current")
                : setFillHeart("")
            }
            className={`heart absolute ${fillHeart} right-2 top-2  opacity-90 h-7 cursor-pointer md:hidden`}
          />
        </div>

        <div className="flex flex-col flex-grow pt-1 md:pl-5">
          <div className="flex justify-between">
            <p>{location}</p>
            <HeartIcon
              onClick={() =>
                fillHeart === ""
                  ? setFillHeart("text-red-400 fill-current")
                  : setFillHeart("")
              }
              className={`heart h-7 absolute top-4 right-5 ${fillHeart} cursor-pointer hidden md:block`}
            />
          </div>
          {/* Host Photo */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl">{title}</h4>
              <p className="pt-2 text-sm text-red-500 flex-grow">
                {bedrooms} bedrooms {beds} beds
              </p>
            </div>
            <div className="flex flex-col">
              <div className="relative h-7 min-w-[30px]">
                <Image
                  src={host_thumbnail_url}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                ></Image>
              </div>
              <p>{host_name}</p>
            </div>
          </div>
          <div className="border-b w-30 pt-2"></div>

          <p className="pt-2 text-sm text-gray-500  flex-grow">{amenities}.</p>

          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400" />
              {star}
            </p>
            <div>
              <p className="text-lg font-semibold pb-2 lg:text-2xl font-sans">
                ${price} / night
              </p>
              <p className="text-right text-sm font-extralight">${total}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default InfoCard;
