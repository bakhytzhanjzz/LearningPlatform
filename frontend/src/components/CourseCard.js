const CourseCard = ({ course }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover"/>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-500 font-bold">{course.price}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    );
  };