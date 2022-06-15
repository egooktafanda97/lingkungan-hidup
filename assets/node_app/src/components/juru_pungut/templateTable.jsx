import moment from "moment";
import React, { forwardRef, useRef, useEffect } from "react";
import "./printing.scss";
export const ComponentToPrint = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
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
              <u>SURAT KETERANGAN RETRIBUSI</u>
            </strong>
          </h6>
        </div>
        <div className='content'>
          <table
            border={1}
            style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>No</th>
                <th scope='col'>Nama Anggota</th>
                <th scope='col'>Tgl pinjam</th>
                <th scope='col'>Target pengembalian</th>
                <th scope='col'>Tgl kembali</th>
                <th scope='col'>Jumlah Buku</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>ego oktafanda</td>
                <td>ego oktafanda</td>
                <td>ego oktafanda</td>
                <td>ego oktafanda</td>
                <td>ego oktafanda</td>
                <td>ego oktafanda</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
