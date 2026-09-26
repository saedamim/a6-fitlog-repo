/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export const FitLogProvider = ({ children }) => {
  const [Plan, setPlan] = useState([]);
  const [Saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const plan = JSON.parse(localStorage.getItem(PLAN_KEY) || "[]");
    const saved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");

    setPlan(plan);
    setSaved(saved);
    setLoaded(true);
  }, []);
  const addToPlan = (workout) => {
    const alreadyExists = Plan.some(
      (item) => String(item.id) === String(workout.id),
    );

    if (alreadyExists) {
      return false;
    }

    if (Plan.length >= 5) {
      return false;
    }

    const newPlan = [...Plan, workout];

    setPlan(newPlan);
    localStorage.setItem(PLAN_KEY, JSON.stringify(newPlan));

    return true;
  };

  const removeFromPlan = (id) => {
    const newPlan = Plan.filter((workout) => String(workout.id) !== String(id));

    setPlan(newPlan);
    localStorage.setItem(PLAN_KEY, JSON.stringify(newPlan));
  };

  const addToSaved = (workout) => {
    console.log({
      workout,
      Saved,
    });
    const alreadyExists = Saved.some(
      (item) => String(item.id) === String(workout.id),
    );

    if (alreadyExists) {
      return false;
    }

    const newSaved = [...Saved, workout];

    setSaved(newSaved);
    localStorage.setItem(SAVED_KEY, JSON.stringify(newSaved));

    return true;
  };

  const removeFromSaved = (id) => {
    const newSaved = Saved.filter(
      (workout) => String(workout.id) !== String(id),
    );

    setSaved(newSaved);
    localStorage.setItem(SAVED_KEY, JSON.stringify(newSaved));
  };

  return (
    <FitLogContext.Provider
      value={{
        Plan,
        Saved,
        loaded,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  return useContext(FitLogContext);
};
