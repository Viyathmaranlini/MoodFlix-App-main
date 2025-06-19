import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from 'react-icons/io5';
import { FaSmile } from "react-icons/fa"; 
import { AiOutlineBulb } from "react-icons/ai"; 
import { href } from "react-router-dom";

export const navigation = [
    {
        label: "Tv Shows",
        href: "tv",
        icons: <PiTelevisionFill />
    },
    {
        label: "Movies",
        href: "movie",
        icons: <BiSolidMoviePlay />
    },
    {
        label: "Mood Detection",
        href: "mood-detection",
        icons: <FaSmile /> 
    },
    {
        label: "Movie Quiz",
        href: "quiz",
        icons: <AiOutlineBulb />
    },
    

];

export const mobileNavigation = [
    {
        label: "Home",
        href: "/",
        icons: <MdHomeFilled />
    },
    ...navigation,
    {
        label: "Search",
        href: "/search",
        icons: <IoSearchOutline /> 
    },
   
    
];