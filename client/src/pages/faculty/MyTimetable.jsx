import React, { useEffect, useState } from "react";
import Timetable from "../../components/Timetable";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const MyTimetable = () => {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sidebarItems = [
    { label: "My Courses", path: "/faculty/my-courses", onClick: () => navigate("/faculty/my-courses") },
    { label: "My Timetable", path: "/faculty/my-timetable", onClick: () => navigate("/faculty/my-timetable") },
    { label: "Time Availability", path: "/faculty/time-availability", onClick: () => navigate("/faculty/time-availability") },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getUserBySession`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setFacultyId(data.user?.profile?.id || null);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchTimetableData = async () => {
      if (!facultyId) {
        console.error("Faculty ID not available yet");
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/faculty/${facultyId}/courses`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const timetable = data.courses.flatMap((course) =>
          course.courseRuntimes.map((runtime) => ({
            day: runtime.day_of_week || "N/A",
            courseName: course.course_name,
            startTime: runtime.start_time,
            endTime: runtime.end_time,
            color: course.id,
          }))
        );

        setTimetableData(timetable);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
        setTimetableData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (facultyId) fetchTimetableData();
  }, [facultyId]);

  return (
    <div className="flex h-screen">
      <BaseSidebar dashboardName="Faculty Dashboard" items={sidebarItems} />
      <div className="flex-1">
        <Navbar role="faculty" />
        <div className="p-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">Faculty My Timetable</h1>
              <Timetable timetableData={timetableData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTimetable;
