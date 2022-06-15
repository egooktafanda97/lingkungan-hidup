import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import {
  FaTimes,
  FaPen,
  FaTrash,
  FaEye,
  FaExpand,
  FaMinus,
  FaDollarSign,
  FaStoreAlt,
} from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import LoadingAnimate from "../../utils/loadingAnimate";
import { actionReq, getInfoTable, getRiwayatById } from "./Model";

import { Build, Colom } from "./setTable";
import moment from "moment";
import ComponentDataRetribusi from "./RepRetribusi/Components";
import ComponentGrafik from "./BarChart";

export default function Components() {
  const [data, setData] = React.useState({});
  const [loadData, setLoading] = useState(true);
  const [Page, setPage] = useState(null);
  const [pageAct, setPageAct] = useState(0);
  const [layoutCard, setLayoutCard] = useState(0);
  useEffect(() => {
    getUs((result) => {
      if (result.status == 200) {
        setData(result.data);
      }
    });
  }, []);

  const getUs = async (response) => {
    const gets = await axios
      .get(
        localStorage.getItem("base_url") +
          "api/auth/getUserById/" +
          window.id_user,
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => {
        response(err.response);
      });
    if (gets != undefined && gets.status == 200) {
      response(gets);
    }
  };
  return (
    <div>
      <div className='w-100 cards p-3'>
        {loadData ? (
          <div className='continer'>
            <div className='row'>
              <div className={`${layoutCard == 0 ? "col-md-4" : "d-none"}`}>
                <div className='w-100 cards1 p-3'>
                  <div
                    className='image-user w-100 d-flex'
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}>
                    <img
                      src={
                        localStorage.getItem("base_url") +
                        "public/img/users/default.png"
                      }
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "100%",
                        border: "1px solid #ccc",
                      }}
                      alt=''
                    />
                    <div
                      style={{
                        marginTop: "5px",
                      }}>
                      <strong>{data.nama != undefined && data.nama}</strong>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      borderBottom: "2px solid #ccc",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}></div>
                  <div>
                    <div className='list-detail'>
                      <strong>Nip</strong>{" "}
                      <strong>{data.nip != undefined && data.nip}</strong>
                    </div>
                    <hr />
                    <div className='list-detail'>
                      <strong>Alamat</strong>{" "}
                      <strong>{data.alamat != undefined && data.alamat}</strong>
                    </div>
                    <hr />
                    <div className='list-detail'>
                      <strong>No Telepon</strong>{" "}
                      <strong>
                        {data.no_telp != undefined && data.no_telp}
                      </strong>
                    </div>
                    <hr />
                    <div className='list-detail'>
                      <strong>Status Akun</strong>{" "}
                      <strong>
                        {data.status_account != undefined &&
                        data.status_account == "isActive" ? (
                          <strong style={{ color: "green" }}>Aktif</strong>
                        ) : (
                          <strong style={{ color: "orange" }}>
                            Tidak Aktif
                          </strong>
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${layoutCard == 0 ? "col-md-8" : "col-12"}`}>
                <div className='w-100 cards1 p-3'>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <span>data</span>
                    <span
                      className='mimimaze-maximaze'
                      onClick={() => {
                        setLayoutCard(layoutCard == 0 ? 1 : 0);
                      }}>
                      {layoutCard == 0 ? (
                        <FaExpand size={14} />
                      ) : (
                        <FaMinus size={14} />
                      )}
                    </span>
                  </div>
                  <hr />
                  <div className='container-menu-card'>
                    <div
                      onClick={() => {
                        setPage(
                          <Data
                            saldo={data.saldo != undefined ? data.saldo : 0}
                            usaha={
                              data.usaha != undefined ? data.usaha.length : 0
                            }
                          />
                        );
                        setPageAct(0);
                      }}
                      className={`item-card-menu ${pageAct == 0 && "active"}`}>
                      Data Retribusi
                    </div>
                    <div
                      className={`item-card-menu ${pageAct == 1 && "active"}`}
                      onClick={() => {
                        setPage(<Riwayat />);
                        setPageAct(1);
                      }}>
                      Riwayat
                    </div>
                    <div
                      className={`item-card-menu ${pageAct == 2 && "active"}`}
                      onClick={() => {
                        setPage(<ComponentDataRetribusi />);
                        setPageAct(2);
                      }}>
                      Pengutipan
                    </div>
                    <div
                      className={`item-card-menu ${pageAct == 6 && "active"}`}
                      onClick={() => {
                        setPage(<RiwayatSaldo load={true} />);
                        setPageAct(6);
                      }}>
                      Riwayat Saldo
                    </div>
                    <div
                      className={`item-card-menu ${pageAct == 5 && "active"}`}
                      onClick={() => {
                        setPage(<InfoTable load={true} />);
                        setPageAct(5);
                      }}>
                      Tabel
                    </div>
                    <div
                      className={`item-card-menu ${pageAct == 4 && "active"}`}
                      onClick={() => {
                        setPage(<Grafik load={true} />);
                        setPageAct(4);
                      }}>
                      Grafik
                    </div>
                  </div>
                  <hr />
                  {/* components */}
                  {Page == null ? (
                    <Data
                      saldo={data.saldo != undefined ? data.saldo : 0}
                      usaha={data.usaha != undefined ? data.usaha.length : 0}
                    />
                  ) : (
                    Page
                  )}
                  {/* <Riwayat /> */}
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
    </div>
  );
}

// component Laporan Retribusi

// Componnet Riwayat
const Riwayat = () => {
  const [loadData, setLoadData] = useState(false);
  const [data, setData] = useState([]);
  const [Footers, setFooter] = useState(null);

  useEffect(() => {
    getters();
  }, []);
  const getters = async () => {
    const get = await axios
      .get(
        localStorage.getItem("base_url") +
          "api/retribusi/getDataRetribusi/" +
          window.id_user
      )
      .catch((err) => {
        console.log(err.response);
      });
    if (get != undefined && get.status == 200) {
      BuildRiwayat(
        get.data,
        (res) => {
          setData(res);
          setLoadData(true);
        },
        (Foot) => {
          setFooter(<Foot />);
        }
      );
    }
  };
  const ColomRiwayat = (data) => {
    const ItemSet = {
      selectFilter: [
        "nama_usaha",
        "nama_pemilik",
        "jenis_usaha",
        "alamat",
        "jumlah_retribusi",
        "bulan",
        "tanggal",
      ],
      Column: [
        "TANGGAL PENGUTIPAN",
        "NAMA USAHA",
        "NAMA PEMILIK",
        "JENIS USAHA",
        "TIPE USAHA",
        "ALAMAT",
        "TAGIHAN BULAN",
        "JUMLAH TAGIHAN",
      ],
      dataSet: data,
      pagination: {
        pageLimit: 10,
      },
    };

    return ItemSet;
  };

  const BuildRiwayat = (data, response, footer) => {
    const result = [];
    var tot = 0;
    data.map((item, i) => {
      result.push({
        tanggal: moment(item.tanggal_kutip).format("DD MMMM YYYY"),
        nama_usaha: item.usaha.nama_usaha,
        nama_pemilik: item.usaha.nama_pemilik,
        jenis_usaha: item.usaha.jenis_usaha,
        alamat: item.usaha.alamat,
        tipe_usaha: item.usaha.tipe_usaha.tipe_usaha,
        bulan: item.bulan,
        jumlah_retribusi: rupiah("" + item.jumlah_tagihan),
        // jumlah_retribusi: rupiah(item.usaha.tipe_usaha.jumlah_retribusi, "Rp"),
      });
      tot += parseFloat(item.jumlah_tagihan);
      // tot += parseFloat(item.usaha.tipe_usaha.jumlah_retribusi);
    });
    response(result);
    const Foot = () => {
      return (
        <tr>
          <th className={`dynatable_th`} colSpan='7'>
            Total
          </th>
          <th className={`dynatable_th`}>{rupiah("" + tot, "Rp ")}</th>
        </tr>
      );
    };

    footer(Foot);
  };

  const hndelResonseDataFilter = (res) => {
    if (res != undefined) {
      var tot = 0;
      res.map((data) => {
        tot +=
          data.jumlah_retribusi != undefined &&
          parseFloat(data.jumlah_retribusi.replace(/\D/g, ""));
      });
      const Foot = () => {
        return (
          <tr>
            <th className={`dynatable_th`} colSpan='7'>
              Total
            </th>
            <th className={`dynatable_th`}>{rupiah("" + tot, "Rp ")}</th>
          </tr>
        );
      };
      setFooter(<Foot />);
    }
  };
  return (
    <div>
      {/* <div
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
              className='search-opt'>
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
        <div style={{ display: "flex" }}>
          <div className='searchs-container'>
            <select name='id_jurupungut' className='search-opt'>
              <option value=''>Pilih Juru Pungut</option>
            </select>
          </div>
          <div className='searchs-container'>
            <select
              data-table='usaha'
              name='id_tipe_usaha'
              className='search-opt'>
              <option value=''>Pilih Tipe Usaha</option>
            </select>
          </div>
        </div>
      </div> */}
      {loadData ? (
        <Table
          {...ColomRiwayat(data)}
          Footer={Footers != null ? Footers : null}
          responseFilter={hndelResonseDataFilter}
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
  );
};
// ===============================
// ===============================
// ===============================

const Data = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}>
      <div className='p-1 w-100'>
        <div className='card cards card-sm-4'>
          <div className='card-icon bg-primary'>
            <FaDollarSign />
          </div>
          <div className='card-wrap'>
            <div className='card-header'>
              <h4>Saldo</h4>
            </div>
            <div className='card-body'>
              {props.saldo != undefined && rupiah("" + props.saldo, "Rp")}
            </div>
          </div>
        </div>
      </div>
      <div className='p-1 w-100'>
        <div className='card cards card-sm-4'>
          <div className='card-icon bg-primary'>
            <FaStoreAlt />
          </div>
          <div className='card-wrap'>
            <div className='card-header'>
              <h4>Total Usaha</h4>
            </div>
            <div className='card-body'>
              {props.usaha != undefined && props.usaha}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================
const Grafik = (props) => {
  return (
    <div
      className='container-bar'
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <ComponentGrafik load={props.load} />
    </div>
  );
};

// ==============================
const InfoTable = () => {
  const [loadData, setLoadData] = useState(false);
  const [Footer, setFooter] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getInfoTable(window.id_user, "", (res) => {
      if (res != undefined && res.status == 200) {
        BuildRiwayat(
          res.data,
          (res) => {
            setData(res);
            setLoadData(true);
          },
          (Foot) => {
            setFooter(Foot);
          }
        );
      }
    });
  }, []);

  const Coloms = (data) => {
    const ItemSet = {
      selectFilter: ["bula"],
      Column: [
        {
          title: "No",
          style: {
            width: "5px",
          },
        },
        {
          title: "BULAN",
          style: {
            width: "300px",
          },
        },
        "TAHUN",
        "TOTAL USAHA",
        "TOTAL TERTAGIH",
        "TOTAL TIDAK TERTAGIH",
        "TOTAL SALDO",
      ],
      dataSet: data,
      pagination: {
        pageLimit: 10,
      },
    };

    return ItemSet;
  };
  const BuildRiwayat = (data, response, footer) => {
    const result = [];
    var tot = 0;
    data.data.map((item, i) => {
      var saldo = 0;
      item.retribusi.map((it) => {
        saldo += parseFloat(it.jumlah_tagihan);
      });
      result.push({
        no: i + 1,
        bulan: moment(item.bulan).format("YYYY MMMM"),
        tahun: item.tahun,
        total_usaha: data.usaha,
        total_tertagih: item.retribusi.length,
        total_tidak_tertagih: data.usaha - item.retribusi.length,
        // sum jumlah_retribusi di usaha
        total_saldo: rupiah("" + saldo, "Rp"),
      });
      tot += saldo;
    });
    response(result);
    const Foot = () => {
      return (
        <tr>
          <th className={`dynatable_th`} colSpan='6'>
            Total
          </th>
          <th className={`dynatable_th`}>{rupiah("" + tot, "Rp ")}</th>
        </tr>
      );
    };

    footer(Foot);
  };
  const hndelResonseDataFilter = (res) => {
    if (res != undefined) {
      var tot = 0;
      res.map((data) => {
        tot += parseFloat(data.total_saldo);
      });
      const Foot = () => {
        return (
          <tr>
            <th className={`dynatable_th`} colSpan='7'>
              Total
            </th>
            <th className={`dynatable_th`}>{rupiah("" + tot, "Rp ")}</th>
          </tr>
        );
      };
      setFooter(<Foot />);
    }
  };
  const hndelSearch = (ev) => {
    getInfoTable(window.id_user, ev.target.value, (res) => {
      if (res != undefined && res.status == 200) {
        BuildRiwayat(
          res.data,
          (res) => {
            setData(res);
            setLoadData(true);
          },
          (Foot) => {
            setFooter(Foot);
          }
        );
      }
    });
  };
  return (
    <div>
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
      {loadData ? (
        <Table
          {...Coloms(data)}
          Footer={Footer != null ? Footer : null}
          responseFilter={hndelResonseDataFilter}
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
  );
};

const RiwayatSaldo = () => {
  const [loadData, setLoadData] = useState(false);
  const [Footer, setFooter] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getRiwayatById(window.id_user, (res) => {
      if (res != undefined && res.status == 200) {
        BuildRiwayat(res.data, (res) => {
          setData(res);
          setLoadData(true);
        });
      }
    });
  }, []);

  const Coloms = (data) => {
    const ItemSet = {
      selectFilter: ["bula"],
      Column: [
        {
          title: "No",
          style: {
            width: "5px",
          },
        },
        {
          title: "TANGGAL STOR",
          style: {
            width: "300px",
          },
        },
        "ADMIN PENERIMA",
        "NAMA JURUPUNGUT",
        "JUMLAH STRO",
        "SALDO AWAL",
        "TOTAL SALDO",
      ],
      dataSet: data,
      pagination: {
        pageLimit: 10,
      },
    };

    return ItemSet;
  };
  const BuildRiwayat = (data, response) => {
    const result = [];
    data.map((item, i) => {
      result.push({
        no: i + 1,
        bulan: moment(item.tanggal_stor).format("DD MMMM YYYY"),
        admin: item.admin.nama,
        nama_pengutip: item.user.nama,
        jumlah_stor: rupiah("" + item.jumlah_storan, "Rp"),
        saldo_awal: rupiah("" + item.jumlah_saldo, "Rp"),
        total_saldo: rupiah("" + item.saldo, "Rp"),
      });
    });
    response(result);
  };
  const hndelResonseDataFilter = (res) => {
    if (res != undefined) {
      // var tot = 0;
      // res.map((data) => {
      //   tot += parseFloat(data.total_saldo);
      // });
      // const Foot = () => {
      //   return (
      //     <tr>
      //       <th className={`dynatable_th`} colSpan='7'>
      //         Total
      //       </th>
      //       <th className={`dynatable_th`}>{rupiah("" + tot, "Rp ")}</th>
      //     </tr>
      //   );
      // };
      // setFooter(<Foot />);
    }
  };
  return (
    <div>
      <div
        className='w-100'
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}></div>
      {loadData ? (
        <Table
          {...Coloms(data)}
          Footer={Footer != null ? Footer : null}
          responseFilter={hndelResonseDataFilter}
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
  );
};
