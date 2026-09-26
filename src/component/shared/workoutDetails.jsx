"use client";

import { LuCalendarPlus2 } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import Image from "next/image";
import { useState } from "react";
import { addToPlan } from "./planStorage";

const WorkoutDetails = ({ workout }) => {
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const addWorkout = (workout) => {
    setAdded(!added);
    addToPlan(workout);
  };
  return (
    <main className="min-h-screen bg-[#191a20] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Image
            src={workout.image}
            alt={workout.name}
            width={600}
            height={700}
            className="h-[400px] w-full rounded-2xl object-cover sm:h-[500px] lg:h-[600px]"
          />
        </div>

        <div>
          <h1 className="font-sans text-3xl font-extrabold uppercase sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-4 font-light text-gray-300">{workout.description}</p>

          <div className="mb-5 mt-4 flex flex-wrap gap-2">
            {Array.isArray(workout.muscleGroups) ? (
              workout.muscleGroups.map((muscleGroup) => (
                <span
                  key={muscleGroup}
                  className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold text-black"
                >
                  {muscleGroup.toUpperCase()}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold text-black">
                {workout.muscleGroups?.toUpperCase()}
              </span>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#1e293b]">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-9 py-5 font-bold">EQUIPMENT</td>
                  <td className="px-9 py-5 text-right text-gray-300">
                    {workout.equipment}
                  </td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="px-9 py-5 font-bold">DURATION</td>
                  <td className="px-9 py-5 text-right text-gray-300">
                    {workout.duration} min
                  </td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="px-9 py-5 font-bold">CALORIES</td>
                  <td className="px-9 py-5 text-right text-gray-300">
                    {workout.calories} kcal
                  </td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="px-9 py-5 font-bold">RATING</td>
                  <td className="px-9 py-5 text-right text-gray-300">
                    {workout.rating}
                  </td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="px-9 py-5 font-bold">SETS</td>
                  <td className="px-9 py-5 text-right text-gray-300">
                    {workout.sets}
                  </td>
                </tr>

                <tr>
                  <td className="px-9 py-5 font-bold">REPS</td>
                  <td className="px-9 py-5 text-right text-gray-300">
                    {workout.reps}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="mt-7 text-2xl font-bold">INSTRUCTIONS</h3>

          <ol className="mt-4 list-decimal space-y-2 pl-5 font-light text-gray-300">
            {workout.instructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addWorkout(workout)}
              className="btn bg-lime-400 text-black hover:bg-lime-300"
            >
              {added ? (
                "✓ Added to Plan"
              ) : (
                <>
                  <LuCalendarPlus2 />
                  Add to todays plan
                </>
              )}
            </button>

            <button
              onClick={() => setSaved(!saved)}
              className="btn border border-gray-600 bg-transparent text-white"
            >
              {saved ? (
                "Saved"
              ) : (
                <>
                  <CiBookmark />
                  Save for later
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;
