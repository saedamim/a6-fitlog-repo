/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { IoIosStarOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useFitLog } from "@/context/FitLogContext";


const MyPlan = () => {
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const { Plan, Saved, loaded, removeFromPlan, removeFromSaved } = useFitLog();
  const getNumericValue = (value) => {
    const number = parseFloat(String(value ?? ""));
    return Number.isNaN(number) ? 0 : number;
  };

  const sortedWorkouts = [...Plan].sort(
    (a, b) => getNumericValue(b[sortBy]) - getNumericValue(a[sortBy]),
  );

  const sortedSavedWorkouts = [...Saved].sort(
    (a, b) => getNumericValue(b[sortBy]) - getNumericValue(a[sortBy]),
  );

  const totalExercises = Plan.length;

  const totalMinutes = Plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );

  const totalCaloriesBurned = Plan.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0,
  );

  const handleRemove = (id) => {
    removeFromPlan(id);
    toast.success("Workout removed from today's plan");
  };

  const handleRemoveSaved = (id) => {
    removeFromSaved(id);

    toast.success("Workout removed from saved");
  };
  

  return (
    <main className="min-h-screen bg-[#0f1015] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section>
          <h1 className="font-mono text-4xl font-extrabold">MY PLAN</h1>

          <p className="mt-2 text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-800 bg-[#15161d] sm:grid-cols-3">
          <div className="border-b border-gray-800 p-8 sm:border-b-0 sm:border-r">
            <p className="text-gray-400">Exercises</p>

            <p className="mt-3 text-5xl font-extrabold text-lime-400">
              {totalExercises}
            </p>
          </div>

          <div className="border-b border-gray-800 p-8 sm:border-b-0 sm:border-r">
            <p className="text-gray-400">Minutes</p>

            <p className="mt-3 text-5xl font-extrabold">{totalMinutes}</p>
          </div>

          <div className="p-8">
            <p className="text-gray-400">Calories</p>

            <p className="mt-3 text-5xl font-extrabold">
              {totalCaloriesBurned}
            </p>
          </div>
        </section>

        {/* Tabs + Sort */}
        <section className="mt-10 flex items-center justify-between">
          <div className="flex rounded-xl border border-gray-800 bg-[#15161d] p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-lg px-7 py-2.5 text-sm font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#222630] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-7 py-2.5 text-sm font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#222630] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Sort By</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-800 bg-[#15161d] px-4 py-2.5 text-sm outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </section>

        {/* Content */}
        <section className="mt-8 space-y-5">
          {!loaded ? (
            <p className="py-10 text-center text-gray-400">Loading workouts…</p>
          ) : activeTab === "plan" ? (
            Plan.length === 0 ? (
              <div className="py-16 text-center">
                <h2 className="font-mono text-2xl font-bold">
                  NOTHING HERE YET
                </h2>

                <p className="mt-2 text-gray-400">
                  Browse the library and add a lift to get today moving.
                </p>

                <Link
                  href="/"
                  className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-3 font-bold text-black"
                >
                  Go to workouts
                </Link>
              </div>
            ) : (
              sortedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex flex-col gap-5 rounded-2xl border border-gray-800 bg-[#15161d] p-5 sm:flex-row sm:items-center"
                >
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={220}
                    height={130}
                    className="h-32 w-full rounded-xl object-cover sm:w-56"
                  />

                  <div className="flex-1">
                    <h2 className="font-mono text-xl font-bold">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-gray-400">{workout.equipment}</p>

                    <div className="mt-4 flex gap-5 text-sm text-gray-300">
                      <span className="flex items-center gap-2">
                        <FaRegClock className="text-lime-400" />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-2">
                        <AiFillFire className="text-lime-400" />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-2">
                        <IoIosStarOutline className="text-lime-400" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/DetailsPage/${workout.id}`}
                      className="rounded-full border border-gray-600 px-5 py-3"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleRemove(workout.id)}
                      className="text-2xl text-gray-500 transition hover:text-white"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                </div>
              ))
            )
          ) : sortedSavedWorkouts.length === 0 ? (
            <div className="py-16 text-center">
              <h2 className="font-mono text-2xl font-bold">
                NO SAVED WORKOUTS
              </h2>

              <p className="mt-2 text-gray-400">
                Save workouts from the library to see them here.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-3 font-bold text-black"
              >
                Browse workouts
              </Link>
            </div>
          ) : (
            sortedSavedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex min-h-35 items-center gap-5 rounded-2xl border border-gray-800 bg-[#15161d] p-5"
              >
                {/* Image */}
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={180}
                  height={100}
                  className="h-25 w-45 shrink-0 rounded-xl object-cover"
                />

                {/* Information */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-mono text-xl font-bold uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {workout.equipment}
                  </p>

                  <div className="mt-3 flex items-center gap-5 text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                      <FaRegClock className="text-lime-400" />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-2">
                      <AiFillFire className="text-lime-400" />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-2">
                      <IoIosStarOutline className="text-lime-400" />
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-5">
                  <Link
                    href={`/DetailsPage/${workout.id}`}
                    className="rounded-full border border-gray-600 px-6 py-3 text-sm transition hover:border-gray-400"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleRemoveSaved(workout.id)}
                    className="text-2xl text-gray-500 transition hover:text-white"
                  >
                    <RxCross2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default MyPlan;
