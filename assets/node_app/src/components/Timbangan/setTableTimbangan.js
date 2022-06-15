import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import $ from "jquery";
import { FaTimes, FaPen, FaTrash, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import { useLayer, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import swalReact from "@sweetalert/with-react";
import { onDeleted, rupiah } from "../../utils/functionComponent";
import moment from "moment";
export const ColomTimbangan = (data) => {
  const ItemSet = {
    selectFilter: ["nama_zona", "keterangan_zona", "status_zona"],
    Column: [
      {
        title: "No",
        style: {
          width: "5px",
        },
      },
      "NOMOR SERI",
      "NOMOR POLISI",
      "NAMA LOKASI",
      "JENIS MOBIL",
      "SPESIFIKASI MOBIL",
      "BERAT KOTOR",
      "BERAT MOBIL",
      "TOTAL BERAT",
      "TANGGAL",
    ],
    dataSet: data,
    pagination: {
      pageLimit: 10,
    },
  };
  return ItemSet;
};

export const BuildTimbangan = (data, response, action) => {
  console.log(data);
  const result = [];
  data.map((item, i) => {
    result.push({
      No: <strong>{i + 1}</strong>,
      serial_no: item.serial_no,
      no_polisi: item?.truck?.no_polisi ?? "-",
      nama_lokasi: item?.sender?.nama_lokasi ?? "-",
      jenis_mobil: item?.truck?.jenis_mobil ?? "-",
      Spesifikasi: item.barang,
      groos: item.berat,
      tare: item.tare,
      total: item.total,
      tanggal: moment(item.tanggal).format("YYYY-MM-DD"),
    });
  });
  response(result);
};
