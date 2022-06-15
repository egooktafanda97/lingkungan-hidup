import React, { useState, useEffect } from "react";
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
import { getbarCount } from "./Model";
import moment from "moment";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  indexAxis: "y",
  plugins: {
    title: {
      display: true,
      text: "Grafi Pengutipan / bulan",
    },
  },
  // responsive: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function App() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setterData();
  }, []);

  const setterData = (thn = null) => {
    getbarCount(window.id_user, thn == null ? "" : thn, (res) => {
      let result = res.data;
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
      if (res.status == 200) {
        setData({
          labels,
          datasets: [
            {
              label: "Sudah Di Tagih",
              data: labels.map((it, i) =>
                result.data[i] != undefined ? result.data[i].jumlah : 0
              ),
              backgroundColor: "#6E1111",
            },
            {
              label: "Usha yang belum di tagih",
              data: labels.map((it, ix) =>
                result.data[ix] != undefined
                  ? parseFloat(result.usaha) -
                    parseFloat(result.data[ix].jumlah)
                  : 0
              ),
              backgroundColor: "#cccccc",
            },
          ],
        });
        setLoader(false);
      } else {
        console.log("error");
      }
    });
  };
  const hndelSearch = (e) => {
    setterData(e.target.value);
  };
  return loader ? (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className='data-loading'></div>
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <div
        className='w-100'
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div>
          <div className='searchs-container'>
            <select
              data-type='relation'
              name='tahun'
              data-table='pengutipan'
              className='search-opt'
              onChange={hndelSearch}>
              {Array.from(Array(moment().format("YYYY") - 2019).keys()).map(
                (res) => {
                  return (
                    <option value={`${moment().format("YYYY") - res}`}>
                      {moment().format("YYYY") - res}
                    </option>
                  );
                }
              )}
            </select>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
