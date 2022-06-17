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
			<div className="pagePappers">
				<div className="container-gridCard">
					<div className="grid-card">
						{props.data.map((item, index) => {
							return (
								<div className="item">
									<div
										style={{
											width: "100%",
											height: "100%",
											background: "red",
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<div
											style={{
												width: "60%",
												padding: "10px",
												height: "100%",
											}}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													background: "#fff",
													width: "100%",
													height: "100%",
													borderRadius: "5px",
													flexDirection: "column",
												}}
											>
												<img
													src={
														localStorage.getItem("web_url") +
														"assets/img/logo/logo.png"
													}
													style={{ width: "10%" }}
													alt=""
												/>
												<h2
													style={{
														fontSize: ".9em",
														margin: 0,
														padding: 0,
														fontWeight: "bold",
													}}
												>
													PEMERINTAHAN KABUPATEN PELALAWAN
												</h2>
												<h2
													style={{
														fontSize: ".9em",
														margin: 0,
														padding: 0,
														fontWeight: "bold",
													}}
												>
													DINAS LINGKUNGAN HIDUP
												</h2>
												<div
													style={{
														background: "#111",
														width: "90%",
														height: "2px",
														marginTop: "5px",
														marginBottom: "5px",
													}}
												></div>
												<h2 style={{ fontSize: ".7em", margin: 0, padding: 0 }}>
													PERATURAN DAERAH KABUPATEN PELALAWAN
												</h2>
												<h2 style={{ fontSize: ".7em", margin: 0, padding: 0 }}>
													NO. 1 TAHUN 2019 PERUBAHAN ATAS
												</h2>
												<h2 style={{ fontSize: ".7em", margin: 0, padding: 0 }}>
													PERATURAN DAERAH KABUPATEN PELALAWAN NO. 1
												</h2>
												<h2 style={{ fontSize: ".7em", margin: 0, padding: 0 }}>
													TAHUN 2016
												</h2>
												<h2 style={{ fontSize: ".7em", margin: 0, padding: 0 }}>
													TENTANG RETRIBUSI DAERAH
												</h2>
											</div>
										</div>
										<div
											style={{
												width: "40%",
												padding: "10px",
												height: "100%",
											}}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													width: "100%",
													height: "100%",
													flexDirection: "column",
												}}
											>
												<h2
													style={{
														fontSize: ".7em",
														margin: 0,
														padding: 0,
														fontWeight: "bold",
														background: "#fff",
														paddingRight: "5px",
														paddingLeft: "5px",
														paddingTop: "3px",
														paddingBottom: "3px",
													}}
												>
													IURAN RETRIBUSI KEBERSIHAN
												</h2>
												<div
													style={{
														border: "2px solid #fff",
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
												<div
													style={{
														color: "#fff",
														display: "flex",
														flexDirection: "column",
														justifyContent: "center",
														alignItems: "center",
													}}
												>
													<h2
														style={{
															fontSize: ".7em",
															margin: 0,
															padding: 0,
															fontWeight: "bold",
														}}
													>
														SCAN DISINI
													</h2>
													<h4
														style={{
															fontSize: ".5em",
															margin: 0,
															padding: 0,
															fontWeight: "bold",
														}}
													>
														untuk melihat status pembayaran
													</h4>
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
