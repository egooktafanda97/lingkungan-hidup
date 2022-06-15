import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import swalReact from "@sweetalert/with-react";

const getLaporanTahunan = async (tahun, reponse) => {
  const gets = await axios
    .get(
      localStorage.getItem("base_url") +
        "api/retribusi/getLaporanTahunan/" +
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

export { getLaporanTahunan };
