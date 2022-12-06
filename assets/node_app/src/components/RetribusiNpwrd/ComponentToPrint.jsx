import moment from "moment";
import React, { forwardRef, useRef, useEffect } from "react";
import { rupiah } from "../../utils/functionComponent";
import constan_data from "../../../../constant/data.json";
import angkaTerbilang from "@develoka/angka-terbilang-js";
export const ComponentToPrint = forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<div className="pagePapper">
				<div className="header">
					<div className="logo">
						<img
							src={localStorage.getItem("web_url") + "assets/img/logo/logo.png"}
							style={{ width: "80%", height: "100%" }}
							alt=""
						/>
					</div>
					<div className="header-contain">
						<div style={{ fontSize: "1.2em" }}>
							<strong>PEMERINTAH KABUPATEN PELALAWAN</strong>
						</div>
						<div style={{ fontSize: "1.5em" }}>
							<strong>DINAS LINGKUNGAN HIDUP</strong>
						</div>
						<div
							style={{
								fontSize: "1.2em",
								textAlign: "center",
							}}
						>
							<strong>
								KOMPLEKS PERKANTORAN BHAKTI PRAJA KABUPATEN PELALAWAN
							</strong>
						</div>
						<div style={{ fontSize: "1em" }}>PANGKALAN KERINCI, 28381</div>
					</div>
				</div>
				<div className="horizontal-line"></div>
				<div className="no-letter">
					<h6>
						<strong>
							<u>SURAT KETERANGAN RETRIBUSI</u>
						</strong>
					</h6>
				</div>
				<div className="content">
					Yang bertanda tangan dibawah ini :
					<div className="content-detail">
						<table style={{ width: "100%" }}>
							<tr>
								<td style={{ width: "40%" }}>Nama</td>
								<td style={{ width: "3%" }}>:</td>
								<td>{props.values?.nama_penyetor ?? "-"}</td>
							</tr>
							<tr>
								<td>NPWRD</td>
								<td>:</td>
								<td>{props.values?.join_npwrd?.npwrd ?? "-"}</td>
							</tr>
							<tr>
								<td>Bidang Usaha</td>
								<td>:</td>
								<td>{props.values?.join_npwrd?.nama ?? "-"}</td>
							</tr>
							<tr>
								<td>Alamat</td>
								<td>:</td>
								<td>{props.values?.join_npwrd?.alamat ?? "-"}</td>
							</tr>
						</table>
						Telah memenuhi kewajiban dalam membayar Retribusi Pelayanan
						Persampahan / Kebersihan untuk periode{" "}
						{moment(props.values?.periode_mulai).format("DD MMMM YYYY") ?? ""}{" "}
						s/d{" "}
						{moment(props.values?.periode_sampai).format("DD MMMM YYYY") ?? ""}{" "}
						dengan rincian sebagai berikut :
						<table
							style={{
								width: "100%",
								marginTop: "10px",
								marginBottom: "10px",
							}}
						>
							<tr>
								<td style={{ width: "3%" }}>1.</td>
								<td style={{ width: "40%" }}>
									Retribusi Pelayanan Persampahan / Kebersihan
								</td>
								<td style={{ width: "3%" }}>:</td>
								<td>{rupiah("" + props.values?.jumlah ?? 0, "Rp")}</td>
							</tr>
						</table>
						Demikian perihal surat Keterangan ini di buat hanya berlaku untuk 1
						kali.
						<div className="footer-signature">
							<div></div>
							<div className="sig">
								Pangkalan kerinci , {moment().format("DD MM YYYY")} <br />
								an. KEPALA DINAS LINGKUNGAN HIDUP <br />
								KABUPATEN PELALAWAN
								<br />
								BENDAHARA PENERIMA
								<br />
								<br />
								<br />
								<br />
								<div>
									<u>{constan_data?.bendahara?.nama ?? "-"}</u>
								</div>
								<div>{constan_data?.bendahara?.nip ?? "-"}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="pagePapper">
				<table className="table-container" border="1" style={{ width: "100%" }}>
					<tr>
						<td style={{ width: "70%", padding: "10px", textAlign: "center" }}>
							<div
								style={{
									fontSize: "12px",
									textAlign: "center",
								}}
							>
								<strong>PEMERINTAHAN KABUPATEN PELALAWAN</strong>
							</div>
							<div
								style={{
									fontSize: "12px",
									textAlign: "center",
								}}
							>
								<strong>DINAS LINGKUNGAN HIDUP</strong>
							</div>
							<div
								style={{
									fontSize: "12px",
									textAlign: "center",
								}}
							>
								<strong>
									KOMPLEKS PERKANTORAN BHAKTI PRAJA KABUPATEN PELALAWAN
								</strong>
							</div>
							<div style={{ fontSize: "12px" }}>PANGKALAN KERINCI, 28381</div>
						</td>
						<td
							style={{
								width: "15%",
								padding: "10px",
								textAlign: "center",
							}}
						>
							<div
								style={{
									fontSize: "12px",
									textAlign: "center",
								}}
							>
								Surat Setoran Retribusi Daerah <br />
								(SSRD) <br />
								Tahun: {props.values?.tahun ?? "-"} <br />
							</div>
						</td>
						<td
							style={{
								width: "15%",
								padding: "10px",
								textAlign: "center",
							}}
						>
							<div
								style={{
									fontSize: "12px",
									textAlign: "center",
								}}
							>
								No. URUT <br />
								{props.values?.join_npwrd?.no_urut ?? "-"}
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan="2" style={{ padding: "10px" }}>
							<div
								style={{
									fontSize: "12px",
									textAlign: "center",
								}}
							>
								<table style={{ width: "100%", textAlign: "left" }}>
									<tr>
										<td style={{ width: "40%" }}>Nama</td>
										<td style={{ width: "3%" }}>:</td>
										<td>{props.values?.join_npwrd?.nama ?? "-"}</td>
									</tr>
									<tr>
										<td>Npwrd</td>
										<td>:</td>
										<td>{props.values?.join_npwrd?.npwrd ?? "-"}</td>
									</tr>
									<tr>
										<td>Menyetor Bardasarkan</td>
										<td>:</td>
										<td>
											{props.values?.join_npwrd?.menyetoran_berdasarkan ?? "-"}
										</td>
									</tr>
									<tr>
										<td>Masa Retribusi</td>
										<td>:</td>
										<td>
											{moment(props.values?.masa_retribusi ?? "-").format(
												"MMMM YYYY"
											)}
										</td>
									</tr>
								</table>
							</div>
						</td>
						<td colSpan="2"></td>
					</tr>
				</table>
				<table className="table-container" border="1" style={{ width: "100%" }}>
					<thead>
						<tr>
							<th>No</th>
							<th>Kode Rekening</th>
							<th>Jenis Retribusi</th>
							<th>Jumlah (Rp)</th>
						</tr>
					</thead>
					<tbody>
						{JSON.parse(props?.values?.retribusi ?? "[]").map((item, index) => (
							<tr key={index}>
								<td style={{ width: "30px", paddingLeft: "5px" }}>
									{index + 1}
								</td>
								<td style={{ paddingLeft: "5px" }}>
									{item.kode_rekening ?? "-"}
								</td>
								<td style={{ paddingLeft: "5px" }}>
									{item.jenis_retribusi ?? "-"}
								</td>
								<td style={{ paddingLeft: "5px" }}>
									{rupiah("" + item.jumlah ?? 0, "Rp")}
								</td>
							</tr>
						))}
						<tr>
							<td colspan="3">Total Storan Retribusi</td>
							<td>
								{rupiah(
									"" +
										JSON.parse(props?.values?.retribusi ?? "[]").reduce(
											(accumulator, object) => {
												return (
													parseFloat(accumulator) + parseFloat(object.jumlah)
												);
											},
											0
										),
									"Rp"
								)}
							</td>
						</tr>
						<tr>
							<td colspan="2">Dengan Huruf :</td>
							<td colspan="2">
								{angkaTerbilang(
									JSON.parse(props?.values?.retribusi ?? "[]").reduce(
										(accumulator, object) => {
											return (
												parseFloat(accumulator) + parseFloat(object.jumlah)
											);
										},
										0
									)
								)}
							</td>
						</tr>
						<tr>
							<td colSpan={4}>
								<div>
									<table className="table" style={{ width: "100%" }}>
										<tbody>
											<tr>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
													}}
												>
													<p className="p-0 m-0">
														Kolom Untuk Teraan Kas Register <br />
														Kepala Bidang
													</p>
												</td>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
													}}
												>
													<p>
														Diterima Oleh <br />
														Bendahara Penerima
													</p>
												</td>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
													}}
												>
													<p>
														Pangkalan Kerinci Tanggal,
														<font data-get="tanggal">
															{moment().format("DD/MM/YYYY")}
														</font>
														<br />
														Penyetor
													</p>
												</td>
											</tr>
											<tr>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
														height: 30,
													}}
												></td>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
														height: 30,
													}}
												></td>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
														height: 30,
													}}
												></td>
											</tr>
											<tr>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
													}}
												>
													<u>{constan_data.kabit.nama ?? "-"}</u>
													<br />
													<font data-get="nip" style={{ fontSize: ".8em" }}>
														{constan_data.kabit.nip ?? "-"}
													</font>
												</td>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
													}}
												>
													<u>{constan_data.bendahara?.nama ?? "-"}</u>
													<br />
													<font data-get="nip" style={{ fontSize: ".8em" }}>
														{constan_data.bendahara?.nip ?? "-"}
													</font>
												</td>
												<td
													style={{
														border: "none",
														width: "33.3%",
														verticalAlign: "top",
													}}
												>
													{props.values?.nama_penyetor ?? "-"}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div style={{ width: "100%", padding: "10px" }}>
									<table style={{ width: "100%", textAlign: "left" }}>
										<tr>
											<td style={{ width: "30%" }}>Total</td>
											<td style={{ width: "3%" }}>:</td>
											<td>
												{rupiah(
													"" +
														JSON.parse(
															props?.values?.retribusi ?? "[]"
														)?.reduce((accumulator, object) => {
															return (
																parseFloat(accumulator) +
																parseFloat(object.jumlah)
															);
														}, 0) ?? 0,
													"Rp"
												)}
											</td>
										</tr>
										{/* <tr>
											<td>NO.SETOR</td>
											<td>:</td>
											<td></td>
										</tr> */}
										<tr>
											<td>TGL.SETOR</td>
											<td>:</td>
											<td>{moment().format("DD MMMM YYYY")}</td>
										</tr>
									</table>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
});
