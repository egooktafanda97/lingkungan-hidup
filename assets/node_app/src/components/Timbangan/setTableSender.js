import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import $ from "jquery";
import { FaTimes, FaPen, FaTrash, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import { useLayer, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import swalReact from "@sweetalert/with-react";
import { onDeleted, rupiah } from "../../utils/functionComponent";

export const ColomSender = (data) => {
  const ItemSet = {
    selectFilter: ["nama_zona", "keterangan_zona", "status_zona"],
    Column: [
      {
        title: "No",
        style: {
          width: "5px",
        },
      },

      "NAMA LOKASI",
      "KETERANGAN",
      "SPESIFIKASI",
      "STATUS",
      "ACTION",
    ],
    dataSet: data,
    pagination: {
      pageLimit: 10,
    },
  };
  return ItemSet;
};

export const BuildSender = (data, response, action) => {
  const result = [];
  data.map((item, i) => {
    result.push({
      No: <strong>{i + 1}</strong>,
      nama_lokasi: item.nama_lokasi,
      keterangan: item.keterangan,
      spesifikasi_alamat: item.spesifikasi_alamat,
      status: item.status == 1 ? "Aktif" : "Tidak Aktif",
    });
  });
  response(result);
};
