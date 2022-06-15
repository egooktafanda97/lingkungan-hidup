import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import swalReact from "@sweetalert/with-react";

const actionReq = async (data, reponse) => {
  const post = await axios
    .post(`${localStorage.getItem("base_url")}api/npwrd/create`, data, {
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

const getNpwrd = async (reponse) => {
  const gets = await axios
    .get(`${localStorage.getItem("base_url")}api/npwrd/getDataNpwrd`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};

const getDataRetribusi = async (reponse) => {
  const gets = await axios
    .get(`${localStorage.getItem("base_url")}api/npwrd/retribusiNpwrd`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};

const getDataRetribusiById = async (id, reponse) => {
  const gets = await axios
    .get(
      `${localStorage.getItem(
        "base_url"
      )}api/npwrd/getDataPerusahaanById/${id}`,
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};

const getDataRiwayatRetribusiById = async (id, reponse) => {
  const gets = await axios
    .get(
      `${localStorage.getItem("base_url")}api/npwrd/getDataRetribusiById/${id}`,
      {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }
    )
    .catch((err) => {
      console.log(err.reponse);
    });
  if (gets != undefined && gets.status == 200) {
    reponse(gets.data);
  }
};

export {
  actionReq,
  getNpwrd,
  getDataRetribusi,
  getDataRetribusiById,
  getDataRiwayatRetribusiById,
};
