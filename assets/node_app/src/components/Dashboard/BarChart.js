import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { getBarCountRetribusi } from "./Model";
export default function BarChart() {
  const [dataset, setData] = useState([]);
  const [laoder, setLoader] = useState(true);
  useEffect(() => {
    getBarCountRetribusi((res) => {
      const labels = res.data.map((_) => {
        return _.nama;
      });
      const data = {
        labels,
        datasets: [
          {
            label: "Terpungut",
            data: res.data.map((_) => {
              return _.retribusi.length;
            }),
            backgroundColor: "#6E1111",
          },
          {
            label: "Belum Di Pungut",
            data: res.data.map((_) => {
              return (
                parseFloat(_?.total_usaha?.length ?? 0) * 12 -
                parseFloat(_.retribusi.length)
              );
            }),
            backgroundColor: "#cccccc",
          },
        ],
      };
      setData(data);
      setLoader(false);
    });
  }, []);

  const options = {
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return laoder ? (
    <p>loading</p>
  ) : (
    <div className='cards-card'>
      <Bar height={500} options={options} data={dataset} />
    </div>
  );
}
