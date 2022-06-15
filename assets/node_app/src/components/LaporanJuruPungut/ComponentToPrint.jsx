import moment from "moment";
import React, { forwardRef, useRef, useEffect } from "react";
import "./printing.scss";
import { constan_data } from "../../utils/data";
export const ComponentToPrint = forwardRef((props, ref) => {
  moment.locale("id");
  return (
    <div ref={ref}>
      <style>
        {` @media print{
            @page {
              size: A4 landscape;
              margin: 0 !important;
            }
            html, body {
              width: 100%;
              margin-top: 1cm;
              margin-bottom: margin-top: 1cm;
              margin-left: margin-top: 1cm;
              margin-right: margin-top: 1cm;       
            }`}
      </style>
      <div className='pagePapper'>
        <div className='header'>
          <div className='logo'>
            <img
              src={localStorage.getItem("web_url") + "assets/img/logo/logo.png"}
              style={{ width: "100%", height: "100%" }}
              alt=''
            />
          </div>
          <div className='header-contain'>
            <div style={{ fontSize: "1.2em" }}>
              <strong>PEMERINTAHAN KABUPATEN PELALAWAN</strong>
            </div>
            <div style={{ fontSize: "1.5em" }}>
              <strong>DINAS LINGKUNGAN HIDUP</strong>
            </div>
            <div
              style={{
                fontSize: "1.2em",
                textAlign: "center",
              }}>
              <strong>
                KOMPLEKS PERKANTORAN BHAKTI PRAJA KABUPATEN PELALAWAN
              </strong>
            </div>
            <div style={{ fontSize: "1em" }}>PANGKALAN KERINCI, 28381</div>
          </div>
        </div>
        <div className='horizontal-line'></div>
        <div className='no-letter'>
          <h6>
            <strong>
              <u>Data Jurupungut</u>
            </strong>
          </h6>
        </div>
        <div className='content'>
          <span>{moment().format("Do MMMM YYYY, h:mm:ss a")}</span>
          <table
            border={1}
            style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>No</th>
                <th scope='col'>NIP</th>
                <th scope='col'>NAMA</th>
                <th scope='col'>JUMLAH WAJIB PAJAK</th>
                <th scope='col'>JUMLAH PENGUTIPAN</th>
                <th scope='col'>JUMLAH DIPUNGUT</th>
                <th scope='col'>JUMLAH BELUM DI PUNGUT</th>
                <th scope='col'>TOTAL RETRIBUSI</th>
                <th scope='col'>TOTAL TERTAGIH</th>
                <th scope='col'>TOTAL BELUM TERTAGIH</th>
              </tr>
            </thead>
            <tbody>
              {props.data !== undefined &&
                props.data.length > 0 &&
                props.data.map((item, index) => (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.nip}</td>
                    <td>{item.nama}</td>
                    <td>{item.usaha}</td>
                    <td>{item.jmlPengutipan}</td>
                    <td>{item.selesai}</td>
                    <td>{item.belum}</td>
                    <td>{item.total_harusnya}</td>
                    <td>{item.total}</td>
                    <td>{item.total_belum_tertagih}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div
            className='footer-signature'
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}>
            <div></div>
            <div className='sig'>
              Pangkalan kerinci , {moment().format("ll")} <br />
              KEPALA DINAS LINGKUNGAN HIDUP <br />
              KABUPATEN PELALAWAN
              <br />
              <br />
              <br />
              <br />
              <br />
              <u>{constan_data.kadis.nama}</u>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
