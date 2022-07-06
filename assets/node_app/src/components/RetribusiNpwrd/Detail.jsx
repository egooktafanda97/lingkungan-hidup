import React, { useState, useEffect } from "react";
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
	FaArrowLeft,
} from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import LoadingAnimate from "../../utils/loadingAnimate";

import moment from "moment";
import { getDataRetribusiById, getDataRiwayatRetribusiById } from "./Model";
import { Build, Colom } from "./setTableRiwayat";

export default function Components(props) {
	const [dataTable, setDataTable] = useState([]);
	const [data, setData] = React.useState({});
	const [loadData, setLoading] = useState(true);
	const [Page, setPage] = useState(null);
	const [pageAct, setPageAct] = useState(0);
	const [layoutCard, setLayoutCard] = useState(0);
	const [loadTable, setLoadTable] = useState(true);
	useEffect(() => {
		if (props.value.id_npwrd) {
			console.log(props);
			setterData(props.value.id_npwrd);
			setterDataRiwayat(props.value.npwrd);
		}
	}, [props.value.id_npwrd]);
	useEffect(() => {
		console.log(">>", props);
	}, []);
	const setterData = (id) => {
		getDataRetribusiById(id, (result) => {
			setData(result);
		});
	};
	const setterDataRiwayat = (id) => {
		getDataRiwayatRetribusiById(id, (result) => {
			Build(result, (res) => {
				setDataTable(res);
				setLoadTable(false);
			});
		});
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
												"public/img/users/default.png"
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
											<strong>{data?.nama ?? ""}</strong>
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
											<strong>No. Urut</strong>
											<strong>{data?.no_urut ?? ""}</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>NPWRD</strong>
											<strong>{data?.npwrd ?? ""}</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Nama</strong>
											<strong>{data?.nama ?? ""}</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Alamat</strong>
											<strong>{data?.alamat ?? ""}</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Menyetor Berdasarkan</strong>
											<strong>{data?.menyetoran_berdasarkan ?? ""}</strong>
										</div>
										<hr />
										<div className="list-detail">
											<strong>Masa Retribusi</strong>
											<strong>{data?.masa_retribusi ?? ""}</strong>
										</div>
										<hr />
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
										<span>
											<a
												onClick={props.hndelback}
												style={{
													cursor: "pointer",
													display: "flex",
													alignItems: "center",
												}}
											>
												<FaArrowLeft size={14} /> kembali
											</a>
										</span>
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
										<div
											className={`item-card-menu ${pageAct == 0 && "active"}`}
										>
											Riwayat Reteribusi
										</div>
									</div>
									<hr />
									{/* components */}
									{loadTable ? (
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
									) : (
										<Table {...Colom(dataTable)} />
									)}
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

// component Laporan Retribusi
