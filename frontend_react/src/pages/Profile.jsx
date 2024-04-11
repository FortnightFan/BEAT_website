import React, { useState, useEffect } from 'react';
import ProfileContent from './components/ProfileContent';
import { BarChart } from '@mui/x-charts/BarChart';

const Profile = () => { 

    const [data, setdata] = useState({
        'w1':0,
        'w2':0,
        'w3':0,
        'w4':0,
        'w5':0,
        'w6':0,
        'w7':0,
    });

    useEffect(() => {
        fetch("/weekly").then((res) =>
            res.json().then((data) => {
                setdata({
                    w1: data.w1,
                    w2: data.w2,
                    w3: data.w3,
                    w4: data.w4,
                    w5: data.w5,
                    w6: data.w6,
                    w7: data.w7,
                });
            })
        );
    }, []);
    const dataList = Object.values(data);
    return (
        <div>            
            <ProfileContent/>
            <center>
                <b>Weekly Workouts</b>
                <BarChart
                    xAxis={[
                        {
                        id: 'barCategories',
                        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
                        scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                        data: dataList
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