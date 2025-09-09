import { MdDelete } from "react-icons/md";
import useClassShedule from "../../hooks/useClassShedule";

const DayClassesList = ({ classesForActiveDay }) => {
  const { deleteSpecificClassById } = useClassShedule();

  const deleteClassById = async (classId) => {
    const confirmMessage = `Are you sure you want to delete this class?`;
    const isConfirmed = window.confirm(confirmMessage);

    
    if (!isConfirmed) return;

    try {
      await deleteSpecificClassById(classId);
      console.log("Class deleted successfully!");
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  return (
    <div className="min-h-48">
      <ul className="mt-3 space-y-3">
        {classesForActiveDay?.length > 0 ? (
          classesForActiveDay.map((cls) => (
            <li
              key={cls._id}
              className="p-4 border border-gray-200 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-900">{cls.subject}</p>
                <p className="text-sm text-gray-600">{cls.professor}</p>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-600">Time : {cls.time}</p>
                  <p className="text-sm text-gray-600">Room : {cls.location}</p>
                  <p className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                    {cls.classType}
                  </p>
                </div>
              </div>

              <button
                onClick={() => deleteClassById(cls._id)}
                className="text-red-600 text-2xl hover:text-red-700 cursor-pointer bg-gray-200 p-2 rounded-full"
              >
                <MdDelete />
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 mt-3">No classes found</p>
        )}
      </ul>
    </div>
  );
};

export default DayClassesList;
