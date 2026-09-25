import React from 'react';
import Image from 'next/image';
import { IoBarbell } from "react-icons/io5";

const Banner = () => {
    return (
       
            <div className='min-h-[350px] mx-auto max-w-6xl lg:flex-row  flex-col rounded-2xl flex border border-gray-700 bg-gray-800 p-8 m-8  lg:p-12'>
                <div className='items-start gap-2 lg:w-1/2'>
                    <p className=' text-lime-500  font-mono font-medium text-xs'>WORKOUT LIBRARY</p>
                    <h2 className='font-extrabold   font-stretch-condensed text-2xl sm:text-3xl lg:text-4xl'>TRAIN WITH INTENT. LOG
                        EVERY SET.</h2>
                    <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into todays plan, and watch the weeks work add up.</p>
                    <button className='bg-lime-400 px-4 py-2 rounded flex gap-2 items-center text-black font-bold text-xs'> <IoBarbell className='size-4' />BROWSE WORKOUTS</button>
                </div>
                <div className='className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0'>
                    <Image src='/banner.png' alt="Banner" width={300} height={300} className="w-48 sm:w-56 lg:w-[300px] h-auto"/>
                </div>
            </div>


      
    );
};

export default Banner;