
import WorkoutDetails from "../../../component/shared/workoutDetails"

const DetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  const workouts = await res.json();

  const workout = workouts.find(
    (item) => String(item.id) === String(id)
  );

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#191a20] px-4 py-10 text-white">
        <h1 className="text-2xl font-bold">
          Workout not found
        </h1>
      </main>
    );
  }

  return <WorkoutDetails workout={workout} />;
};

export default DetailsPage;


