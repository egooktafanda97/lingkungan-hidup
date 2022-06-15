import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "@faker-js/faker";
import $ from "jquery";
import { getLineCountRetribusi } from "./Model";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [dataset, setData] = useState([]);
  const [laoder, setLoader] = useState(true);

  useEffect(() => {
    getLineCountRetribusi((res) => {
      if (res.status == 200) {
        const labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const data = {
          labels,
          datasets: [
            {
              label: "Jumlah Retribusi",
              data: res.data.map((__) => {
                return __.jumlah;
              }),
              borderColor: "#6E1111",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };
        setData(data);
        setLoader(false);
      }
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Jumlah Timbangan Per Bulan ${moment().year()}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  return laoder ? (
    <p>loading</p>
  ) : (
    <div className='cards-card'>
      <Line
        height={$(".box").height()}
        style={{
          maxHeight: "500px",
        }}
        options={options}
        data={dataset}
      />
    </div>
  );
}
