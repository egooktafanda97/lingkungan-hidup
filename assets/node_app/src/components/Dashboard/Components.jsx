import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import { FaTimes, FaPen, FaTrash, FaEye } from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import { useLayer } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import { Build, Colom } from "./setTable";
import {
  GetDataJenisUsaha,
  GetDataZaona,
  UsahaGet,
  UserGetUser,
  actionReq,
  getLineCountRetribusi,
} from "./Model";
import LoadingAnimate from "../../utils/loadingAnimate";
import LineChart from "./LuneChart";
import HorizontalBar from "./BarChart";
import getBarCountRetribusi from "./Model";
export default function Components() {
  const [data, setData] = React.useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [inputModal, setInputModal] = useState("hide-inp");
  const [idUsaha, setIdUsaha] = useState(null);

  const [optZona, setOptZona] = useState([]);
  const [zona, setZona] = useState(null);

  const [optJuru, setOptJuru] = useState([]);
  const [juruPungut, setJuruPungut] = useState(null);

  const [optJenis, setJenis] = useState([]);
  const [jenis_us, setJenisUs] = useState(null);

  const [status, setStatus] = useState({ value: "aktif", label: "aktif" });

  const [loadJuru, setLoadJuru] = useState(false);
  const [loadZona, setLoadZona] = useState(false);
  const [loadJenis, setLoadJenis] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [analic, setAnalic] = useState(false);

  // actions
  function onEdit(data) {
    setLoadJenis(false);
    setLoadZona(false);
    setLoadJuru(false);
    setJuruData((setter1) => {
      setJuruPungut(
        setter1.filter((opts1) => opts1.value === data.id_jurupungut)[0]
      );
      setLoadJuru(true);
    });
    setterZona((setter2) => {
      setZona(setter2.filter((opts2) => "" + opts2.value === data.id_zona)[0]);
      setLoadZona(true);
    });
    setterJnisUsaha((setter3) => {
      setJenisUs(
        setter3.filter((opts3) => opts3.value === data.id_jenis_usaha)[0]
      );
      setLoadJenis(true);
    });
    ModalInp();
    $("[name='kode']").val(data.kode);
    $("[name='nama_usaha']").val(data.nama_usaha);
    $("[name='nama_pemilik']").val(data.nama_pemilik);
    $("[name='alamat']").val(data.alamat);
    $("[name='no_telp']").val(data.no_telp);
    setIdUsaha(data.id_usaha);
  }
  const onDelete = (id) => {
    onDeleted("usaha/delete/" + id, (res) => {
      setterData();
      reset();
    });
  };

  useEffect(() => {
    console.log(loadJenis, loadZona, loadJuru);
  }, [loadJuru, loadZona, loadJenis]);
  const Actions = {
    onEdit: onEdit,
    onDelete: onDelete,
  };
  // ///////

  // //////////////// request axios ///////////////////////

  // //////////////////////////////////////////////////////

  useEffect(() => {
    setterData(() => {
      setLoadData(true);
    });
    setJuruData(() => {
      setLoadJuru(true);
    });
    setterZona(() => {
      setLoadZona(true);
    });
    setterJnisUsaha(() => {
      setLoadJenis(true);
    });
    getAnalic();
  }, []);
  const setterData = (callback) => {
    UsahaGet((res) => {
      Build(
        res,
        (res) => {
          setData(res);
        },
        Actions
      );
      callback(res);
      setDefaultData(res);
    });
  };
  const setJuruData = (callback) => {
    UserGetUser((res) => {
      const Opt = [];
      res.map((itm, i) => {
        Opt.push({ value: itm.id, label: itm.nama });
      });
      setOptJuru(Opt);
      callback(Opt);
    });
  };
  const setterZona = (callback) => {
    GetDataZaona((res) => {
      const result = [];
      res.map((val) => {
        result.push({ value: val.id_zona, label: val.nama_zona });
      });
      setOptZona(result);
      callback(result);
    });
  };
  const setterJnisUsaha = (callback) => {
    GetDataJenisUsaha((res) => {
      const result = [];
      res.map((val) => {
        result.push({ value: val.id_jenis_usaha, label: val.nama_jenis_usaha });
      });
      setJenis(result);
      callback(result);
    });
  };

  $(".modal-costum-container").click(function () {
    $(this).removeClass("show-mod").addClass("hide-mod");
    setInputModal("hide-inp");
  });
  const ModalInpClose = () => {
    $(".modal-costum-container").removeClass("show-mod").addClass("hide-mod");
    setInputModal("hide-inp");
  };
  const ModalInp = () => {
    $(".modal-costum-container").addClass("show-mod").removeClass("hide-mod");
    setInputModal("show-inp");
    $("[name='nip']").focus();
  };

  const action = (e) => {
    $(".btn-form-submit").addClass("loading");
    e.preventDefault();
    const form_data = new FormData(e.target);
    form_data.append("id_jurupungut", juruPungut.value);
    form_data.append("id_zona", zona.value);
    form_data.append("id_jenis_usaha", jenis_us.value);
    form_data.append("status", status.value);
    if (idUsaha != null) {
      form_data.append("id_usaha", idUsaha);
    }
    actionReq(form_data, (res) => {
      $(".btn-form-submit").removeClass("loading");
      setterData();
      ModalInpClose();
      reset();
    });
  };

  const reset = () => {
    $("[name='kode']").val("");
    $("[name='nama_usaha']").val("");
    $("[name='nama_pemilik']").val("");
    $("[name='alamat']").val("");
    $("[name='no_telp']").val("");
    setJuruPungut(null);
    setZona(null);
    setJenisUs(null);
    setIdUsaha(null);
  };

  const getAnalic = async () => {
    const getter = await axios
      .get(localStorage.getItem("base_url") + "api/dashboard/counting", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .catch(() => {});
    if (getter.status == 200) {
      setAnalic(getter.data);
    }
  };
  return (
    <div>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card card-sm bg-mode1'>
            <div className='card-icon'>
              <i className='ion ion-ios-paper-outline' />
            </div>
            <div className='card-wrap'>
              <div className='card-body t-w'>{analic?.usaha ?? 0}</div>
              <div className='card-header'>
                <h4 className='t-w'>WAJIB PAJAK</h4>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card card-sm bg-mode2'>
            <div>
              <div className='card-icon'>
                <i className='ion ion-person' />
              </div>
              <div className='card-wrap'>
                <div className='card-body t-w'>{analic?.jurupungut ?? 0}</div>
                <div className='card-header'>
                  <h4 className='t-w'>JURUPUNGUT</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card card-sm bg-mode3'>
            <div className='card-icon'>
              <i className='ion ion-person' />
            </div>
            <div className='card-wrap'>
              <div className='card-body t-w'>{analic?.npwrd ?? 0}</div>
              <div className='card-header'>
                <h4 className='t-w'>NPWRD</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-100 cards p-3'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='cards1 p-3 card-heigh'>
              <strong>Tahun : 2022</strong>
              <LineChart />
            </div>
          </div>
          <div className='col-md-4'>
            <div
              className='cards1 p-3'
              style={{
                height: $(".card-heigh").height() + 10,
                overflow: "auto",
              }}>
              <strong>Pengutipan Tahun : 2022</strong>
              <HorizontalBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
