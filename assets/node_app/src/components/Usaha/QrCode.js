import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { UrlClientSite } from "../../utils/functionComponent";
export default function QrCode(props) {
  return (
    <span>
      <QRCodeSVG
        value={`${UrlClientSite}?key=${props.code}`}
        renderAs='canvas'
        style={{ width: "90px", height: "90px" }}
      />
    </span>
  );
}
