import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function WorkoutBarChart() {
  return (
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
            data: [0, 0, 3, 1, 0, 2, 1],
            },
        ]}
        width={500}
        height={300}
        />
    </center>
    );
}