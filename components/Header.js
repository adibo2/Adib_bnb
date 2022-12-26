import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  XIcon
} from "@heroicons/react/solid";
import styled from "styled-components";
import { Search } from "react-feather";
import { useSession, signIn, signOut } from "next-auth/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import wolf from "/public/img/wolf.png";
import { useRouter } from "next/router";
import { useMediaQuery } from "@react-hook/media-query";
import DatePicker from "./Datepicker";
import { gsap } from "gsap";

import Router from "next/router";
function Header({ placeholder }) {
  //form data
  const [searchInput, setSearchInput] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [close,Setclose]=useState(false)
  const [inputfocus, Setinputfocus] = useState(false);
  const router = useRouter();

  //search when phone screen
  const [statusSearch,SetSearchStatus]=useState(false)

  const { data: session } = useSession();

  const { query } = router;

  //UseRef££££££££££
  const primelocation = useRef(null);
  const secondaryLocation = useRef(null);
  const logo = useRef();
  const head = useRef();
  console.log(router.query);

  //responsive
  const isSmallScreen = useMediaQuery("(max-width: 40rem)");


  const navbar = useRef();
  //Navbar when scrolling
  const [color, Setcolor] = useState(false);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "back", opacity: 0, duration: 0.5 } })
        .from(logo.current, { x: -80 })
        // .from(texte.current,{x:80})
        // .from(button.current,{y:100})
        .from(head.current, { stagger: 0.3, scale: 2 });
    });
    return () => ctx.revert();
  }, []);

  console.log(session);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        Setcolor(true);
      } else {
        Setcolor(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDatePicker = () => {
    Setclose(true)
    Setinputfocus(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (!isSmallScreen && secondaryLocation.current) {
        secondaryLocation.current.focus();
      }
    }, 10);
  };

  const closeDatePicker = () => {
    setSearchInput("");
    Setclose(false)

    Setinputfocus(false);

    setNoOfGuests(0);
    setCheckInDate(new Date());
    setCheckOutDate(new Date());
    document.body.style.overflow = "initial";
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchInput) {
      primelocation.current.focus();
      return;
    }
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        noOfGuests,
      },
    });
    setTimeout(() => closeDatePicker(), 100);
    document.body.style.overflow = "initial";

    // Setinputfocus(false);
    // Setcolor(false)
  };
  useEffect(() => {
    const handleClick = (event) => {
      if (!navbar.current.contains(event.target)) {
        closeDatePicker();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  // console.log(router.query);

  return (
    <HeaderSection
      ref={navbar}
      className={[
        // color || inputfocus || router.pathname !== "/" ? "scrolled" : null,

        color || inputfocus ? "scrolled" : null,
        // router.query.startsWith('loc') ? "bg-red-700" :"scrolled",
        router.pathname === "/" ? "" : `scrolled ${"shadow-2xl"}`,
        inputfocus ? "inputFocus" : null,
      ]}
    >
      <div className="grid  md:grid-cols-2 grid-cols-1 max-w-[1400px] sm:max-w-[1350px]">
        {/* left */}
        <div
          ref={logo}
          onClick={() => Router.push("/")}
          className={statusSearch ? "hidden" :"relative flex row-start-1 z-50 row-end-2 col-start-1 col-end-2 items-center h-12 text-xl w-20 cursor-pointer my-ayto"}
        >
          <Image
            // src="https://links.papareact.com/qd3"
            src={wolf}
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div>

        {/* Middle - Search */}
        <form className={`search "row-start-1 row-end-2 col-start-1 col-end-3"}`}>
          <div className={!statusSearch ? "hidden flex-grow md:flex items-center md:shadow-sm" : "flex w-full items-center shadow-sm flex-grow"}>
          <input
            value={searchInput}
            ref={primelocation}
            type="text"
            autoComplete="location"
            placeholder={placeholder || "where are you going?"}
            className={`pl-5 bg-inherit border-none outline-none flex-grow sm:text-xl text-[.9rem] ${
              !color
                ? "text-white placeholder-white"
                : "text-gray-600 placeholder-gray-400 "
            } `}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={openDatePicker}
            // onFocus={() => Setinputfocus(true)}
          />
          <button
            type="submit"
            disabled={
              inputfocus &&
              !(searchInput && checkInDate && checkOutDate && noOfGuests)
            }
            aria-label="search places"
            onClick={handleSubmit}
          >
            <Search className="sm:text-sm sm:w-6 text-xs" />
            <span className={`ml-2 ${router.query.location ? "hidden" : ""} ${color ? "hidden" : ""}`}>Search</span>
          </button>

          </div>


          {inputfocus && (
            <div className="overlay">
              <div className="field">
                <label
                  className="bg-none text-xl block whitespace-nowrap outline-none overflow-hidden text-white text-ellipsis"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="bg-none border-none bg-[#1e1e38] text-xl block whitespace-nowrap outline-none overflow-hidden text-white text-ellipsis"
                  value={searchInput}
                  id="location"            
                  autoComplete="location"
                  ref={secondaryLocation}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Where are you going?"
                />

              </div>
              <div className="field">
                <label className="bg-none text-xl block whitespace-nowrap outline-none overflow-hidden text-white text-ellipsis">
                  Check-in
                </label>
                <input disabled placeholder="Add dates" value={checkInDate} />
              </div>

              <div className="field">
                <label className="bg-none text-xl block whitespace-nowrap outline-none overflow-hidden text-white text-ellipsis">
                  Check-out
                </label>
                <input disabled placeholder="Add dates" value={checkOutDate} />
              </div>
              <div className="field">
                <label className="bg-none text-xl block whitespace-nowrap outline-none overflow-hidden text-white text-ellipsis">
                  Guests
                </label>
                <span className="guestNumber">
                  {noOfGuests ? (
                    <p>{noOfGuests} guests</p>
                  ) : (
                    <p className="text-white font-semibold opacity-60">
                      Add guests
                    </p>
                  )}
                </span>
              </div>
            </div>
          )}
          
          {/* text-gray-600 placeholder-gray-400 */}
        </form>
        {inputfocus && (
          // {/* <DateRangePicker
          //   ranges={[selectionRange]}
          //   minDate={new Date()}
          //   rangeColors={["#252525"]}
          //   onChange={handleSelect}
          // /> */}
          <DatePicker
            close={closeDatePicker}
            checkInDate={{ value: checkInDate, setValue: setCheckInDate }}
            checkOutDate={{ value: checkOutDate, setValue: setCheckOutDate }}
            noOfGuests={{
              value: noOfGuests,
              setValue: setNoOfGuests,
            }}
          />
        )}

        {/****************  right ***********************/}
        <div
          ref={head}
          className="flex space-x-4 row-start-1 row-end-2 col-start-2 col-end-3 items-center justify-end text-white"
        >

          {statusSearch ? <XIcon onClick={()=>SetSearchStatus(false)} className={`h-12 z-20 w-8 cursor-pointer ${close && "hidden"}`}></XIcon>
          :
          <>
          <p
            onClick={() => signIn()}
            className="hidden md:inline cursor-pointer"
          >
            {session ? session?.user.name : "Sign In"}
          </p>
          <SearchIcon onClick={() => SetSearchStatus(true)} className="md:hidden h-6 cursor-pointer" />
          <GlobeAltIcon className="h-6" />
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full bg-white text-gray-600">
            <MenuIcon
              className={`h-6 cursor-pointer ${session?.user.image && "mr-2"}`}
            />
            {session?.user.image ? (
              <Image
                src={session.user.image}
                height={24}
                width={24}
                onClick={signOut}
                className="rounded-full cursor-pointer"
              />
            ) : (
              <UserCircleIcon
              onClick={() => signOut("google")}
                className="h-6 cursor-pointer"
              />
            )}
          </div>
          </>
          
        }
        </div>
      </div>
    </HeaderSection>
  );
}

export default Header;
const HeaderSection = styled.header`
  position: fixed;
  top: 0;
  color: #fafafc;
  padding: 1.2rem 1rem;
  width: 100%;
  z-index: 10;
  transition: background 0.2s, border-bottom 0.2s;
  @media (max-width: 36rem) {
    padding: 1.5rem 1rem;

   

    
  }
  search_flex{
    position: absolute;
    transform: translate(-50%, 150%);
    left: 50%;
    top: -1rem;
    background: #1e1e38;;
    padding: 0.5rem;
    border-radius: 99px;
    display: flex;
    align-items: center;
    max-width: 720px;
    margin: 1.5rem 0;
    width: 60vw;
    box-shadow: 0 1rem 3rem -1rem #1e1e38;
    transition: all 0.2s;
    transform-origin: center;

  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #1e1e38;
    border-radius: 99px;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    transition: all 0.2s;

    label,
    input,
    .guestNumber {
      background: none;
      font-size: 14px;
      border: none;
      line-height: 1.5;
      display: block;
      color: #fafafc;
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input {
      width: 100%;
      font-weight: 700;

      &::placeholder {
        color: #fafafc;
        font-weight: 400;
        opacity: 0.5;
      }
    }
    .guestNumber {
      font-weight: 700;
      .empty {
        color: #fafafc;
        font-weight: 400;
        opacity: 0.5;
      }
    }
    .field {
      width: 100%;
      padding: 0.5rem 1.5rem;
      border-radius: 99px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: background 0.2s;
      position: relative;

      & + .field::before {
        position: absolute;
        content: "";
        width: 2px;
        height: 2rem;
        // background: #002;
        border-radius: 2px;
        left: 0;
        transition: transform 0.2s;
      }
      &:hover,
      &:focus-within {
        // background: #002;
      }

      &:last-of-type {
        padding-right: 10rem;
      }
    }
  }
  .overlay:hover .field::before,
  .overlay:focus-within .field::before {
    transform: scale(0);
  }

  .user,
  .profile,
  .logo,
  .globe,
  nav {
    display: flex;
    align-items: center;
  }

  .headerInner {
    max-width: var(--containerWidth);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }

  & > div {
    flex: 0 0 20%;
  }
  nav {
    flex: 1;
    justify-content: center;
    transition: all 0.2s;
    a + a {
      margin-left: 1.5rem;
    }
    a {
      position: relative;
    }
    a::before {
      position: absolute;
      content: "";
      width: 1.5rem;
      height: 2px;
      border-radius: 2px;
      background: #1e1e38;;
      bottom: -0.5rem;
      left: calc(50% - 0.75rem);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.2s;
    }
    a:hover::before,
    a.active::before {
      transform: scaleX(1);
    }
  }
  .logo {
    cursor: pointer;
    svg {
      height: 2rem;
      color: #fafafc;
      transition: color 0.2s;
    }
    span {
      font-weight: 600;
      font-size: 1.15rem;
      margin-left: 0.5rem;
    }
  }
  .profile {
    justify-content: flex-end;
    white-space: nowrap;
    svg {
      height: 1.15rem;
    }
    a,
    .themeToggle {
      margin-right: 1.5rem;
    }
    .userIcon {
      background: #2e2e48;
      border-radius: 99px;
      height: 1.5rem;
      width: 1.5rem;
      color: #fafafc;
    }
    .user {
      background: #fafafc;
      border-radius: 99px;
      padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    }
    .menu {
      color: #2e2e48;
      margin-right: 0.5rem;
    }
  }


  form {
    position: absolute;
    transform: translate(-50%, 150%);
    left: 50%;
    top: -1rem;
    background: #1e1e38;
    padding: 0.5rem;
    border-radius: 99px;
    display: flex;
    align-items: center;
    background-color:transparent;

    max-width: 720px;
    margin: 1.5rem 0;
    width: 60vw;
    box-shadow: 0 1rem 3rem -1rem #1e1e38;
    transition: all 0.2s;
    transform-origin: center;
    @media (max-width: 53rem) {
      box-shadow: 0 0rem 0rem 0rem #1e1e38;

    
      max-width: 520px;
      // transform:scale(.83)
      //  display:none;

      
    }

    & * {
      transition: all 0.2s;
    }

    & > input {
      background: none;
      border: none;
      font-size: 1.15rem;
      flex: 1;
      padding: 0 1.5rem;
      color: #fafafc;
      outline: none;

      &::placeholder {
        color: #fafafc;
        opacity: 0.6;
      }
    }
     button {
      background: #e0565b;
      color: #fafafc;
      border: none;
      padding: 0.5rem calc(1.5rem / 1.7);
      height: 3rem;
      max-width: 300px;
      display: flex;
      gap:.5rem;
      align-items: center;
      border-radius: 99px;
      font-weight: 700;
      font-size: 1rem;
      overflow: hidden;
      z-index: 2;
      @media (max-width: 36rem) {
      }

      &:hover:not(:disabled) {
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #e0565b;
      }

      &:disabled {
        opacity: 0.5;
      }
    }
    & > button svg {
      height: 1.25rem;
      margin-right: 0.75rem;
      flex: 0 0 1.25rem;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (max-width: 56rem) {
    .profile,
    .logo,
    nav,
    form > button span {
      display: none;
    }
    .overlay {
      display: none;
    }
    .headerInner {
      grid-template-columns: 1fr;
    }
    form {
      position: relative;
      transform: none !important;
      width: 100% !important;
      left: unset;
      top: 0;
      margin: 0;
      & > input {
        padding: 0 1rem;
        font-size: 1rem;
      }
      button {
        // width: 2.5rem;
        height: 2.2rem;
        padding: 0 0.4rem;
      }
      & > button svg {
        height: 1rem;
        width: 1rem;
      }
    }
  }

  @media (min-width: 36rem) and (max-width: 62.5rem) {
    nav {
      display: none;
    }
    .headerInner {
      grid-template-columns: 1fr 1fr;
    }
  }

  &.scrolled:not(.inputFocus) {
    background: #1e1e38;
    color: #fafafc;
    box-shadow: 2px 8px 19px -3px rgba(0,0,0,0.73);

    border-bottom: 2px solid #002;

    .overlay {
      pointer-events: none;
    }

    nav {
      pointer-events: none;
    }
    .logo svg {
      color: #e0565b;
    }
    .user {
      box-shadow: 0 0 0 2px #002;
    }
    form {
      box-shadow: 0 0 0 2px #002;
      transform: translate(-55%, 0.125rem) scale(0.83);
      width: 575px;
       button {
        max-width: 3rem;
      }
      & > button span {
      }
    }
    @media (max-width: 57rem) {
      padding-top: 1rem;
      padding-bottom: 1rem;

      form {
        padding: 0;
        box-shadow: none;
        box-shadow: 0 0 0 0px #002;

        // background: #002;
      }
    }

    @media (min-width: 36rem) and (max-width: 62.5rem) {
      .profile {
        pointer-events: none;
      }
      form {
        left: auto;
        right: 0;
        width: 50%;
      }
    }
  }

  
    @media (max-width: 36rem) {
      padding-top: 1rem;
      padding-bottom: 1rem;

      form {
        padding: 0;
        box-shadow: none;
        // background: #002;
      }
    }

    @media (min-width: 36rem) and (max-width: 52.5rem) {
      .profile {
        pointer-events: none;
      }
      form {
        left: auto;
        right: 0;
        transform: scale(0.83);
        width: 50%;
      }
    }
  }
  &.inputFocus {
    color: #fafafc;

    .logo svg {
      color: #e0565b;
    }

    form {
      background: #1e1e38;
      width: 100%;
      box-shadow: 0 1rem 1.5rem -0.5rem #0001;
    }
  }
`;
