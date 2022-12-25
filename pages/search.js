import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
// import Mapbox from "../components/Mapbox";
import Carte from "../components/Carte";
import Hotel from "./../model/Hotel";
import Image from "next/image";

import { SearchIcon } from "@heroicons/react/solid";
import { gsap } from "gsap";
import db from "../utils/db";
import No from "/public/img/noHotels.jpg"

const Search = ({ Villes,countLocations,pages }) => {
  const PAGE_SIZE=5;
  const router = useRouter();
  const { location, checkIn, checkOut, noOfGuests } = router.query;
  const [filterResultsPrice, setFilterResultsPrice] = useState("");
  const [filterResultsBeds, setFilterResultsbeds] = useState("");
  const [filterResultsBedrooms, setFilterResultsbedrooms] = useState("");
  // const [filterLowhigh, setFilterLowhigh] = useState("");
  const { sort = "featured",page = 1 } = router.query;

  const [priceInput, SetPriceInput] = useState(false);
  const [bedInput, Setbed] = useState(false);
  const [SortInput, setSortInput] = useState(true);

  const [placeholder, SetPlaceholder] = useState("filter by price");

  const hotel = useRef();
  const map = useRef();

  const formattedStartDate = format(new Date(checkIn), "dd MMMM yy");
  const formattedEndDate = format(new Date(checkOut), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  // console.log(new Date(checkIn).getDate(),new Date(checkOut).getDate());
  const diffTime = Math.abs(
    new Date(checkIn).getDate() - new Date(checkOut).getDate()
  );

  const Pricehandler = () => {
    SetPriceInput(true);
    Setbed(false);
    setSortInput(false)

    SetPlaceholder("filter by price");
  };
  const filterSearch = ({ sort,page }) => {
    const { query } = router;
    if (sort) query.sort = sort;
    if (page) query.page = page;


    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
   
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const sortchange=()=>{
    SetPriceInput(false);
    Setbed(false);
    setSortInput(true);

  }
  const bedhandler = () => {
    SetPriceInput(false);
    Setbed(true);
    setSortInput(false);
    SetPlaceholder("filter by beds and bedrooms");
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(hotel.current, {
        x: -200,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.from(map.current, {
        x: 200,
        opacity: 0,
        duration: 1.4,
        transformOrigin: "center center",
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);
  const data_villes=Villes.filter((item) => {
    if (filterResultsBeds === "") {
      return item;
    } else if (item.beds.toString() === filterResultsBeds) {
      return item;
    }
  } )
    // else if (item.price.toString().includes(filterResultsPrice)) {
              //   return item;
              // }
  return (
    <div className="h-screen bg-gray-50">
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex mt-28 ml-1 sm:ml-7 bg-gray-50 transform transition
    duration-300 ease-out">
        <section ref={hotel} className="flex-grow pt-14 px-3 sm:px-6 ">
          <p className="text-sm">
            300+ Stays -
            <span className="bg-red-400 text-white p-1 rounded-md mx-1">
              {formattedStartDate}
            </span>
            -
            <span className="bg-red-400 text-white mx-1 p-1 rounded-md">
              {formattedEndDate}
            </span>
            for {noOfGuests} guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {/* <p className="button">Cancellation Flexibility</p> */}
            <p className="button">Type of Place</p>
            <p className="button" onClick={() => Pricehandler()}>
              Price
            </p>
            <p className="button" onClick={() => bedhandler()}>
              bedrooms and Beds
            </p>
            <p className="button" onClick={()=>sortchange()}>
              Sort Price
            </p>
          </div>
          <div className="flex shadow-md bg-white rounded-sm w-auto">
            <div className=" flex h-[4rem] sm:h-20 items-center w-full rounded-md shadow-md">
              {priceInput && (
                <>
                <input
                  value={filterResultsPrice}
                  placeholder={placeholder}
                  type="text"
                  className="flex-grow outline-none text-gray-500 ml-4"
                  onChange={(e) => setFilterResultsPrice(e.target.value)}
                ></input>
                <SearchIcon className="font-semibold text-slate-700 h-10 mr-5 cursor-pointer" />
                
                </>
              )}
              {bedInput && (
                <>
                <input
                  value={filterResultsBeds}
                  placeholder={placeholder}
                  type="text"
                  className="flex-grow outline-none text-gray-500 ml-4"
                  onChange={(e) => setFilterResultsbeds(e.target.value)}
                ></input>
                <SearchIcon className="font-semibold text-slate-700 h-10 mr-5 cursor-pointer" />
                
                </>
              )}
              {SortInput && (
              <div className="relative  bg-[#37495b] w-full h-[80%] sm:h-full rounded-md overflow-hidden flex after:content-['\25BC'] after:absolute after:bottom-0 after:right-0 after:p-4 after:pt-7 after:bg-[#34495e] after:h-[125%] sm:after:h-full after:text-white hover:after:text-[#f39c12] " >        
                <select className=" w-full appearance-none outline-0 border-none p-2 bg-[#2c3e50] text-white cursor-pointer" value={sort} onChange={sortHandler}>
                  <option value="featured">Featured</option>
                  <option value="lowest">Sort Price: Low to High</option>
                  <option value="highest">Sort Price: High to Low</option>
                </select>
              </div>

              )}
            </div>
          </div>
          <div>
            {data_villes.length>0 ? data_villes.map(
              (
                {
                  picture_url,
                  name,
                  description,
                  review_scores_rating,
                  price,
                  amenities,
                  bedrooms,
                  beds,
                },
                index
              ) => {
                return (
                  <InfoCard
                    key={index}
                    img={picture_url}
                    title={name}
                    description={description}
                    bedrooms={bedrooms}
                    beds={beds}
                    star={review_scores_rating}
                    amenities={amenities}
                    price={price}
                    total={parseInt(price) * parseInt(diffTime)}
                  ></InfoCard>
                );
              }
            ):<div className="flex flex-col mt-4">
              <div className="relative h-80 min-w-[300px]">
              <Image src={No} layout="fill" objectFit="cover" alt="No hotels Found" className=" rounded-xl" ></Image>

              </div>
              <p className=" text-xl text-slate-700 text-center mt-6">No hotels found with your caracteristiques</p>
            </div>}
            {/* .map(({img,title,location,description,star,price,total,lat,long},index)=>(
            <InfoCard key={index} img={img} location={location} total={total} title={title} description={description} star={star} price={price}></InfoCard>
          ))} */}
          <ul className="flex">
          {[...Array(pages).keys()].map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`default-button m-2 ${
                        page == pageNumber + 1 ? 'font-bold' : ''
                      } `}
                      onClick={() => pageHandler(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}

          </ul>
          </div>
        </section>
        <section
          ref={map}
          className="hidden xl:inline-flex xl:min-w-[600px] h-screen sticky top-20 "
        >
          <Carte
            searchResults={data_villes}
            filterResults={filterResultsPrice}
          ></Carte>
          <div className=" h-full absolute left-0 transform pointer-events-none rotate-180 p-16 bg-gradient-to-l from-gray-50 "></div>
          <div className=" w-full absolute top-0 transform pointer-events-none  p-16 bg-gradient-to-b from-gray-50 "></div>
          <div className=" w-full absolute bottom-0 z-50 pointer-events-none transform  p-16 bg-gradient-to-t from-gray-50 "></div>
        </section>
      </main>
    </div>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  console.log("query: " + query.location);
  const searchQuery = query.location || "";
  const page = query.page || 1;
  const sort = query.sort || "";
  const pageSize = query.pageSize || 5;


  console.log(" Search query: " + searchQuery);
  await db.connect();
  const queryFilter = { host_location: { $regex: searchQuery, $options: "i" } };
  const order =
    sort === "featured"
      ? { isFeatured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated";
  const LocationDocs = await Hotel.find({
    ...queryFilter,
  })
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  
    const countLocations = await Hotel.countDocuments({
      ...queryFilter,

    });
    await db.disconnect();


  const Locations = LocationDocs.map(db.convertSearch);

  return {
    props: {
      Villes: Locations,
      countLocations,
      pages:Math.ceil(countLocations/pageSize)

    },
  };

  // const searchResults = await fetch("https://airbnb-api.vercel.app/london").then(
  //   (res) => res.json()
  // );

  // return {
  //   props: {
  //      searchResults,
  //   },
  // };
}
