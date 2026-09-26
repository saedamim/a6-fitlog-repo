"use client";

import { CiBookmark } from "react-icons/ci";
import { useFitLog } from "@/context/FitLogContext";
import { toast } from "react-toastify";

export const AddToSaved = ({ workout }) => {
  const { Saved, addToSaved } = useFitLog();

  const isSaved = Saved.some(
    (item) => String(item.id) === String(workout.id),
  );

  const handleAdd = () => {
    if (isSaved) {
      toast.error("Already Saved");
      return;
    }

    const success = addToSaved(workout);

    if (success) {
      toast.success("Workout saved");
    }
  };

  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 rounded-full border border-gray-600 bg-transparent px-5 py-3 font-bold text-white"
      >
        {isSaved ? (
          "Saved"
        ) : (
          <>
            <CiBookmark />
            Save for later
          </>
        )}
      </button>
    </div>
  );
};
