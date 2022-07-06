import React, { useState, useEffect, useRef } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import { FaTimes, FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Creatable, { useCreatable } from "react-select/creatable";
import Table from "./../../utils/Table";
import { makeid, onDeleted, rupiah } from "../../utils/functionComponent";

import LoadingAnimate from "../../utils/loadingAnimate";
import { actionReq, getNpwrd, getDataRetribusi } from "./Model";

import { Build, Colom } from "./setTable";
import { Build1, Colom1 } from "./setTablePt";
import moment from "moment";

// -------------------------------------
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
// ------------------------------------
import Detail from "./Detail";

export default function Components() {
	const [data, setData] = useState([]);
	const [loadData, setLoadData] = useState(false);
	const [inputModal, setInputModal] = useState("hide-inp");

	const [createdNew, setCreatedNew] = useState(false);

	const [idTipe, setIdTipe] = useState(null);
	const [hasExtraValue, setHasExtraValue] = useState(false);
	const [optNpwrd, setOptNpwrd] = useState([]);
	const [optNpwrdVal, setOptNpwrdVal] = useState(null);
	const [__isNews__, set__IsNews__] = useState(false);
	// -------------------------------------------------
	const [idRetribusiUsaha, setIdRetribusiUsaha] = useState(null);
	const [Page, setPage] = useState(null);
	const [pageAct, setPageAct] = useState(0);
	const [action, setActions] = useState("create");
	const [session_id, setSessionId] = useState(makeid(30));
	const [objRetribusi, setObjRetribusi] = useState([]);
	// =================================================
	// ///////// pages ////////////////////////////////
	const [pages, setpages] = useState(0);
	// =================================================
	const Actions = {
		onCetak: (res) => {},
		onEdit: (res) => {
			getNpwrd((result) => {
				const OptNpwrd = [];
				result.map((mp, i) => {
					OptNpwrd.push({ value: mp.npwrd, label: mp.nama });
				});
				setOptNpwrd(OptNpwrd);
				setOptNpwrdVal(
					OptNpwrd.filter((opts1) => opts1.value === res.npwrd)[0]
				);
			});
			ModalInp();
			setCreatedNew(true);
			setActions("update");
			setIdRetribusiUsaha(res.id_retribusi);
			const Times = setTimeout(() => {
				$("[name='no_urut']").val(res?.join_npwrd?.no_urut ?? "");
				$("[name='nama']").val(res?.join_npwrd?.nama ?? "");
				$("[name='alamat']").val(res?.join_npwrd?.alamat ?? "");
				$("[name='menyetoran_berdasarkan']").val(
					res?.join_npwrd?.menyetoran_berdasarkan ?? ""
				);
				// $("[name='jumlah']").val(res.jumlah);
				$("[name='masa_retribusi']").val(res?.masa_retribusi ?? "");
				$("[name='nama_penyetor']").val(res?.nama_penyetor ?? "");
				// $("[name='kode_rekening']").val(res.kode_rekening);
				$("[name='tahun']").val(res?.tahun ?? "");
				// $("[name='jenis_retribusi']").val(res.jenis_retribusi);
				$("[name='bulan']").val(res?.bulan ?? "");
				$("[name='periode_mulai']").val(res?.periode_mulai ?? "");
				$("[name='periode_sampai']").val(res?.periode_sampai ?? "");
				// setObjRetribusi(res.retribusi);
				setObjRetribusi(JSON.parse(res?.retribusi ?? []));
				clearInterval(Times);
			}, 1000);
		},
		onDelete: (id) => {
			onDeleted(`npwrd/delete/${id}`, () => {
				UpOptNpwrd();
				setterData(() => {});
				reset();
			});
		},
	};
	// ================================
	const UpOptNpwrd = () => {
		getNpwrd((result) => {
			const OptNpwrd = [];
			result.map((mp, i) => {
				OptNpwrd.push({ value: mp.npwrd, label: mp.nama });
			});
			setOptNpwrd(OptNpwrd);
		});
	};
	const actions = (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.append("retribusi", JSON.stringify(objRetribusi));
		form_data.append("npwrd", optNpwrdVal.value);
		form_data.append("action", action);
		form_data.append("session_id", session_id);
		if (__isNews__) {
			form_data.append("isNew", __isNews__);
		}
		if (idRetribusiUsaha != null) {
			form_data.append("id_retribusiUsaha", idRetribusiUsaha);
		}
		actionReq(form_data, (res) => {
			setterData(() => {});
			ModalInpClose();
			reset();
		});
	};
	const hndelCreateOpt = (opt) => {
		setOptNpwrd({ ...optNpwrd, opt });
		setOptNpwrdVal(opt);
	};
	const setterData = (response) => {
		getDataRetribusi((result) => {
			Build(
				result,
				(rr) => {
					setData(rr);
					setLoadData(true);
				},
				Actions
			);
		});
	};

	useEffect(() => {
		UpOptNpwrd();
		setterData(() => {});
	}, []);
	// ===============================================
	$(".modal-costum-container").click(function () {
		$(this).removeClass("show-mod").addClass("hide-mod");
		setInputModal("hide-inp");
	});
	const ModalInpClose = () => {
		$(".modal-costum-container").removeClass("show-mod").addClass("hide-mod");
		setInputModal("hide-inp");
	};
	const ModalInp = () => {
		$(".modal-costum-container").addClass("show-mod").removeClass("hide-mod");
		setInputModal("show-inp");
		$("[name='nama_zona']").focus();
	};
	function reset() {
		setActions("create");
		set__IsNews__(false);
		UpOptNpwrd();
		setOptNpwrdVal(null);
		setIdRetribusiUsaha(null);
		$("[name='no_urut']").val("");
		$("[name='nama']").val("");
		$("[name='alamat']").val("");
		$("[name='menyetoran_berdasarkan']").val("");
		$("[name='masa_retribusi']").val("");
		$("#kode_rekening").val("");
		$("#keterangan").val("");
		$("[name='tahun']").val(moment().format("YYYY"));
		$("#jenis_retribusi").val("");
		$("#jumlah").val("");
		$("[name='bulan']").val("");
		$("[name='periode_mulai']").val("");
		$("[name='periode_sampai']").val("");
		setObjRetribusi([]);
	}

	const TableRetribusi = () => {
		return loadData ? (
			<div>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
						marginBottom: "10px",
					}}
				>
					<button
						className="btn btn-primary btn-sm"
						onClick={() => {
							ModalInp();
							reset();
							setCreatedNew(false);
							setActions("create");
							setIdRetribusiUsaha(null);
							setSessionId(makeid(30));
						}}
					>
						Buat Pengutipan
					</button>
				</div>
				<Table {...Colom(data)} />
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
		);
	};
	const pageDetail = (itm) => {
		setpages(
			<Detail
				value={itm}
				hndelback={() => {
					setpages(0);
				}}
			/>
		);
	};
	const ComponentRetribusi = () => {
		return (
			<div>
				<div className="w-100 cards p-3">
					<div className="flex-betwen mb-4">
						<div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
							Retribusi Prusahaan
						</div>
					</div>
					<div className="w-100 cards1 p-3">
						<div className="container-menu-card">
							<div
								className={`item-card-menu ${pageAct == 0 && "active"}`}
								onClick={() => {
									setPage(null);
									setPageAct(0);
								}}
							>
								Retribusi
							</div>
							<div
								className={`item-card-menu ${pageAct == 1 && "active"}`}
								onClick={() => {
									setPage(<DataPerusahaan hndelPageDetail={pageDetail} />);
									setPageAct(1);
								}}
							>
								Data Perushaan
							</div>
						</div>
						<hr />
						{/* components */}
						{Page == null ? TableRetribusi() : Page}
						{/* <Riwayat /> */}
					</div>
				</div>
				<div
					className={`form-container ${inputModal}`}
					style={{ overflowY: "auto" }}
				>
					<div className="w-100 p-5">
						<div className="flex-betwen">
							<h6>Retribusi Perusahaan</h6>
							<button
								className="btn-circle button-close"
								onClick={ModalInpClose}
							>
								<FaTimes />
							</button>
						</div>
						<hr />
						<form onSubmit={actions}>
							<div className="row">
								{/* =============== input prusahaan ==================== */}
								<div className="col-lg-12">
									<div className="form-group">
										<label className="label" htmlFor="">
											NPWRD
										</label>
										<Creatable
											isClearable={true}
											options={optNpwrd}
											value={optNpwrdVal}
											onChange={(opt) => {
												if (opt?.__isNew__ ?? "" === true) {
													hndelCreateOpt(opt);
													setCreatedNew(true);
													set__IsNews__(true);
												} else if (opt == null) {
													getNpwrd((result) => {
														hndelCreateOpt(opt);
														setCreatedNew(false);
														set__IsNews__(false);
														const OptNpwrd = [];
														result.map((mp, i) => {
															OptNpwrd.push({
																value: mp.npwrd,
																label: mp.nama,
															});
														});
														setOptNpwrd(OptNpwrd);
													});
												} else {
													hndelCreateOpt(opt);
													setCreatedNew(false);
													set__IsNews__(false);
												}
											}}
										/>
									</div>
								</div>
							</div>
							{createdNew && (
								<div className="cards p-3">
									<div className="flex-betwen">
										<h6>TIPE USAHA</h6>
										<button
											type="button"
											className="btn-circle button-close"
											onClick={() => {
												set__IsNews__(false);
												UpOptNpwrd();
												setOptNpwrdVal(null);
												setCreatedNew(false);
											}}
										>
											<FaTimes />
										</button>
									</div>
									<hr />
									<div className="row">
										<div className="col-lg-6">
											<div className="form-group">
												<label className="label" htmlFor="">
													NO URUT
												</label>
												<input
													name="no_urut"
													type="text"
													className="form-control form-control-sm"
													placeholder="no urut"
													required
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="label" htmlFor="">
													NAMA PT
												</label>
												<input
													name="nama"
													type="text"
													className="form-control form-control-sm"
													placeholder="nama perusahaan"
													required
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="label" htmlFor="">
													ALAMAT
												</label>
												<textarea
													name="alamat"
													className="form-control form-control-sm"
													required
													placeholder="alamat usaha"
												></textarea>
											</div>
										</div>
									</div>
								</div>
							)}
							<div className="row">
								<div className="col-lg-12">
									<hr />
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label className="label" htmlFor="">
											NAMA PENYETOR
										</label>
										<input
											name="nama_penyetor"
											type="text"
											className="form-control form-control-sm"
											placeholder="nama penyetor"
											required
										/>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label className="label" htmlFor="">
											MENYETOR BERDASARKAN
										</label>

										<input
											type="text"
											name="menyetoran_berdasarkan"
											className="form-control form-control-sm"
											value={`SKDR`}
											required
										/>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label className="label" htmlFor="">
											TAHUN
										</label>
										<select
											style={{ padding: "5px" }}
											name="tahun"
											className="form-control form-control-sm"
											required
										>
											{Array.from(
												Array(moment().format("YYYY") - 2019).keys()
											).map((res) => {
												return (
													<option value={`${moment().format("YYYY") - res}`}>
														{moment().format("YYYY") - res}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group" style={{ width: "100%" }}>
										<label className="label" htmlFor="">
											BULAN
										</label>
										<input
											name="bulan"
											type="month"
											className="form-control form-control-sm"
											required
										/>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group">
										<label className="label" htmlFor="">
											MASA RETRIBUSI
										</label>
										<input
											name="masa_retribusi"
											type="month"
											className="form-control form-control-sm"
											required
										/>
									</div>
								</div>
								<div className="col-lg-12 text-center">
									<strong>PERIODE</strong>
								</div>
								<div className="col-lg-6">
									<div className="form-group" style={{ width: "100%" }}>
										<label className="label" htmlFor="">
											MULAI
										</label>
										<input
											name="periode_mulai"
											type="date"
											className="form-control form-control-sm"
											required
										/>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group" style={{ width: "100%" }}>
										<label className="label" htmlFor="">
											SAMPAI DENGAN
										</label>
										<input
											name="periode_sampai"
											type="date"
											className="form-control form-control-sm"
											required
										/>
									</div>
								</div>
								<div className="cards p-3">
									<div className="flex-betwen">
										<h6>RETRIBUSI</h6>
										<button
											type="button"
											className="btn-circle button-close"
											onClick={() => {
												set__IsNews__(false);
												UpOptNpwrd();
												setOptNpwrdVal(null);
												setCreatedNew(false);
											}}
										>
											<FaTimes />
										</button>
									</div>
									<hr />
									<div className="row">
										<div className="col-lg-6">
											<div className="form-group">
												<label className="label" htmlFor="">
													KODE REKENING
												</label>
												<input
													id="kode_rekening"
													type="text"
													className="form-control form-control-sm"
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="label" htmlFor="">
													JENIS RETRIBUSI
												</label>
												<input
													id="jenis_retribusi"
													type="text"
													className="form-control form-control-sm"
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="label" htmlFor="">
													jUMLAH RETRIBUSI
												</label>
												<input
													id="jumlah"
													type="number"
													className="form-control form-control-sm"
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="label" htmlFor="">
													KETERANGAN RETRIBUSI
												</label>
												<input
													id="keterangan"
													type="text"
													className="form-control form-control-sm"
												/>
											</div>
										</div>
										<div className="col-lg-12">
											{/* btn add */}
											<div className="form-group text-right">
												<button
													type="button"
													className="btn btn-sm btn-primary"
													onClick={() => {
														// setObjRetribusi
														setObjRetribusi([
															...objRetribusi,
															{
																kode_rekening: $("#kode_rekening").val(),
																jenis_retribusi: $("#jenis_retribusi").val(),
																jumlah: $("#jumlah").val(),
																keterangan: $("#keterangan").val(),
															},
														]);
													}}
												>
													<FaPlus />
												</button>
											</div>
										</div>
										<hr />
										<div style={{ padding: "10px", width: "100%" }}>
											<table
												id="example"
												className="table table-striped table-bordered"
												cellSpacing={0}
												width="100%"
											>
												<thead>
													<th className="p-2 m-0 dynatable_th">
														Kode Rekening
													</th>
													<th className="p-2 m-0 dynatable_th">Keterangan</th>
													<th className="p-2 m-0 dynatable_th">
														Jenis Retribusi
													</th>
													<th className="p-2 m-0 dynatable_th">
														Jumlah Retribusi
													</th>
													<th className="p-2 m-0 dynatable_th">Aksi</th>
												</thead>
												<tbody>
													{objRetribusi.map((item, index) => (
														<tr key={index}>
															<td className="td-styles">
																{item.kode_rekening}
															</td>
															<td className="td-styles">{item.keterangan}</td>
															<td className="td-styles">
																{item.jenis_retribusi}
															</td>
															<td className="td-styles">{item.jumlah}</td>
															<td className="td-styles">
																<button
																	className="btn btn-danger btn-sm"
																	type="button"
																	onClick={() => {
																		// setObjRetribusi
																		setObjRetribusi(
																			objRetribusi.filter((item2, index2) => {
																				return index !== index2;
																			})
																		);
																	}}
																>
																	<FaTrash />
																</button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<hr />
									<div
										className="form-group"
										style={{ display: "flex", justifyContent: "flex-end" }}
									>
										{/* <button
                    onClick={() => {
                      ModalInpClose();
                      reset();
                    }}
                    type='button'
                    className='btn btn-secondary mr-3 btn-sm'>
                    Batal
                  </button> */}
										<button
											type="submit"
											className="btn btn-primary action-btn btn-sm btn-form-submit"
										>
											Simpan
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	};
	return pages == 0 ? ComponentRetribusi() : pages;
}

const DataPerusahaan = (props) => {
	const [data, setData] = useState([]);
	const [loadData, setLoadData] = useState(false);

	const Actions = {
		onLihat: (data) => {
			props.hndelPageDetail(data);
		},
	};

	useEffect(() => {
		setterDataPt();
	}, []);
	const setterDataPt = (response) => {
		getNpwrd((result) => {
			Build1(
				result,
				(rr) => {
					setData(rr);
					setLoadData(true);
				},
				Actions
			);
		});
	};
	return loadData ? (
		<Table
			{...Colom1(data)}
			responseFilter={(res) => {
				console.log(res);
			}}
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
	);
};
