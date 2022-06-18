import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { UrlClientSite } from "../../utils/functionComponent";
export default function QrCode(props) {
	return (
		<span>
			<QRCodeSVG
				value={`${UrlClientSite}?key=${props.code}`}
				renderAs="canvas"
				style={{ width: "80px", height: "80px", padding: 0, margin: 0 }}
			/>
		</span>
	);
}
