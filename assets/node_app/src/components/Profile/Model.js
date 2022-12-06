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

export { actionReq };
