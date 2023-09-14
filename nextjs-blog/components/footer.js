import Link from "next/link";

export default function Footer() {
  return (
    <div className="dark:bg-primary-20 bg-primary-30">
      <div className="mx-auto max-w-7xl pt-10 px-10 pb-10">
        <div className="flex flex-row justify-between text-neutral-300">
          
          <div className="max-w-md flex flex-row items-center">
            <img className="h-16 w-auto" src="/DHBWKino.png" alt="DHBW Kino Icon"/>
            <p className="pl-5 pt-3">Welcome to DHBW Cinema! Experience top-notch movies in a modern setting. Dive into the world of cinema.</p>
          </div>
          <div className="pt-3 ">
            <p className="mb-2 text-md text-white font-semibold">Information</p>
            <ul className="flex flex-col gap-2">
              <Link href="#" className="hover:text-white ">Ticket Prices</Link>
              <Link href="#" className="hover:text-white ">Opening Hours and Directions</Link>
              <Link href="#" className="hover:text-white ">Contact</Link>
              <Link href="#" className="hover:text-white ">FAQ</Link>
            </ul>
          </div>
          <div className="pt-3 ">
            <p className="mb-2 text-md text-white font-semibold">Offers</p>
            <ul className="flex flex-col gap-2">
              <Link href="#" className="hover:text-white ">Student Discounts</Link>
              <Link href="#" className="hover:text-white ">Senior Cinema</Link>
              <Link href="#" className="hover:text-white ">Film Critics</Link>
            </ul>
          </div>
          <div className="pt-3 ">
            <p className="mb-3 text-md text-white font-semibold">Legal</p>
            <ul className="flex flex-col gap-2">
              <Link href="#" className="hover:text-white ">Imprint</Link>
              <Link href="#" className="hover:text-white ">Privacy Policy</Link>
              <Link href="#" className="hover:text-white ">Terms and Conditions</Link>
            </ul>
          </div>
         

        </div>
      </div>
    </div>
  );
}
