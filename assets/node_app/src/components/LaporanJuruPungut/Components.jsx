import React, { useState, useEffect, useRef } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import {
  FaTimes,
  FaPen,
  FaTrash,
  FaEye,
  FaRegTrashAlt,
  FaDollarSign,
} from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import LoadingAnimate from "../../utils/loadingAnimate";
import { getLaporanTahunan } from "./Model";

import { Build, Colom } from "./setTable";
import moment from "moment";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
export default function Components() {
  const [data, setData] = React.useState([]);
  const [loadData, setLoadData] = useState(false);
  const [dataset, setDataSet] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    getLaporanTahunan(moment().format("YYYY"), (res) => {
      if (res.status == "200") {
        Build(res.data, (result) => {
          setData(result);
          setLoadData(true);
        });
      }
    });
  }, []);
  const hndelSearch = (ev) => {
    getLaporanTahunan(ev.target.value, (res) => {
      if (res.status == "200") {
        Build(res.data, (result) => {
          setData(result);
          setLoadData(true);
        });
      }
    });
  };
  return (
    <div>
      <div className='w-100 cards p-3'>
        {loadData ? (
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <div>
                <div className='searchs-container'>
                  <select
                    data-type='relation'
                    name='tahun'
                    data-table='pengutipan'
                    className='search-opt'
                    onChange={hndelSearch}>
                    {Array.from(
                      Array(moment().format("YYYY") - 2019).keys()
                    ).map((res) => {
                      return (
                        <option value={`${moment().format("YYYY") - res}`}>
                          {moment().format("YYYY") - res}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div>
                <ReactToPrint
                  trigger={() => (
                    <div className='btn btn-secondary btn-sm ml-2 mb-2'>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}>
                        <IoPrintOutline
                          size={15}
                          style={{ marginRight: "10px" }}
                        />
                        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Cetak
                        </span>
                      </span>
                    </div>
                  )}
                  content={() => componentRef.current}
                />
              </div>
            </div>
            <div class='card'>
              <div class='card-body'>
                <ul class='nav nav-pills' id='myTab' role='tablist'>
                  <li class='nav-item'>
                    <a
                      class='nav-link active'
                      id='home-tab3'
                      data-toggle='tab'
                      href='#home3'
                      role='tab'
                      aria-controls='home'
                      aria-selected='true'>
                      Tabel
                    </a>
                  </li>
                  {/* <li class='nav-item'>
                    <a
                      class='nav-link'
                      id='profile-tab3'
                      data-toggle='tab'
                      href='#profile3'
                      role='tab'
                      aria-controls='profile'
                      aria-selected='false'>
                      Grafik
                    </a>
                  </li> */}
                </ul>
                <div class='tab-content' id='myTabContent'>
                  <div
                    class='tab-pane fade show active'
                    id='home3'
                    role='tabpanel'
                    aria-labelledby='home-tab3'>
                    <Table {...Colom(data)} />
                  </div>
                  <div
                    class='tab-pane fade'
                    id='profile3'
                    role='tabpanel'
                    aria-labelledby='profile-tab3'>
                    Sed sed metus vel lacus hendrerit tempus. Sed efficitur
                    velit tortor, ac efficitur est lobortis quis. Nullam lacinia
                    metus erat, sed fermentum justo rutrum ultrices. Proin quis
                    iaculis tellus. Etiam ac vehicula eros, pharetra consectetur
                    dui.
                  </div>
                  <div
                    class='tab-pane fade'
                    id='contact3'
                    role='tabpanel'
                    aria-labelledby='contact-tab3'>
                    Vestibulum imperdiet odio sed neque ultricies, ut dapibus mi
                    maximus. Proin ligula massa, gravida in lacinia efficitur,
                    hendrerit eget mauris. Pellentesque fermentum, sem interdum
                    molestie finibus, nulla diam varius leo, nec varius lectus
                    elit id dolor.
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} data={data} />
      </div>
    </div>
  );
}
