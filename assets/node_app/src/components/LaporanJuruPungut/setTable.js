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
      "nip",
      "nama",
      "usaha",
      "jmlPengutipan",
      "total_belum_tertagih",
      "belum",
    ],
    Column: [
      {
        title: "No",
        style: {
          width: "5px",
        },
      },
      "NIP",
      "NAMA PENGUTIP",
      "JUMLAH WAJIB PAJAK",
      "JUMLAH PENGUTIPAN",
      "JUMLAH DIPUNGUT",
      "JUMLAH  BELUM DIPUNGUT",
      "TOTAL RETERIBUSI",
      "TOTAL TERTAGIH",
      "TOTAL BELUM TERTAGIH",
    ],
    dataSet: data,
    pagination: {
      pageLimit: 10,
    },
  };
  return ItemSet;
};

export const Build = (data, response, action) => {
  const result = [];
  data.map((item, i) => {
    var total = 0;
    var total_harusnya = 0;
    item.retribusi.map((it) => {
      total += parseFloat(it.jumlah_tagihan);
    });
    item.total_usaha.map((its) => {
      total_harusnya += parseFloat(its.tipe_usaha.jumlah_retribusi) * 12;
    });
    result.push({
      No: <strong>{i + 1}</strong>,
      nip: item.nip,
      nama: item.nama,
      usaha: item.total_usaha.length,
      jmlPengutipan: parseInt(item.total_usaha.length) * 12,
      selesai: item.retribusi.length,
      belum: parseInt(item.total_usaha.length) * 12 - item.retribusi.length,
      total_harusnya: rupiah("" + total_harusnya, "Rp"),
      total: rupiah("" + total, "Rp"),
      total_belum_tertagih: rupiah("" + (total_harusnya - total), "Rp"),
    });
  });
  response(result);
};
