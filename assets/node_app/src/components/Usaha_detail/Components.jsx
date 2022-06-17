import React, { useState, useEffect, useRef } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import {
	FaTimes,
	FaPen,
	FaTrash,
	FaEye,
	FaExpand,
	FaMinus,
	FaDollarSign,
	FaStoreAlt,
} from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import LoadingAnimate from "../../utils/loadingAnimate";
import { getRetribusiByIdUsaha } from "./Model";

import { Build, Colom } from "./setTable";
import moment from "moment";
import QrCode from "./QrCode";
import { LaporanUsaha } from "./LaporanUsaha";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import ReactToPrint, { useReactToPrint } from "react-to-print";
export default function Components() {
	const [data, setData] = React.useState({});
	const [loadData, setLoading] = useState(true);
	const [Page, setPage] = useState(null);
	const [pageAct, setPageAct] = useState(0);
	const [layoutCard, setLayoutCard] = useState(0);
	useEffect(() => {
		getUs((result) => {
			if (result.status == 200) {
				setData(result.data);
			}
		});
	}, []);

	const getUs = async (response) => {
		const gets = await axios
			.get(
				localStorage.getItem("base_url") +
					"api/usaha/getByIdUsaha/" +
					window.id_user,
				{
					headers: {
						Authorization: "bearer " + localStorage.getItem("token"),
					},
				}
			)
			.catch((err) => {
				response(err.response);
			});
		if (gets != undefined && gets.status == 200) {
			response(gets);
		}
	};
	return (
		<div>
			<div className="w-100 cards p-3">
				{loadData ? (
					<div className="continer">
						<div className="row">
							<div className={`${layoutCard == 0 ? "col-md-4" : "d-none"}`}>
								<div className="w-100 cards1 p-3">
									<div
										className="image-user w-100 d-flex"
										style={{
											justifyContent: "center",
											alignItems: "center",
											flexDirection: "column",
										}}
									>
										<img
											src={
												localStorage.getItem("base_url") +
												"public/img/usaha/default.png"
											}
											style={{
												width: 80,
												height: 80,
												borderRadius: "100%",
												border: "1px solid #ccc",
											}}
											alt=""
										/>
										<div
											style={{
												marginTop: "5px",
											}}
										>
											<strong>{data.nama != undefined && data.nama}</strong>
										</div>
									</div>
									<div
										style={{
											width: "100%",
											borderBottom: "2px solid #ccc",
											marginTop: "10px",
											marginBottom: "10px",
										}}
									></div>
									<div>
										<div className="list-detail">
											<strong>Nama Usaha</strong>
											<strong>
												{data.nama_usaha != undefined && data.nama_usaha}
											</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Pemilik Usaha</strong>
											<strong>
												{data.nama_pemilik != undefined && data.nama_pemilik}
											</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>No Telepon</strong>
											<strong>
												{data.no_telp != undefined && data.no_telp}
											</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Jenis Usaha</strong>
											<strong>
												{data.jenis_usaha != undefined && data.jenis_usaha}
											</strong>
										</div>

										<hr />
										<div className="list-detail">
											<strong>tipe Usaha</strong>
											<strong>
												{data.tipe_usaha != undefined &&
													data.tipe_usaha.tipe_usaha}
											</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Jumlah Tagihan / Bulan</strong>
											<strong>
												{data.tipe_usaha != undefined &&
													rupiah("" + data.tipe_usaha.jumlah_retribusi, "Rp")}
											</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>ALamat</strong>
											<strong>{data.alamat != undefined && data.alamat}</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Zona</strong>
											<strong>
												{data.zona != undefined && data.zona.nama_zona}
											</strong>
										</div>
									</div>
								</div>
							</div>
							<div className={`${layoutCard == 0 ? "col-md-8" : "col-12"}`}>
								<div className="w-100 cards1 p-3">
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<span>data</span>
										<span
											className="mimimaze-maximaze"
											onClick={() => {
												setLayoutCard(layoutCard == 0 ? 1 : 0);
											}}
										>
											{layoutCard == 0 ? (
												<FaExpand size={14} />
											) : (
												<FaMinus size={14} />
											)}
										</span>
									</div>
									<hr />
									<div className="container-menu-card">
										{/* <div
                      onClick={() => {
                        setPage(
                          <Data
                            saldo={data.saldo != undefined ? data.saldo : 0}
                            usaha={
                              data.usaha != undefined ? data.usaha.length : 0
                            }
                          />
                        );
                        setPageAct(0);
                      }}
                      className={`item-card-menu ${pageAct == 0 && "active"}`}>
                      Data Retribusi
                    </div> */}
										<div
											className={`item-card-menu ${pageAct == 1 && "active"}`}
											onClick={() => {
												setPage(<Retribusi />);
												setPageAct(1);
											}}
										>
											Retribusi
										</div>
										<div
											className={`item-card-menu ${pageAct == 6 && "active"}`}
											onClick={() => {
												setPage(
													<div>
														<img
															src={
																localStorage.getItem("web_url") +
																"assets/img/qr/qr_template.jpg"
															}
															style={{ width: "100%", height: "350px" }}
														/>
														<div
															style={{
																position: "absolute",
																zIndex: 999,
																top: 0,
																right: 0,
																bottom: 0,
																marginTop: "260px",
																marginRight: "130px",
															}}
														>
															<QrCode load={true} code={data.qrCode} />
														</div>
													</div>
												);
												setPageAct(6);
											}}
										>
											QR Code
										</div>
										<div
											className={`item-card-menu ${pageAct == 5 && "active"}`}
											onClick={() => {
												setPage(<InfoTable load={true} />);
												setPageAct(5);
											}}
										>
											Peta
										</div>
									</div>
									<hr />
									{/* components */}
									{Page == null ? <Retribusi /> : Page}
								</div>
							</div>
						</div>
					</div>
				) : (
					<div
						style={{
							width: "100%",
							height: "300px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="data-loading"></div>
					</div>
				)}
			</div>
		</div>
	);
}

// ===============================
// page 1
const Data = (props) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<div className="p-1 w-100">
				<div className="card cards card-sm-4">
					<div className="card-icon bg-primary">
						<FaDollarSign />
					</div>
					<div className="card-wrap">
						<div className="card-header">
							<h4>Saldo</h4>
						</div>
						<div className="card-body">
							{props.saldo != undefined && rupiah("" + props.saldo, "Rp")}
						</div>
					</div>
				</div>
			</div>
			<div className="p-1 w-100">
				<div className="card cards card-sm-4">
					<div className="card-icon bg-primary">
						<FaStoreAlt />
					</div>
					<div className="card-wrap">
						<div className="card-header">
							<h4>Total Usaha</h4>
						</div>
						<div className="card-body">
							{props.usaha != undefined && props.usaha}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// ===============================
// page 2
const Retribusi = () => {
	const [loadData, setLoadData] = useState(false);
	const [Footer, setFooter] = useState(null);
	const [data, setData] = useState([]);

	const componentRefUsaha = useRef();

	useEffect(() => {
		getRetribusiByIdUsaha(window.id_user, "", (res) => {
			if (res != undefined && res.status == 200) {
				BuildRiwayat(
					res.data,
					(res) => {
						setData(res);
						setLoadData(true);
					},
					(Foot) => {
						// setFooter(Foot);
					}
				);
			}
		});
	}, []);

	const Coloms = (data) => {
		const ItemSet = {
			selectFilter: ["bula"],
			Column: [
				{
					title: "No",
					style: {
						width: "5px",
					},
				},
				{
					title: "BULAN",
					style: {
						width: "300px",
					},
				},
				"TAHUN",
				"TANGGAL kUTIP",
				"TOTAL TERTAGIH",
				"JURU PUNGUT",
			],
			dataSet: data,
			pagination: {
				pageLimit: 10,
			},
		};

		return ItemSet;
	};

	const BuildRiwayat = (data, response, footer) => {
		console.log(data);
		const result = [];
		data.map((item, i) => {
			result.push({
				no: i + 1,
				bulan: moment(item.bulan).format("YYYY MMMM"),
				tahun: item.tahun,
				tanggal: item.retribusi ? item.retribusi.tanggal_kutip : "",
				total_tagijhan: item.retribusi
					? rupiah("" + item.retribusi.jumlah_tagihan, "Rp")
					: "",
				jurupungut: item.retribusi ? item.retribusi.user.nama : "",
			});
		});
		response(result);
	};

	const hndelSearch = (ev) => {
		setLoadData(false);
		getRetribusiByIdUsaha(window.id_user, ev.target.value, (res) => {
			if (res != undefined && res.status == 200) {
				BuildRiwayat(
					res.data,
					(res) => {
						setData(res);
						setLoadData(true);
					},
					(Foot) => {
						setFooter(Foot);
					}
				);
			}
		});
	};

	return (
		<div>
			<div
				className="w-100"
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<div className="searchs-container">
						<select
							data-type="relation"
							name="tahun"
							data-table="pengutipan"
							className="search-opt"
							onChange={hndelSearch}
						>
							{Array.from(Array(moment().format("YYYY") - 2019).keys()).map(
								(res) => {
									return (
										<option value={`${moment().format("YYYY") - res}`}>
											{moment().format("YYYY") - res}
										</option>
									);
								}
							)}
						</select>
					</div>
					<div>
						<ReactToPrint
							trigger={() => (
								<div className="btn btn-secondary btn-sm ml-2 mr-2">
									<span
										style={{
											display: "flex",
											justifyContent: "flex-start",
											alignItems: "center",
										}}
									>
										<IoPrintOutline size={15} style={{ marginRight: "10px" }} />
										<span style={{ fontSize: "15px", fontWeight: "bold" }}>
											Cetak
										</span>
									</span>
								</div>
							)}
							content={() => componentRefUsaha.current}
						/>
					</div>
				</div>
			</div>
			{loadData ? (
				<Table
					{...Coloms(data)}
					Footer={Footer != null ? Footer : null}
					// responseFilter={hndelResonseDataFilter}
				/>
			) : (
				<div
					style={{
						width: "100%",
						height: "300px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className="data-loading"></div>
				</div>
			)}
			<div style={{ display: "none" }}>
				<LaporanUsaha ref={componentRefUsaha} data={data} />
			</div>
		</div>
	);
};

// page 3
const Qr = (props) => {
	const [loadData, setLoadData] = useState(false);
	useEffect(() => {
		if (props.code != undefined && props.code != null) {
			setLoadData(true);
		}
	}, [props.code]);
	return (
		<div>
			{loadData ? (
				<div
					style={{
						width: "100%",
						height: "300px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<QrCode code={props.code} />
				</div>
			) : (
				<div
					style={{
						width: "100%",
						height: "300px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className="data-loading"></div>
				</div>
			)}
		</div>
	);
};
// component Laporan Retribusi
// ==============================
// const hndelResonseDataFilter = (res) => {
//   if (res != undefined) {
//     var tot = 0;
//     res.map((data) => {
//       tot += parseFloat(data.total_saldo);
//     });
//     const Foot = () => {
//       return (
//         <tr>
//           <th className={`dynatable_th`} colSpan='7'>
//             Total
//           </th>
//           <th className={`dynatable_th`}>{rupiah("" + tot, "Rp ")}</th>
//         </tr>
//       );
//     };
//     setFooter(<Foot />);
//   }
// };
