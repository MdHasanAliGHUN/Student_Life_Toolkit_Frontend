import useClassShedule from "../../hooks/useClassShedule";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const TodayClasses = () => {
  const { error, loading, todayClasses } = useClassShedule();

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-7 bg-white rounded-xl border border-gray-200 min-h-48 md:min-h-72">
      <h1 className="font-bold text-2xl text-gray-900">Today's Classes</h1>
      <div className="flex items-center space-x-1">
        <h2 className="size-10 bg-gray-300 rounded-full text-black font-bold flex items-center justify-center">
          {todayClasses?.length || 0}
        </h2>
        <p className="text-gray-700 text-sm font-medium my-2 capitalize flex items-center gap-2">
          classes scheduled for today
        </p>
      </div>

      {/* Classes List */}
      <div>
        {todayClasses?.length > 0 ? (
          todayClasses.map((classItem, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-gray-100 flex justify-between items-center mt-3"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {classItem.subject}
                </h2>
                <p className="text-sm text-gray-600"> {classItem.professor}</p>
                <p className="text-sm text-gray-600">{classItem.time}</p>
              </div>
              <p className="mt-2 flex justify-center px-2 py-2 text-sm font-medium border-2 border-gray-400 rounded-sm w-22">
                {classItem.classType}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500 text-sm">
            No classes scheduled for today.
          </p>
        )}
      </div>
    </div>
  );
};

export default TodayClasses;
