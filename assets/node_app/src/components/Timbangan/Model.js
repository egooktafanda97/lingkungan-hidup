import axios from "axios";

export const getTruck = async (response) => {
  const getter = await axios
    .get(localStorage.getItem("base_url") + "api/timbangan/truck", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      console.log(err.response);
    });
  if (getter != undefined && getter.status == 200) {
    response(getter.data);
  }
};

export const getSender = async (response) => {
  const getter = await axios
    .get(localStorage.getItem("base_url") + "api/timbangan/sender", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      console.log(err.response);
    });
  if (getter != undefined && getter.status == 200) {
    response(getter.data);
  }
};

export const getTimbangan = async (response) => {
  const getter = await axios
    .get(localStorage.getItem("base_url") + "api/timbangan/scales", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      console.log(err.response);
    });
  if (getter != undefined && getter.status == 200) {
    response(getter.data);
  }
};
