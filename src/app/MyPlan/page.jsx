"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { IoIosStarOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { getPlan } from "@/component/shared/planStorage";

const MyPlan = () => {
  const [workoutData, setWorkoutData] = useState(() => getPlan());
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(false);
console.log(workoutData);
  useEffect(() => {
    const loadPlan = () => {
      const plan = getPlan();

      setWorkoutData(plan);
      setLoading(false);
    };

    loadPlan();

    window.addEventListener("fitlog-storage", loadPlan);

    return () => {
      window.removeEventListener("fitlog-storage", loadPlan);
    };
  }, []);

  const totalExercises = workoutData.length;

  const totalMinutes = workoutData.reduce((total, workout) => {
    return total + Number(workout.duration || 0);
  }, 0);

  const totalCalories = workoutData.reduce((total, workout) => {
    return total + Number(workout.calories || 0);
  }, 0);

  const sortedWorkouts = [...workoutData].sort((a, b) => {
    return Number(a[sortBy]) - Number(b[sortBy]);
  });

  const handleRemove = (id) => {
    const updatedData = workoutData.filter((workout) => workout.id !== id);

    setWorkoutData(updatedData);
  };

  return (
    <main className="min-h-screen bg-[#0f1015] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <section>
          <h1 className="font-mono text-4xl font-extrabold">MY PLAN</h1>

          <p className="mt-2 text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

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
            <p className="mt-3 text-5xl font-extrabold">{totalCalories}</p>
          </div>
        </section>

        <section className="mt-10 flex items-center justify-between">
          <div className="flex rounded-xl border border-gray-800 p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-lg px-6 py-3 font-bold ${
                activeTab === "plan" ? "bg-[#222630]" : "text-gray-400"
              }`}
            >
              Todays Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-6 py-3 font-bold ${
                activeTab === "saved" ? "bg-[#222630]" : "text-gray-400"
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
              className="rounded-xl border border-gray-800 bg-[#15161d] px-4 py-3"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </section>

        <section className="mt-8 space-y-5">
          {activeTab === "plan" &&
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
                    <span className="flex items-center gap-0.5">
                      {" "}
                      <FaRegClock />
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-0.5">
                      {" "}
                      <AiFillFire />
                      {workout.calories} kcal
                    </span>
                    <span className="flex items-center gap-0.5">
                      {" "}
                      <IoIosStarOutline />
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

                  <button className="rounded-full bg-lime-400 px-5 py-3 font-bold text-black">
                    ✓ Mark as Done
                  </button>

                  <button
                    onClick={() => handleRemove(workout.id)}
                    className="text-2xl text-gray-500"
                  >
                    <RxCross2 />
                  </button>
                </div>
              </div>
            ))}
        </section>
      </div>
    </main>
  );
};

export default MyPlan;
