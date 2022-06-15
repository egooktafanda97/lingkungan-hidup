import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.scss";
import { CheckLogin } from "../../utils/functionComponent";
import Table from "./../../utils/Table";
import { BuildTimbangan, ColomTimbangan } from "./setTableTimbangan";
import { getTimbangan } from "./Model";
function Timbangan() {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    getTimbangan((res) => {
      BuildTimbangan(res, (result) => {
        setData(result);
        setLoadData(true);
      });
    });
  }, []);

  return (
    <div>
      <div className='w-100 cards p-3'>
        <div className='flex-betwen mb-4'>
          <div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
            Truck
          </div>
        </div>
        {loadData ? (
          <Table {...ColomTimbangan(data)} />
        ) : (
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
        )}
      </div>
    </div>
  );
}

// ==============================================================================
const App = () => {
  useEffect(() => {
    CheckLogin();
  }, []);
  return <Timbangan />;
};

render(<App />, document.getElementById("components"));
