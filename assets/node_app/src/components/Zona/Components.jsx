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

import LoadingAnimate from "../../utils/loadingAnimate";
import { actionReq } from "./Model";

import { Build, Colom } from "./setTable";

export default function Components() {
  const [data, setData] = React.useState([]);
  const [loadData, setLoadData] = useState(false);
  const [inputModal, setInputModal] = useState("hide-inp");

  const [idZona, setIdZona] = useState(null);
  const [zona, setZona] = useState(null);

  const [juruPungut, setJuruPungut] = useState(null);

  const [jenis_us, setJenisUs] = useState(null);

  const [status, setStatus] = useState({ value: "aktif", label: "aktif" });

  // ================================

  const Actions = {
    onEdit: (res) => {
      ModalInp();
      setIdZona(res.id_zona);
      $("[name='nama_zona']").val(res.nama_zona);
      $("[name='status_zona']").val(res.status_zona);
      $("[name='keterangan']").val(res.keterangan);
    },
    onDelete: (id) => {
      onDeleted("zona/delete/" + id, (res) => {
        setterData(() => {});
        reset();
      });
    },
  };
  useEffect(() => {
    setterData(() => {});
  }, []);

  const actions = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    if (idZona != null && idZona != undefined) {
      form_data.append("id_zona", idZona);
    }
    actionReq(form_data, (res) => {
      setterData(() => {});
      ModalInpClose();
      reset();
    });
  };
  const setterData = async (callback) => {
    setLoadData(false);
    const getter = await axios
      .get(localStorage.getItem("base_url") + "api/zona/get/all")
      .catch((err) => {
        console.log(err.response);
      });
    if (getter != undefined && getter.status == 200) {
      Build(
        getter.data,
        (res) => {
          // console.log(res);
          setData(res);
        },
        Actions
      );
      callback(getter.data);
      setLoadData(true);
    }
  };

  // ================================
  // actions
  function onEdit(data) {}
  const onDelete = (id) => {
    onDeleted("usaha/delete/" + id, (res) => {
      setterData(() => {});
      reset();
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
    $("[name='nama_zona']").focus();
  };

  const reset = () => {
    $("[name='nama_zona']").val("");
    $("[name='status_zona']").val("");
    $("[name='keterangan']").val("");
    setIdZona(null);
  };

  return (
    <div>
      <div className='w-100 cards p-3'>
        <div className='flex-betwen mb-4'>
          <div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
            Zona
          </div>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => {
              ModalInp();
              reset();
            }}>
            Tambah Data
          </button>
        </div>

        {loadData ? (
          <Table {...Colom(data)} />
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

      <div
        className={`form-container ${inputModal}`}
        style={{ overflowY: "auto" }}>
        <div className='w-100 p-5'>
          <div className='flex-betwen'>
            <h6>Zona</h6>
            <button className='btn-circle button-close' onClick={ModalInpClose}>
              <FaTimes />
            </button>
          </div>
          <hr />
          <form onSubmit={actions}>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Nama Zona
                  </label>
                  <input
                    name='nama_zona'
                    type='text'
                    className='form-control'
                    placeholder='nama usaha'
                    required
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Statas Zona
                  </label>
                  <select
                    name='status_zona'
                    className='form-control form-control-sm'>
                    <option value=''>Pilih Status</option>
                    <option value='aktif'>Aktif</option>
                    <option value='nonaktif'>Nonaktif</option>
                  </select>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Keterangan
                  </label>
                  <textarea
                    name='keterangan'
                    className='form-control'
                    placeholder='keterangan zona boleh kosong'
                    rows='3'></textarea>
                </div>
              </div>
              <div className='col-lg-12'>
                <hr />
                <div
                  className='form-group'
                  style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      ModalInpClose();
                      reset();
                    }}
                    type='button'
                    className='btn btn-secondary mr-3 btn-sm'>
                    Batal
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary action-btn btn-sm btn-form-submit'>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
