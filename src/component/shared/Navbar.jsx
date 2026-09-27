"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
const Navbar = () => {
  const { Plan = [], Saved = [] } = useFitLog();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <nav className="w-full border-b border-gray-600 bg-black">
      {" "}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {" "}
        {/* Logo */}{" "}
        <div className="flex gap-0.5">
          {" "}
          <Link href="/" onClick={closeMenu}>
            {" "}
            <Image
              src="/logo.png"
              alt="FitLog"
              width={28}
              height={28}
              className="object-contain"
            />{" "}
          </Link>{" "}
          <Link
            href="/"
            onClick={closeMenu}
            className="btn btn-ghost font-mono text-xl"
          >
            {" "}
            FITLOG{" "}
          </Link>{" "}
        </div>{" "}
        {/* Desktop Navigation */}{" "}
        <div className="hidden items-center gap-10 md:flex">
          {" "}
          <Link
            href="/workouts"
            className={`btn btn-ghost rounded-2xl hover:bg-lime-950 hover:text-lime-500 ${pathname === "/workouts" ? "bg-lime-950 text-lime-500" : ""}`}
          >
            {" "}
            Workouts{" "}
          </Link>{" "}
          <Link
            href="/MyPlan"
            className={`btn btn-ghost rounded-2xl hover:bg-lime-950 hover:text-lime-500 ${pathname === "/MyPlan" ? "bg-lime-950 text-lime-500" : ""}`}
          >
            {" "}
            My Plan{" "}
          </Link>{" "}
        </div>{" "}
        {/* Desktop Plan / Saved */}{" "}
        <div className="hidden items-center gap-8 text-sm font-semibold text-white md:flex">
          {" "}
          <span>
            {" "}
            Plan{" "}
            <Link
              href="/MyPlan"
              className="btn btn-circle ml-1 h-7 w-7 bg-lime-500 text-black"
            >
              {" "}
              {Plan.length}{" "}
            </Link>{" "}
          </span>{" "}
          <span>
            {" "}
            Saved{" "}
            <Link
              href="/MyPlan"
              className="btn btn-circle ml-1 h-7 w-7 text-gray-400 outline-gray-400"
            >
              {" "}
              {Saved.length}{" "}
            </Link>{" "}
          </span>{" "}
        </div>{" "}
        {/* Mobile Hamburger */}{" "}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost text-2xl md:hidden"
          aria-label="Toggle menu"
        >
          {" "}
          {menuOpen ? <RxCross2 /> : <GiHamburgerMenu />}{" "}
        </button>{" "}
      </div>{" "}
      {/* Mobile Menu */}{" "}
      {menuOpen && (
        <div className="border-t border-gray-700 bg-black px-6 pb-6 md:hidden">
          {" "}
          <div className="flex flex-col gap-3 pt-4">
            {" "}
            <Link
              href="/workouts"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 font-semibold hover:bg-lime-950 hover:text-lime-500 ${pathname === "/workouts" ? "bg-lime-950 text-lime-500" : ""}`}
            >
              {" "}
              Workouts{" "}
            </Link>{" "}
            <Link
              href="/MyPlan"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 font-semibold hover:bg-lime-950 hover:text-lime-500 ${pathname === "/MyPlan" ? "bg-lime-950 text-lime-500" : ""}`}
            >
              {" "}
              My Plan{" "}
            </Link>{" "}
            {/* Mobile Counters */}{" "}
            <div className="mt-2 flex gap-4 border-t border-gray-700 pt-4">
              {" "}
              <Link
                href="/MyPlan"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3"
              >
                {" "}
                <span>Plan</span>{" "}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-500 text-sm font-bold text-black">
                  {" "}
                  {Plan.length}{" "}
                </span>{" "}
              </Link>{" "}
              <Link
                href="/MyPlan"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3"
              >
                {" "}
                <span>Saved</span>{" "}
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-500 text-sm">
                  {" "}
                  {Saved.length}{" "}
                </span>{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </nav>
  );
};
export default Navbar;
