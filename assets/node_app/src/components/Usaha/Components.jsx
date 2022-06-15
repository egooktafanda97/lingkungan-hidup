import React, { useState, useEffect, useRef } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
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
  getUsahaById,
} from "./Model";
import LoadingAnimate from "../../utils/loadingAnimate";
// import QrCode from "./QrCode";
import {
  FaTimes,
  FaPen,
  FaTrash,
  FaEye,
  FaRegTrashAlt,
  FaDollarSign,
  FaPlus,
  FaQrcode,
} from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LaporanUsaha } from "./laporan_print/LaporanUsaha";
import { PrintQrCode } from "./laporan_print/PrintQrCode";
import Creatable, { useCreatable } from "react-select/creatable";
export default function Components() {
  const [data, setData] = React.useState([]);
  const [dataset, setDataset] = React.useState([]);
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
  const [dataQrcode, setDataQrcode] = useState([]);
  const [IsNews, set__IsNews__] = useState(false);
  // ------------------------------------------------------
  const componentRef = useRef();
  const componentRefUsaha = useRef();
  // -----------------------------------------------------
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
      // console.log(setter2.filter((opts2) => opts2.value === data.id_zona)[0]);
      setZona(setter2.filter((opts2) => opts2.value === data.id_zona)[0]);
      setLoadZona(true);
    });
    setterJnisUsaha((setter3) => {
      setJenisUs(
        setter3.filter((opts3) => opts3.value === data.id_tipe_usaha)[0]
      );
      setLoadJenis(true);
    });
    ModalInp();
    $("[name='kode']").val(data.kode);
    $("[name='nama_usaha']").val(data.nama_usaha);
    $("[name='nama_pemilik']").val(data.nama_pemilik);
    $("[name='jenis_usaha']").val(data.jenis_usaha);
    $("[name='alamat']").val(data.alamat);
    $("[name='no_telp']").val(data.no_telp);
    setIdUsaha(data.id_usaha);
  }
  useEffect(() => {
    console.log(">><<", dataQrcode);
  }, [dataQrcode]);
  const onDelete = (id) => {
    onDeleted("usaha/delete/" + id, (res) => {
      setterData();
      reset();
    });
  };
  const Actions = {
    onEdit: onEdit,
    onDelete: onDelete,
    onLihat: (item) => {
      window.location.href =
        localStorage.getItem("web_url") + "usaha/detail/" + item.id_usaha;
    },
  };
  // //////////////// request axios ///////////////////////
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
  }, []);
  const setterData = (callback) => {
    UsahaGet((res) => {
      Build(
        res,
        (res) => {
          setData(res);
          setDataset(res);
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
        result.push({ value: val.id_tipe_usaha, label: val.tipe_usaha });
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
    form_data.append("id_tipe_usaha", jenis_us.value);
    form_data.append("status", status.value);
    form_data.append("newZona", IsNews);
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

  return (
    <div>
      <div className='w-100 cards p-3'>
        <div className='flex-betwen mb-4'>
          <div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
            Wajib Pajak
          </div>
          <div style={{ display: "flex" }}>
            <button
              className='btn btn-primary btn-sm centerDisplay'
              onClick={() => {
                ModalInp();
                reset();
              }}>
              <FaPlus size={15} style={{ marginRight: "5px" }} /> Tambah Data
            </button>
            <ReactToPrint
              trigger={() => (
                <div className='btn btn-secondary btn-sm ml-2 mr-2'>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}>
                    <IoPrintOutline size={15} style={{ marginRight: "10px" }} />
                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Cetak
                    </span>
                  </span>
                </div>
              )}
              content={() => componentRefUsaha.current}
            />
            <ReactToPrint
              trigger={() => (
                <button className='btn btn-secondary btn-sm centerDisplay'>
                  <FaQrcode size={15} style={{ marginRight: "5px" }} /> Cetak Qr
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>

        {loadData ? (
          <Table
            {...Colom(data)}
            responseFilter={(result) => {
              setDataset(result);
            }}
            datapaging={(results) => {
              setDataQrcode(results);
            }}
          />
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
            <h6>Input Data Wajib Pajak</h6>
            <button className='btn-circle button-close' onClick={ModalInpClose}>
              <FaTimes />
            </button>
          </div>
          <hr />
          <form onSubmit={action}>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Kode
                  </label>
                  <input
                    name='kode'
                    type='text'
                    className='form-control'
                    placeholder='kode'
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Nama Usaha
                  </label>
                  <input
                    name='nama_usaha'
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
                    Nama Pemilik
                  </label>
                  <input
                    name='nama_pemilik'
                    type='text'
                    className='form-control'
                    placeholder='nama pemilik'
                    required
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Jenis Usaha
                  </label>
                  <input
                    name='jenis_usaha'
                    type='text'
                    className='form-control'
                    placeholder='jenis Usaha'
                    required
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    No Telepon
                    <div className='msg-input msg-warning'>
                      <i>boleh kosong</i>
                    </div>
                  </label>
                  <input
                    name='no_telp'
                    type='text'
                    className='form-control'
                    placeholder='no telepon pemilik'
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Alamat
                  </label>
                  <input
                    name='alamat'
                    type='text'
                    className='form-control'
                    placeholder='alamat lengkap jurupungut'
                    required
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Zona
                  </label>
                  <LoadingAnimate visible={!loadZona}>
                    {/* <Select
                      value={zona}
                      options={optZona}
                      onChange={(opt) => {
                        setZona(opt);
                      }}
                    /> */}
                    <Creatable
                      isClearable={true}
                      options={optZona}
                      value={zona}
                      onChange={(opt) => {
                        if (opt.__isNew__ === true) {
                          setZona(opt);
                          set__IsNews__(true);
                        } else {
                          setZona(opt);
                          set__IsNews__(false);
                        }
                      }}
                    />
                  </LoadingAnimate>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Jurupungut
                    <div className='msg-input msg-warning'>
                      <i style={{ color: "green" }}>pilih jurungut</i>
                    </div>
                  </label>
                  <LoadingAnimate visible={!loadJuru}>
                    <Select
                      value={juruPungut}
                      options={optJuru}
                      onChange={(opt) => {
                        setJuruPungut(opt);
                      }}
                    />
                  </LoadingAnimate>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Tarif Retribusi
                  </label>
                  <LoadingAnimate visible={!loadJenis}>
                    <Select
                      width='100%'
                      value={jenis_us}
                      options={optJenis}
                      onChange={(opt) => {
                        setJenisUs(opt);
                      }}
                    />
                  </LoadingAnimate>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Status
                  </label>

                  <Select
                    options={[
                      { value: "aktif", label: "aktif" },
                      { value: "tidak aktif", label: "tidak Aktif" },
                    ]}
                    value={status}
                    onChange={(opt) => {
                      setStatus(opt);
                    }}
                  />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label className='label' htmlFor=''>
                    Foto
                    <div className='msg-input msg-warning'>
                      <i>boleh kosong jika tidak ada foto</i>
                    </div>
                  </label>
                  <input
                    name='foto'
                    type='file'
                    className='form-control form-control-sm'
                  />
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
      <div style={{ display: "none" }}>
        <PrintQrCode ref={componentRef} data={dataQrcode} />
      </div>
      <div style={{ display: "none" }}>
        <LaporanUsaha ref={componentRefUsaha} data={dataset} />
      </div>
    </div>
  );
}
