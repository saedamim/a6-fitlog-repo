"use client";

import { useFitLog } from "@/context/FitLogContext";
import { useState } from "react";
import { CgCheck } from "react-icons/cg";
import { LuCalendarPlus2 } from "react-icons/lu";
import { toast } from "react-toastify";

const AddToPlan = ({ workout }) => {
  const { addToPlan } = useFitLog();
  const [add, setAdd] = useState(false);
  const handleAddToPlan = () => {
    const added = addToPlan(workout);

    if (added) {
      setAdd(true);
      toast.success("Added to today's plan");
    } else {
      toast.info("Workout already in today's plan");
    }
  };

  return (
    <button
      onClick={handleAddToPlan}
      className=" rounded-full bg-lime-400 px-5 py-3 font-bold text-black flex items-center gap-2"
    >
      {add ? (
        <>
          <CgCheck />
          Added plan success
        </>
      ) : (
        <>
          <LuCalendarPlus2 />
          Add to todays plan
        </>
      )}
    </button>
  );
};

export default AddToPlan;
