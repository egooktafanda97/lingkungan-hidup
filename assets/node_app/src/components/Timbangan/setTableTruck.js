import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import $ from "jquery";
import { FaTimes, FaPen, FaTrash, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import { useLayer, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import swalReact from "@sweetalert/with-react";
import { onDeleted, rupiah } from "../../utils/functionComponent";

export const ColomTruck = (data) => {
  const ItemSet = {
    selectFilter: ["no_polisi", "jenis_mobil", "nama_sopir", "kiriman"],
    Column: [
      {
        title: "No",
        style: {
          width: "5px",
        },
      },

      "NO POLISI",
      "JENIS MOBIL",
      "TARE",
      "NAMA SOPIR",
      "KIRIMAN DARI",
    ],
    dataSet: data,
    pagination: {
      pageLimit: 10,
    },
  };
  return ItemSet;
};

export const BuildTruck = (data, response, action) => {
  console.log(data);
  const result = [];
  data.map((item, i) => {
    result.push({
      No: <strong>{i + 1}</strong>,
      no_polisi: item.no_polisi,
      jenis_mobil: item.jenis_mobil,
      tare: item.tare,
      nama_sopir: item.nama_sopir,
      kiriman: item?.sender?.nama_lokasi ?? "-",
    });
  });
  response(result);
};
