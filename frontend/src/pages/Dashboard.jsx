import { useEffect, useState } from "react";
import API from "../api";
import OutbreakMap from "../components/OutbreakMap";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [stats, setStats] = useState({
    total_farmers: 0,
    total_animals: 0,
    vaccinations_due: 0,
    total_diseases: 0
  });

  useEffect(() => {
    API.get("/admin/analytics")
      .then(res => setStats(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const chartData = {
    labels: ["Farmers", "Animals", "Vaccinations Due", "Disease Cases"],
    datasets: [
      {
        label: "System Statistics",
        data: [
          stats.total_farmers,
          stats.total_animals,
          stats.vaccinations_due,
          stats.total_diseases
        ],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#F44336"
        ]
      }
    ]
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>

      <h1 style={{ marginBottom: "30px" }}>
        Animal Husbandry Dashboard
      </h1>

      {/* Stats Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <div style={{
          background:"#4CAF50",
          padding:"20px",
          borderRadius:"8px"
        }}>
          <h3>Farmers</h3>
          <h2>{stats.total_farmers}</h2>
        </div>

        <div style={{
          background:"#2196F3",
          padding:"20px",
          borderRadius:"8px"
        }}>
          <h3>Animals</h3>
          <h2>{stats.total_animals}</h2>
        </div>

        <div style={{
          background:"#FFC107",
          padding:"20px",
          borderRadius:"8px",
          color:"black"
        }}>
          <h3>Vaccinations Due</h3>
          <h2>{stats.vaccinations_due}</h2>
        </div>

        <div style={{
          background:"#F44336",
          padding:"20px",
          borderRadius:"8px"
        }}>
          <h3>Disease Cases</h3>
          <h2>{stats.total_diseases}</h2>
        </div>

      </div>


      {/* Analytics Chart */}

      <div style={{
        width:"700px",
        marginBottom:"50px"
      }}>
        <Bar data={chartData} />
      </div>


      {/* Outbreak Map */}

      <h2 style={{ marginBottom: "15px" }}>
        Disease Outbreak Map
      </h2>

      <OutbreakMap />

    </div>
  );
}

export default Dashboard;