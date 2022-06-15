import moment from "moment";
import React, { forwardRef, useRef, useEffect } from "react";
import { constan_data } from "../../utils/data";
import { rupiah } from "../../utils/functionComponent";
import "./printing.scss";
export const Laporan = forwardRef((props, ref) => {
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
          <div className='logo'></div>
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
              <u>Laporan Data Usaha</u>
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
                <th scope='col'>KODE</th>
                <th scope='col'>NAMA JURUPUNGUT</th>
                <th scope='col'>NAMA PEMILIK</th>
                <th scope='col'>NAMA USAHA</th>
                <th scope='col'>ALAMAT</th>
                <th scope='col'>JENIS USAHA</th>
                <th scope='col'>TIPE USAHA</th>
                <th scope='col'>JUMLAH TAGIHAN</th>
                <th scope='col'>JAN</th>
                <th scope='col'>FEB</th>
                <th scope='col'>MAR</th>
                <th scope='col'>APR</th>
                <th scope='col'>MEI</th>
                <th scope='col'>JUN</th>
                <th scope='col'>JUL</th>
                <th scope='col'>AGU</th>
                <th scope='col'>SEP</th>
                <th scope='col'>OKT</th>
                <th scope='col'>NOV</th>
                <th scope='col'>DES</th>
                <th scope='col'>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {props.data !== undefined &&
                props.data.length > 0 &&
                props.data.map((item, index) => (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.kode}</td>
                    <td>{item.jurupungut}</td>
                    <td>{item.nama_pemilik}</td>
                    <td>{item.nama_usaha}</td>
                    <td>{item.alamat}</td>
                    <td>{item.nama_usaha}</td>
                    <td>{item.tipe_usaha}</td>
                    <td>{item.jumlah_retribusi}</td>
                    <td>{item.JAN}</td>
                    <td>{item.FEB}</td>
                    <td>{item.MAR}</td>
                    <td>{item.APR}</td>
                    <td>{item.MEI}</td>
                    <td>{item.JUN}</td>
                    <td>{item.JUL}</td>
                    <td>{item.AGU}</td>
                    <td>{item.SEP}</td>
                    <td>{item.OKT}</td>
                    <td>{item.NOV}</td>
                    <td>{item.DES}</td>
                    <td>{item.TOTAL}</td>
                  </tr>
                ))}
              <tr>
                <th colSpan='9'>Total</th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.JAN?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.FEB?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.MAR?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.APR?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.MEI?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.JUN?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.JUL?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.AGU?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.SEP?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.OKT?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.NOV?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item.DES?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )}
                </th>
                <th>
                  {/* {props.data !== undefined &&
                    props.data.length > 0 &&
                    rupiah(
                      "" +
                        props.data.reduce((acc, item) => {
                          var itm = item?.TOTAL?.replace(/\D/g, "") ?? 0;
                          return (
                            parseFloat(acc) + parseFloat(itm == "" ? 0 : itm)
                          );
                        }, 0),
                      "Rp "
                    )} */}
                </th>
              </tr>
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
