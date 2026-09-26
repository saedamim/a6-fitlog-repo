import React from 'react';
import Image from 'next/image';
import { FaRegClock } from "react-icons/fa6";
import { AiFillFire } from "react-icons/ai";
import { MdOutlineStarOutline } from "react-icons/md";
import Link from 'next/link';
const workOutList = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const data = await res.json();
    return data;
};

const WorkoutLibrery = async () => {
    const workOutData = await workOutList();

    return (
        <section className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
            <div>
                <h2 className="font-mono text-3xl font-extrabold sm:text-4xl">THE LIBRARY</h2>
                <p className=" mb-7 text-sm text-gray-400 sm:text-base">Twelve lifts covering every major muscle group.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {workOutData.map((workOut, ind) => (
                    <div key={ind} className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-900">
                        <div className="h-52 overflow-hidden bg-gray-800">
                            <Link
                                href={`/DetailsPage/${workOut.id}`}
                                className="block h-full"
                            >
                                <Image
                                    src={workOut.image}
                                    alt={workOut.name}
                                    width={500}
                                    height={300}
                                    className="h-full w-full object-cover"
                                />
                            </Link>
                        </div>

                        <div className="p-5">
                            <div className="mb-3 flex flex-wrap gap-2">
                                {Array.isArray(workOut.muscleGroups) ? (
                                    workOut.muscleGroups.map((muscleGroups) => (
                                        <span key={muscleGroups} className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold text-black">
                                            {muscleGroups.toUpperCase()}
                                        </span>
                                    ))
                                ) : (
                                    <span className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold text-black">
                                        {workOut.muscleGroups?.toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <h3 className="font-mono text-lg font-bold uppercase">{workOut.name}</h3>
                            <p className="mt-2 text-sm text-gray-400">{workOut.equipment}</p>

                            <div className="mt-5 flex  justify-between flex-wrap gap-4 border-t border-gray-700 pt-4 text-xs text-gray-400">
                                <span className='flex gap-0.5 items-center'><FaRegClock /> {workOut.duration} min</span>
                                <span className='flex gap-0.5 items-center'><AiFillFire /> {workOut.caloriesBurned} kcal</span>
                                <span className='flex gap-0.5 items-center'><MdOutlineStarOutline /> {workOut.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkoutLibrery;