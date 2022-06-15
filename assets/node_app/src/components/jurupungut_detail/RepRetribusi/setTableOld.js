import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import $ from "jquery";
import { FaTimes, FaPen, FaTrash, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import { useLayer, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import swalReact from "@sweetalert/with-react";
import { onDeleted, rupiah } from "../../utils/functionComponent";

export const Colom = (data) => {
  const ItemSet = {
    selectFilter: [
      "kode",
      "jurupungut",
      "nama_usaha",
      "nama_pemilik",
      "alamat",
      "tipe_usaha",
      "jumlah_retribusi",
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MEI",
      "JUN",
      "JUL",
      "AGU",
      "SEP",
      "OKT",
      "NOV",
      "DES",
    ],
    Column: [
      {
        title: "No",
        style: {
          width: "5px",
        },
      },
      "KODE",
      "NAMA JURUPUNGUT",
      "FOTO",
      "NAMA PEMILIK",
      "ALAMAT",
      "JENIS USAHA",
      "TIPE USAHA",
      {
        title: "JUMLAH TAGIHAN",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "JAN",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "FEB",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "MAR",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "APR",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "MEI",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "JUN",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "JUL",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "AGU",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "SEP",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "OKT",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "NOV",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      {
        title: "DES",
        style: {
          whiteSpace: "pre-wrap",
        },
      },
      "TOTAL",
      "ACTION",
    ],
    dataSet: data,
    pagination: {
      pageLimit: 10,
    },
  };
  return ItemSet;
};

export const Build = (data, response, footer, action) => {
  const result = [];
  var i = 1;
  var totalB = {
    JAN: 0,
    FEB: 0,
    MAR: 0,
    APR: 0,
    MEI: 0,
    JUN: 0,
    JUL: 0,
    AGU: 0,
    SEP: 0,
    OKT: 0,
    NOV: 0,
    DES: 0,
  };
  data.forEach((results) => {
    var dataSub = {
      No: <strong>{i++}</strong>,
      kode: results[0].usaha.kode,
      jurupungut: results[0].user.nama,
      foto: () => (
        <img
          onClick={() =>
            viewImg(
              localStorage.getItem("base_url") +
                "public/img/usaha/" +
                results[0].usaha.foto
            )
          }
          className='img-circle'
          style={{ width: "40px", height: "40px" }}
          src={
            localStorage.getItem("base_url") +
            "public/img/usaha/" +
            results[0].usaha.foto
          }
          alt=''
        />
      ),
      nama_pemilik: results[0].usaha.nama_pemilik,
      alamat: results[0].usaha.alamat,
      nama_usaha: results[0].usaha.nama_usaha,
      tipe_usaha: results[0].usaha.tipe_usaha.tipe_usaha,
      jumlah_retribusi: rupiah(
        "" + results[0].usaha.tipe_usaha.jumlah_retribusi,
        "Rp "
      ),
      JAN: "",
      FEB: "",
      MAR: "",
      APR: "",
      MEI: "",
      JUN: "",
      JUL: "",
      AGU: "",
      SEP: "",
      OKT: "",
      NOV: "",
      DES: "",
      TOTAL: 0,
      OPSI: <DropdownMenu />,
    };
    results.map((item, i) => {
      dataSub[compileMount(item.bulan)] = rupiah(
        "" + item.jumlah_tagihan,
        "Rp "
      );
      if (compileMount(item.bulan) != false) {
        totalB[compileMount(item.bulan)] += parseFloat(item.jumlah_tagihan);
        dataSub.TOTAL += parseFloat(item.jumlah_tagihan);
      }
    });
    result.push(dataSub);
  });
  response(result);
  const Foot = () => {
    return (
      <tr>
        <th className={`dynatable_th`} colSpan='9'>
          Total
        </th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.JAN, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.FEB, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.MAR, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.APR, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.MEI, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.JUN, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.JUL, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.AGU, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.SEP, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.OKT, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.NOV, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + totalB.DES, "Rp ")}</th>
        <th className={`dynatable_th`}>{rupiah("" + sum(totalB), "Rp ")}</th>
        <th className={`dynatable_th`}>OPSI</th>
      </tr>
    );
  };

  footer(Foot);
};
function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}
const compileMount = (munth) => {
  const bulanCompile = {
    "01": "JAN",
    "02": "FEB",
    "03": "MAR",
    "04": "APR",
    "05": "MEI",
    "06": "JUN",
    "07": "JUL",
    "08": "AGU",
    "09": "SEP",
    10: "OKT",
    11: "NOV",
    12: "DES",
  };
  const mount_ =
    munth != undefined && munth != null && munth != "" ? munth : false;
  if (mount_ != false) {
    return bulanCompile[mount_.split("-")[1]];
  } else {
    return false;
  }
};
const viewImg = (url) => {
  swalReact(
    <div>
      <img src={url} style={{ width: "100%", height: "auto" }} alt='' />
    </div>,
    {
      buttons: false,
    }
  );
};
const DropdownMenu = (props) => {
  const [isOpen, setOpen] = React.useState(false);

  // helper function to close the menu
  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    // onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "top-end", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 16, // let the arrow have some room to breath also
  });
  return (
    <>
      <button
        className='btn-action-table view'
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}>
        <IoEllipsisVertical size={20} />
      </button>

      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <ul {...layerProps} className='dd-menu'>
              <li onClick={props.onClickLihat}>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <FaEye size={15} style={{ marginRight: "10px" }} />
                  <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Lihat
                  </span>
                </span>
              </li>
              <li onClick={props.onClickCetak}>
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
              </li>
              <Arrow {...arrowProps} />
            </ul>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
