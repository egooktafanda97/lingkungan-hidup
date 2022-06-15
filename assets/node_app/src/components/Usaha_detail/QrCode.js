import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { UrlClientSite } from "../../utils/functionComponent";
export default function QrCode(props) {
  return (
    <div>
      <QRCodeSVG
        value={`${UrlClientSite}?key=${props.code}`}
        renderAs='canvas'
      />
    </div>
  );
}
