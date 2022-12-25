import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

function Carte({ searchResults,filterResults }) {

  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((result) => ({
    longitude: result.longitude,
    latitude: result.latitude,
  }));

  // console.log(coordinates);
  const center = getCenter(coordinates);
  // console.log(center);

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    pitch: 55, // pitch in degrees
    bearing: -50, // bearing in degrees
    zoom: 9,
  });
  // console.log(searchResults);

  return (
    <Map
    onClick={(e)=>e.originalEvent.stopPropagation()}
      mapStyle="mapbox://styles/konstantintaylor/cks1w2hvq55it17o51ig65mch"
      mapboxAccessToken="pk.eyJ1Ijoia29uc3RhbnRpbnRheWxvciIsImEiOiJja3MwaTRmZ3cxazI0Mm5uOGcwOTA4NHg4In0.4xR29eTiytsriR8vosLu8Q"
      initialViewState={{ ...viewport }}
    >
      <>

            {searchResults.filter((item) => {
          if (filterResults === "") {
            return item;
          } else if (
            item.price.toString().includes(filterResults)
          ) {
            return item;
          }
        })
       
        .map((result) => (
          <div on key={result.long}>
            <Marker
              longitude={result.longitude}
              latitude={result.latitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
                onClick={(e) =>{e.stopPropagation(); setSelectedLocation(result)}}
                className="curspr-pointer text-xl animate-bounce"
              >
                📍
              </p>
            </Marker>

            {selectedLocation.longitude === result.longitude ? (
              <Popup
                onClose={() => setSelectedLocation({})}
                latitude={result.latitude}
                longitude={result.longitude}
                closeOnClick={true}
              >
                  <div
            style={{ backfaceVisibility: "none" }}
            className="relative h-44 w-60 rounded-2xl object-cover "
          >
            <Image
              src={result.picture_url}
              layout="fill"
              objectFit="cover"
             
            />
            </div>
                {/* <img
                  src={result.img}
                  className="h-full w-full rounded-2xl object-cover "
                  alt=""
                /> */}
                <div className="absolute font-semibold max-w-[200px] text-white z-20 bottom-5 left-4">
                  <div>
                    <h3 className="">{result.name}</h3>
                    <h4 className="text-xl">{result.price}</h4>
                  </div>
                  <p className="flex items-center">
                    <StarIcon className="h-6 text-red-400" />
                    {result.star}
                  </p>
                  <div></div>
                </div>
                <span className=" w-full absolute  bottom-0 z-10 pointer-events-none transform   p-24 bg-gradient-to-t from-gray-800 "></span>
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </>
    </Map>
  );
}

export default Carte;
