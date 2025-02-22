import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Grid2, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import {
  fetchVisitors,
  getVisitors,
  getTotalVisitors,
  getPeakHour,
  getVisitorsError,
} from "../../../store/visitorsSlice";

function VisitorsComponent() {
  const dispatch = useDispatch();
  const visitors = useSelector(getVisitors);
  const totalVisitors = useSelector(getTotalVisitors);
  const peakHour = useSelector(getPeakHour);
  const error = useSelector(getVisitorsError);

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error fetching visitors: ${error}`);
    }
  }, [error]);

  const processDailyData = () => {
    if (!visitors?.length) return [];

    const dailyCounts = {};
    visitors?.forEach((visitor) => {
      const visitDate = new Date(visitor.createdAt).toLocaleDateString();
      dailyCounts[visitDate] = (dailyCounts[visitDate] || 0) + 1;
    });

    return Object.keys(dailyCounts).map((date) => ({
      x: date,
      y: dailyCounts[date],
    }));
  };

  const processHourlyData = () => {
    if (!visitors?.length) return [];

    const hourCounts = {};
    visitors.forEach((visitor) => {
      const hour = new Date(visitor.createdAt).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    return Object.keys(hourCounts).map((hour) => ({
      x: `${hour}:00 - ${hour}:59`,
      y: hourCounts[hour],
    }));
  };

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", marginTop: "40px" }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: "40px" }}
      >
        Visitor Statistics
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" sx={{ color: "#6A5ACD" }}>
          Total Visitors: {totalVisitors}
        </Typography>
        <Typography variant="h6" sx={{ color: "#6A5ACD" }}>
          Peak Hour: {peakHour}
        </Typography>
      </Box>
      <Grid2 container spacing={4}>
        <Grid2
          item
          size={{
            xs: 12,
            mb: 12,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Daily Visits
          </Typography>
          <Box sx={{ borderRadius: "16px" }}>
            <Chart
              options={{
                grid: {
                  show: false,
                },
                chart: {
                  type: "bar",
                  background: "#222",
                  toolbar: { show: false },
                  borderRadius: "16px",
                },
                plotOptions: {
                  bar: {
                    borderRadius: 6,
                  },
                },
                xaxis: {
                  type: "category",
                  labels: { style: { colors: "#fff" } },
                  lines: {
                    show: false,
                  },
                },
                yaxis: {
                  labels: { style: { colors: "#fff" } },

                  lines: {
                    show: false,
                  },
                },
                theme: { mode: "dark" },
                colors: ["#6A5ACD"],
              }}
              series={[{ name: "Visits", data: processDailyData() }]}
              type="bar"
              height={300}
            />
          </Box>
        </Grid2>
        <Grid2
          item
          size={{
            xs: 12,
            mb: 12,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hourly Visits
          </Typography>
          <Box sx={{ borderRadius: "16px" }}>
            <Chart
              options={{
                grid: {
                  show: false,
                },
                chart: {
                  type: "area",
                  background: "#222",
                  toolbar: { show: false },
                  borderRadius: "16px",
                },
                xaxis: {
                  type: "category",
                  labels: { style: { colors: "#fff" } },
                  lines: {
                    show: false,
                  },
                },
                yaxis: {
                  labels: { style: { colors: "#fff" } },

                  lines: {
                    show: false,
                  },
                },
                theme: { mode: "dark" },
                colors: ["#FF6347"],
                stroke: { curve: "smooth" },
              }}
              series={[{ name: "Visits", data: processHourlyData() }]}
              type="area"
              height={300}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default VisitorsComponent;
