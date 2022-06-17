import moment from "moment";
import React, { forwardRef, useRef, useEffect } from "react";
import "./printingQr.scss";
import Qr from "../QrCode";
export const PrintQrCode = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <style>
        {` @media print{
            @page {
              width: 210mm;
              size: A4 landscape;
              margin: .5cm !important;
              padding: 0 !important;
            }
            html, body {
              width: 100%;
                
            }`}
      </style>
      <div className='pagePappers'>
        <div className='container-gridCard'>
          <div className='grid-card'>
            {props.data.map((item, index) => {
              return (
                <div className='item'>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                    }}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                      }}>
                      <img
                        src={
                          localStorage.getItem("web_url") +
                          "assets/img/qr/qr_template.jpg"
                        }
                        alt='qr'
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        height: "100%",
                        top: 0,
                        marginTop: "-155px",
                        paddingRight: "85px",
                        marginBottom: "-255px",
                      }}>
                      <Qr code={item.hidden} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
