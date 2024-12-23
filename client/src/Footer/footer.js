import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import logo from  "../images/cc.png";
import "./footstyle.css";

export default function Foter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand href='/'>
            <h1 className="lg:text-xl md:text-l dark:text-white">
                CCode
            </h1>
          </Footer.Brand>
          <Footer.LinkGroup>
            <Footer.Link href="./">Home</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="CodeCalendar" year={2024} />
      </div>
    </Footer>
  );
}