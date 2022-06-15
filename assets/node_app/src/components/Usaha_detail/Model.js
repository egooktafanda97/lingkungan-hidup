import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import swalReact from "@sweetalert/with-react";

const getRetribusiByIdUsaha = async (id_user, tahun, reponse) => {
  const gets = await axios
    .get(
      localStorage.getItem("base_url") +
        "api/retribusi/getRetribusiByIdUsaha/" +
        id_user +
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

export { getRetribusiByIdUsaha };
