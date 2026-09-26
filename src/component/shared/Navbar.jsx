import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border border-b border-gray-600 bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className=" flex gap-2">
<Link href="/">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="object-contain"
          />
        </Link>
        <Link href= "/" className="text-xl btn btn-ghost font-mono"> FITLOG</Link> 
        </div>
        

       
        <div className="flex items-center gap-10">
          <Link href="/"
           className="btn rounded-2xl hover:bg-lime-950 hover:text-lime-500 btn-ghost">Workouts</Link>

          <Link
            href="/MyPlan"
            className="btn rounded-2xl hover:bg-lime-950 hover:text-lime-500 btn-ghost"
          >
            My Plan
          </Link>
        </div>

    
        <div className="flex items-center gap-8 text-sm font-semibold text-white">
          <span>
            Plan{" "}
            <span className="ml-1 h-7 w-7 btn btn-circle  bg-lime-500 text-black">0</span>
          </span>

          <span>
            Saved{" "}
            <span className="ml-1 h-7 w-7 btn btn-circle outline-gray-400 text-gray-400">0</span>
          </span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;