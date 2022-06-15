import React, { useState, useEffect } from "react";
import "../../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import { FaTimes, FaPen, FaTrash, FaEye } from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../../utils/Table";
import { onDeleted, rupiah } from "../../../utils/functionComponent";

import { useLayer } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import { Build, Colom } from "./setTable";

const actionReq = async (data, reponse) => {
  const post = await axios
    .post(localStorage.getItem("base_url") + "api/usaha/create", data)
    .catch((err) => {
      $(".btn-form-submit").removeClass("loading");
      console.log(err.reponse);
      toastr.error("data gagal di simpan");
    });
  if (post != undefined && post.status == 200) {
    swal({
      title: "Sukses",
      text: "",
      icon: "success",
      button: "Oke",
    });
    reponse(post.data);
  }
};

const UsahaGet = async (reponse) => {
  const gets = await axios
    .get(localStorage.getItem("base_url") + "api/retribusi/get/all_group")
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};

const UserGetUser = async (reponse) => {
  const gets = await axios
    .get(localStorage.getItem("base_url") + "api/auth/user-get")
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};

const UserGetUserSearch = async (param = "all_group", reponse) => {
  const gets = await axios
    .get(localStorage.getItem("base_url") + "api/retribusi/get/" + param.type, {
      headers: {
        where: JSON.stringify(param.search),
      },
    })
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};

const GetDataZaona = async (reponse) => {
  const gets = await axios
    .get(localStorage.getItem("base_url") + "api/zona/get/all")
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};
const GetDataJenisUsaha = async (reponse) => {
  const gets = await axios
    .get(localStorage.getItem("base_url") + "api/jenis_usaha/get/all")
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};
export {
  actionReq,
  UsahaGet,
  UserGetUser,
  GetDataZaona,
  GetDataJenisUsaha,
  UserGetUserSearch,
};
