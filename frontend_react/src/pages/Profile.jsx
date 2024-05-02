import { BarChart } from "@mui/x-charts/BarChart";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import ProfileContent from "./components/ProfileContent";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo(decodedToken);
    }
  }, []);
  const [data, setdata] = useState([0,0,0,0,0,0,0]);
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await fetch("http://127.0.0.1:8000/api/workout_week/", requestOptions);
      const data = await response.json();
      setdata(JSON.parse(data.message))
    };
    fetchData();
  }, []);

  return (
    <div>
      <ProfileContent />
      <center>
        <b>Weekly Workouts</b>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Week 5",
                "Week 6",
                "Week 7",
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: data, 
            },
          ]}
          width={500}
          height={300}
        />
      </center>
    </div>
  );
};

export default Profile;
