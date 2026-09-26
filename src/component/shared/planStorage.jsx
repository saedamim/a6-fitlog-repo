export const PLAN_KEY = "fitlog-plan";
export const SAVED_KEY = "fitlog-saved";

export const getPlan = () => {
  if (typeof window === "undefined") {
    return [];
  }

  return JSON.parse(
    localStorage.getItem(PLAN_KEY) || "[]"
  );
};

export const getSaved = () => {
  if (typeof window === "undefined") {
    return [];
  }

  return JSON.parse(
    localStorage.getItem(SAVED_KEY) || "[]"
  );
};


export const addToPlan = (workout) => {
  const plan = getPlan();

  const alreadyExists = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  if (alreadyExists) {
    return false;
  }

  if (plan.length >= 5) {
    return false;
  }

  const updatedPlan = [...plan, workout];

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify(updatedPlan)
  );

  window.dispatchEvent(new Event("fitlog-storage"));

  return true;
};

export const addToSaved = (workout) => {
  const saved = getSaved();

  const alreadyExists = saved.some(
    (item) => String(item.id) === String(workout.id)
  );

  if (alreadyExists) {
    return false;
  }

  const updatedSaved = [...saved, workout];

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(updatedSaved)
  );

  window.dispatchEvent(new Event("fitlog-storage"));

  return true;
};