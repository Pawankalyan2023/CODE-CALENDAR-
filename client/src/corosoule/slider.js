import { Carousel } from 'flowbite-react';
import mainlogo from "../images/Untitled design.png";
import cn from "../images/Coding-Ninjas-1-1-958x570.jpg";
import gfg from "../images/gfg-weekly-coding-contest-135-1703143242-recurring-desktop.png";
import leet from "../images/card_img_1654267980.png"

export default function Carousell() {
  return (
    <div className="flex justify-center items-center h-80 sm:h-96 xl:h-120 2xl:h-140 mr-5 ml-5 ">
  <Carousel pauseOnHover>
    <img src= {mainlogo} alt="..." />
    <img src= {leet} alt="..." />
    <img src= {cn} alt="..." />
    <img src = {gfg} alt="..." />
  </Carousel>
</div>
  )};