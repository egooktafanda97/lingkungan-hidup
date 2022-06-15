import moment from "moment";
import React, { forwardRef, useRef, useEffect } from "react";
import { constan_data } from "../../utils/data";
import "./printing.scss";
export const LaporanUsaha = forwardRef((props, ref) => {
  moment.locale("id");
  return (
    <div ref={ref}>
      <style>
        {`@media print{
            @page {
              size: A4 portrait;
              margin: 0 !important;
              padding: 0 !important;
            }
            html, body {
              margin-top: .5cm;
              margin-bottom: .5cm;
              margin-left: .5cm;
              margin-right: .5cm;       
            }`}
      </style>
      <div className='pagePapper'>
        <div className='header'>
          <div className='logo'>
            <img
              src={localStorage.getItem("web_url") + "assets/img/logo/logo.png"}
              style={{ width: "90%", height: "100%" }}
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
            <div className='text-center' style={{ fontSize: ".8em" }}>
              KARTU PEMBAYARAN IURAN RETRIBUSI KEBERSIHAN
            </div>
            <div className='text-center' style={{ fontSize: ".8em" }}>
              PERATURAN DAERAH KABUPATEN PELALAWAN NO.1 TAHUN 2019 TENTANG
              PERUBAHAN ATAS
            </div>
            <div className='text-center' style={{ fontSize: ".8em" }}>
              PERATURAN DAERAH KABUPATEN PELALAWAN NO.1 TAHUN 2016 TENTANG
              RETRIBUSI DAERAH
            </div>
          </h6>
        </div>
        <div style={{ width: "100%" }}>
          <table>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div className='content'>
          <span>{moment().format("Do MMMM YYYY, h:mm:ss a")}</span>
          <table
            border={1}
            style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>No</th>
                <th scope='col'>BULAN</th>
                <th scope='col'>TAHUN</th>
                <th scope='col'>TANGGAL kUTIP</th>
                <th scope='col'>TOTAL TERTAGIH</th>
                <th scope='col'>JURU PUNGUT</th>
              </tr>
            </thead>
            <tbody>
              {props.data !== undefined &&
                props.data.length > 0 &&
                props.data.map((item, index) => (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.bulan}</td>
                    <td>{item.tahun}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.total_tagijhan}</td>
                    <td>{item.jurupungut}</td>
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
            <div>
              <br />
              DIKETAHUI <br />
              KEPALA DINAS LINGKUNGAN HIDUP
              <br />
              <br />
              <br />
              <br />
              <br />
              <u>{constan_data.kadis.nama}</u>
              <br />
              <span>{constan_data.kadis.nip}</span>
            </div>
            <div className='sig'>
              Pangkalan kerinci , {moment().format("ll")} <br />
              KEPALA BIDANG PENGELOLAAN SAMPAH <br />
              B3 DAN LIMBAH B3
              <br />
              <br />
              <br />
              <br />
              <br />
              <u>{constan_data.kadis.nama}</u>
              <br />
              <span>{constan_data.kadis.nip}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
