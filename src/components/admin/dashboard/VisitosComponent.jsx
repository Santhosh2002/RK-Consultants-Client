import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

function VisitorsComponent() {
  const [visitors, setVisitors] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [peakHour, setPeakHour] = useState('');

  useEffect(() => {
    // Fetch visitors data from the API
    const fetchVisitors = async () => {
      try {
        const response = await fetch('https://real-co-server.vercel.app/api/visitor/visitors');
        const data = await response.json();
        setVisitors(data.visitors);
        setTotalVisitors(data.total);

        // Process peak hour data here
        const hourCounts = {};
        data.visitors.forEach((visitor) => {
          const hour = new Date(visitor.createdAt).getHours();
          hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });

        const peak = Object.entries(hourCounts).reduce((max, current) =>
          current[1] > max[1] ? current : max
        );
        setPeakHour(`${peak[0]}:00 - ${peak[0]}:59`);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  const processDailyData = () => {
    if (!visitors || visitors.length === 0) return [];

    const dailyCounts = {};
    visitors.forEach((visitor) => {
      const visitDate = new Date(visitor.createdAt).toLocaleDateString();
      dailyCounts[visitDate] = (dailyCounts[visitDate] || 0) + 1;
    });

    return Object.keys(dailyCounts).map((date) => ({
      date,
      visits: dailyCounts[date],
    }));
  };

  const processHourlyData = () => {
    if (!visitors || visitors.length === 0) return [];

    const hourCounts = {};
    visitors.forEach((visitor) => {
      const hour = new Date(visitor.createdAt).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    return Object.keys(hourCounts).map((hour) => ({
      hour: `${hour}:00 - ${hour}:59`,
      visits: hourCounts[hour],
    }));
  };

  const dailyData = processDailyData();
  const hourlyData = processHourlyData();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Visitor Statistics</h1>
      <div className="mb-6 text-center">
        <p className="text-lg text-black">
          Total Visitors: <span className="font-semibold text-green-600">{totalVisitors}</span>
        </p>
        <p className="text-lg text-black">
          Peak Hour: <span className="font-semibold text-blue-600">{peakHour}</span>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-center mb-4 text-black">Daily Visits</h2>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#82ca9d" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-center mb-4 text-black">Hourly Visits</h2>
        <div className="w-full h-80"> 
          <ResponsiveContainer>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#8884d8" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default VisitorsComponent;
