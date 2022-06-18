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
              size: A4 portrait;
              margin: .5cm !important;
              padding: 0 !important;
            }
            html, body {
              width: 100%;
                
            }`}
			</style>
			<div className="pagePappers">
				<div className="container-gridCard">
					<div className="grid-card">
						{props.data.map((item, index) => {
							return (
								<div className="item">
									<div
										style={{
											padding: 15,
											background: "red",
											width: "100%",
											height: "100%",
										}}
									>
										<div
											style={{
												padding: 15,
												borderRadius: 10,
												width: "100%",
												height: "100%",
												background: "#fff",
											}}
										>
											<div style={{ display: "flex", alignItems: "center" }}>
												<img
													style={{ width: "25px", height: "33px" }}
													src={
														localStorage.getItem("web_url") +
														"assets/img/logo/logo.png"
													}
													alt=""
												/>
												<div style={{ marginLeft: "10px" }}>
													<div style={{ fontSize: ".4em" }}>
														<strong
															style={{ fontFamily: "'Poppins', sans-serif" }}
														>
															PEMERINTAH KABUPATEN PELALAWAN
														</strong>
													</div>
													<div style={{ fontSize: ".4em" }}>
														<strong
															style={{ fontFamily: "'Poppins', sans-serif" }}
														>
															DINAS LINGKUNGAN HIDUP
														</strong>
													</div>
													<div style={{ fontSize: ".4em" }}>
														<strong
															style={{ fontFamily: "'Poppins', sans-serif" }}
														>
															BIDANG PENGELOLAAN SAMPAH B3 DAN LIMBAH B3
														</strong>
													</div>
												</div>
											</div>

											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													alignContent: "center",
													flexDirection: "column",
													marginTop: "5px",
												}}
											>
												<h2
													style={{
														fontSize: ".8em",
														margin: 0,
														padding: 0,
														fontWeight: "bold",
														color: "#000",
														paddingRight: "5px",
														paddingLeft: "5px",
														paddingTop: "3px",
														paddingBottom: "3px",
														fontFamily: " 'Montserrat', sans-serif",
													}}
												>
													Kartu Pembayaran
												</h2>
												<h2
													style={{
														fontSize: ".7em",
														margin: 0,
														padding: 0,
														fontWeight: "bold",
														background: "red",
														color: "#fff",
														paddingRight: "5px",
														paddingLeft: "5px",
														paddingTop: "3px",
														paddingBottom: "3px",
														fontFamily: " 'Montserrat', sans-serif",
													}}
												>
													RETRIBUSI SAMPAH
												</h2>
												<div
													style={{
														width: "50%",
														fontSize: ".6em",
														marginTop: "5px",
														marginBottom: "5px",
														paddingLeft: "20px",
													}}
												>
													<div
														style={{ display: "flex", alignItems: "center" }}
													>
														<div
															style={{
																width: "30px",
																fontSize: ".6em",
																margin: 0,
																padding: 0,
															}}
														>
															KODE
														</div>
														<div
															style={{
																fontSize: ".6em",
																margin: 0,
																padding: 0,
															}}
														>
															: {item?.kode ?? "-"}
														</div>
													</div>
													<div
														style={{ display: "flex", alignItems: "center" }}
													>
														<div
															style={{
																width: "30px",
																fontSize: ".6em",
																margin: 0,
																padding: 0,
															}}
														>
															NAMA
														</div>
														<div
															style={{
																fontSize: ".6em",
																margin: 0,
																padding: 0,
															}}
														>
															: {item?.nama_usaha ?? "-"}
														</div>
													</div>
													<div
														style={{ display: "flex", alignItems: "center" }}
													>
														<div
															style={{
																width: "30px",
																fontSize: ".6em",
																margin: 0,
																padding: 0,
															}}
														>
															OBJEK
														</div>
														<div
															style={{
																fontSize: ".6em",
																margin: 0,
																padding: 0,
															}}
														>
															: {item?.jenis_usaha ?? "-"}
														</div>
													</div>
												</div>
												<div
													style={{
														border: "2px solid #111",
														padding: "3px",
														borderRadius: "5px",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														paddingTop: "10px",
														paddingLeft: "10px",
														paddingRight: "10px",
														background: "#fff",
														marginTop: "5px",
														marginBottom: "5px",
													}}
												>
													<div>
														<Qr code={item.hidden} />
													</div>
												</div>
												<h2
													style={{
														fontSize: ".7em",
														margin: 0,
														padding: 0,
														fontWeight: "bold",
														color: "#000",
														paddingRight: "5px",
														paddingLeft: "5px",
														paddingTop: "3px",
														paddingBottom: "3px",
														fontFamily: " 'Montserrat', sans-serif",
													}}
												>
													<strong>SCAN DISINI</strong> untuk melihat status
												</h2>
												<div>
													<div
														style={{
															textAlign: "center",
															fontSize: ".5em",
															fontFamily: "'Poppins', sans-serif",
															fontWeight: "bold",
														}}
													>
														PERATURAN DAERAH KABUPATEN PELALAWAN NO. 1 TAHUN
														2019
													</div>
													<div
														style={{
															textAlign: "center",
															fontSize: ".5em",
															fontFamily: "'Poppins', sans-serif",
															fontWeight: "bold",
														}}
													>
														PERUBAHAN ATAS PERATURAN DAERAH
													</div>

													<div
														style={{
															textAlign: "center",
															fontSize: ".5em",
															fontFamily: "'Poppins', sans-serif",
															fontWeight: "bold",
														}}
													>
														KABUPATEN PELALAWAN NO. 1 TAHUN 2016 TENTANG
														RETRIBUSI DAERAH
													</div>
												</div>
											</div>
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
{
	/* <Qr code={item.hidden} /> */
}
