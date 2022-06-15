import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import swalReact from "@sweetalert/with-react";

const actionReq = async (data, reponse) => {
  const post = await axios
    .post(localStorage.getItem("base_url") + "api/zona/create", data, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
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

const getbarCount = async (id_juru, tahun, reponse) => {
  const gets = await axios
    .get(
      localStorage.getItem("base_url") +
        "api/retribusi/getBarChartCount/" +
        id_juru +
        "/" +
        tahun,
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
    .catch((err) => {
      reponse(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets);
  }
};

const getInfoTable = async (id_juru, tahun, reponse) => {
  const gets = await axios
    .get(
      localStorage.getItem("base_url") +
        "api/retribusi/getInfoRetriTable/" +
        id_juru +
        "/" +
        tahun,
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
    .catch((err) => {
      reponse(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets);
  }
};
const getRiwayatById = async (id_user, reponse) => {
  const gets = await axios
    .get(
      localStorage.getItem("base_url") + "api/auth/getRiwayatSaldo/" + id_user,
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
    .catch((err) => {
      reponse(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets);
  }
};

export { actionReq, getbarCount, getInfoTable, getRiwayatById };
