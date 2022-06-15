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

  const [idTipe, setIdTipe] = useState(null);
  const [zona, setZona] = useState(null);

  const [juruPungut, setJuruPungut] = useState(null);

  const [jenis_us, setJenisUs] = useState(null);

  const [status, setStatus] = useState({ value: "aktif", label: "aktif" });

  // ================================

  const Actions = {
    onEdit: (res) => {
      ModalInp();
      setIdTipe(res.id_tipe_usaha);
      $("[name='tipe_usaha']").val(res.tipe_usaha);
      $("[name='keterangan']").val(res.keterangan);
      $("[name='jumlah_retribusi']").val(res.jumlah_retribusi);
      $("[name='status']").val(res.status);
    },
    onDelete: (id) => {
      onDeleted("jenis_usaha/delete/" + id, (res) => {
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
    form_data.append(
      "jumlah_retribusi",
      parseInt($("[name='jumlah_retribusi']").val())
    );
    form_data.append("tipe_usaha", $("[name='jumlah_retribusi']").val());
    form_data.append("status", "aktif");
    if (idTipe != null && idTipe != undefined) {
      form_data.append("id_tipe_usaha", idTipe);
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
      .get(localStorage.getItem("base_url") + "api/jenis_usaha/get/all")
      .catch((err) => {
        console.log(err.response);
      });
    if (getter != undefined && getter.status == 200) {
      Build(
        getter.data,
        (res) => {
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
            Tipe Usaha
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
            <h6>Tipe Usaha</h6>
            <button className='btn-circle button-close' onClick={ModalInpClose}>
              <FaTimes />
            </button>
          </div>
          <hr />
          <form onSubmit={actions}>
            <div className='row'>
              {/* <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''></label>
                  <input
                    name='tipe_usaha'
                    type='text'
                    className='form-control'
                    placeholder='nama usaha'
                    required
                  />
                </div>
              </div> */}
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Tarif
                  </label>
                  <input
                    name='jumlah_retribusi'
                    type='number'
                    className='form-control'
                    placeholder='jumlah tagihan , jangan tambahakan titik atau koma'
                    required
                  />
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
              {/* <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    status
                  </label>
                  <select
                    name='status'
                    className='form-control form-control-sm'>
                    <option value='aktif'>Aktif</option>
                    <option value='nonaktif'>Nonaktif</option>
                  </select>
                </div>
              </div> */}

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
