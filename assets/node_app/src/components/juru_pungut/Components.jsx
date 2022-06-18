import React, { useState, useEffect, useRef } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";

import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import { useLayer, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaTimes,
	FaPen,
	FaTrash,
	FaEye,
	FaRegTrashAlt,
	FaDollarSign,
} from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";

export default function Components(props) {
	const [data, setData] = React.useState([]);
	const [dataset, setDataSet] = useState([]);
	const [inputModal, setInputModal] = useState("hide-inp");
	const [idJuru, setIdJuru] = useState(null);
	const [idJuruUpSaldo, setIdJuruUpSaldo] = useState(null);
	const [dataPrinting, setDataPrinting] = useState([]);
	// //////////////// request axios ///////////////////////
	const componentRef = useRef();

	const actionReq = async (data, reponse) => {
		const post = await axios
			.post(localStorage.getItem("base_url") + "api/auth/register", data)
			.catch((err) => {
				$(".btn-form-submit").removeClass("loading");
				console.log(err.reponse);
				toastr.error("data gagal di simpan");
			});
		if (post != undefined && post.status == 200) {
			swal({
				title: "Sukses",
				text: "",
				icon: "success",
				button: "Oke",
			});
			reponse(post.data);
		}
	};
	function hndelEdit(data) {
		$("[name='nip']").val(data.nip);
		$("[name='username']").val(data.username);
		$("[name='nama']").val(data.nama);
		$("[name='alamat']").val(data.alamat);
		$("[name='no_telp']").val(data.no_telp);
		ModalInp();
		setIdJuru(data.id);
	}
	const UserGet = async (reponse) => {
		const gets = await axios
			.get(localStorage.getItem("base_url") + "api/auth/user-get")
			.catch((err) => {
				console.log(err.reponse);
			});
		if (gets != undefined && gets.status == 200) {
			reponse(gets.data);
		}
	};

	// //////////////////////////////////////////////////////

	useEffect(() => {
		setterData();
	}, []);
	const setterData = () => {
		UserGet((res) => {
			const result = [];
			res.map((item, i) => {
				result.push({
					No: <strong>{i + 1}</strong>,
					foto: () => (
						<img
							onClick={() =>
								viewImg(
									localStorage.getItem("base_url") +
										"public/img/users/" +
										item.foto
								)
							}
							className="img-circle"
							style={{ width: "40px", height: "40px" }}
							src={
								localStorage.getItem("base_url") +
								"public/img/users/" +
								item.foto
							}
							alt=""
						/>
					),
					nip: item.nip,
					nama: item.nama,
					alamat: item.alamat,
					no_telp: item.no_telp,
					username: item.username,
					saldo: item.saldo != undefined && rupiah("" + item.saldo, "Rp "),
					action: (
						<div className="d-flex">
							<DropdownMenu
								onClickEdit={() => {
									hndelEdit(item);
								}}
								onClickDelete={() => {
									hndelDelete(item.id);
								}}
								onClickLihat={() => {
									window.location.href =
										localStorage.getItem("web_url") +
										"Jurupungut/detail/" +
										item.id;
								}}
								onStorSaldo={() => {
									hndelStoreSaldo(item);
								}}
							/>
						</div>
					),
				});
			});
			setData(result);
			setDataSet(result);
			setDataPrinting(result);
		});
	};
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
		$("[name='nip']").focus();
	};

	const action = (e) => {
		$(".btn-form-submit").addClass("loading");
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.append("role", "JURUPUNGUT");
		if (idJuru != null) {
			form_data.append("username", $("[name='username']").val());
			form_data.append("password", $("[name='password']").val());
			form_data.append("id", idJuru);
		} else {
			form_data.append("username", $("[name='nip']").val());
			form_data.append("password", $("[name='nip']").val());
		}
		actionReq(form_data, (res) => {
			$(".btn-form-submit").removeClass("loading");
			setterData();
			ModalInpClose();
			reset();
		});
	};

	const viewImg = (url) => {
		swalReact(
			<div>
				<img src={url} style={{ width: "100%", height: "auto" }} alt="" />
			</div>,
			{
				buttons: false,
			}
		);
	};

	const ItemSet = {
		selectFilter: ["nip", "nama", "alamat"],
		Column: [
			{
				title: "No",
				style: {
					width: "5px",
				},
			},
			"FOTO",
			"NIP",
			"NAMA",
			"ALAMAT",
			"NO TELP",
			"USERNAME",
			"SALDO",
			"ACTION",
		],
		dataSet: data,
		pagination: {
			pageLimit: 10,
		},
	};

	const hndelDelete = (id) => {
		onDeleted("auth/delete/" + id, (res) => {
			setterData();
			reset();
		});
	};

	const reset = () => {
		$("[name='nip']").val("");
		$("[name='nama']").val("");
		$("[name='alamat']").val("");
		$("[name='no_telp']").val("");
		$("[name='foto']").val("");
		setIdJuru(null);
	};
	const hndelStoreSaldo = (it) => {
		$("#saldo_pengutip").val(it.saldo);
		setIdJuruUpSaldo(it.id);
	};
	const hndelUpdateSaldo = async (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.append("id_user", idJuruUpSaldo);
		const ups = await axios
			.post(
				localStorage.getItem("base_url") + "api/auth/storSaldo",
				form_data,
				{
					headers: {
						Authorization: "bearer " + localStorage.getItem("token"),
					},
				}
			)
			.catch(() => {
				toastr.error("gagal update saldo");
			});
		if (ups != undefined && ups.status == 200) {
			swal({
				title: "Sukses",
				text: "",
				icon: "success",
				button: "Oke",
			}).then(() => {
				setterData();
				reset();
				resetModalUpSaldo();
			});
		}
		window.$("#exampleModalLong").modal("hide");
	};
	const resetModalUpSaldo = () => {
		$("#saldo_pengutip").val("");
		$("[name='pin']").val("");
		$("[name='jumlah_storan']").val("");
		setIdJuruUpSaldo(null);
	};

	return (
		<div>
			<div className="w-100 cards p-3">
				<div className="flex-betwen mb-4">
					<div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
						JURU PUNGUT
					</div>
					<div>
						<button
							className="btn btn-primary btn-sm"
							onClick={() => {
								ModalInp();
								reset();
							}}
						>
							Tambah Data
						</button>
						<ReactToPrint
							trigger={() => (
								<div className="btn btn-secondary btn-sm ml-2">
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
							content={() => componentRef.current}
						/>
					</div>
				</div>
				<Table
					{...ItemSet}
					responseFilter={(res) => {
						setDataPrinting(res);
					}}
				/>
			</div>

			<div
				className={`form-container ${inputModal}`}
				style={{ overflowY: "auto" }}
			>
				<div className="w-100 p-5">
					<div className="flex-betwen">
						<h6>Input Data Jurupungut</h6>
						<button className="btn-circle button-close" onClick={ModalInpClose}>
							<FaTimes />
						</button>
					</div>
					<hr />
					<form onSubmit={action}>
						<div className="row">
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										Nip
									</label>
									<input
										name="nip"
										type="text"
										className="form-control"
										placeholder="input nip jurupungut"
									/>
								</div>
							</div>
							{idJuru != null && (
								<>
									<div className="col-lg-6">
										<div className="form-group">
											<label className="label" htmlFor="">
												username
											</label>
											<input
												name="username"
												type="text"
												className="form-control"
												placeholder="input nama jurupungut"
											/>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<label className="label" htmlFor="">
												password
											</label>
											<input
												name="password"
												type="password"
												className="form-control"
												placeholder="input nama jurupungut"
											/>
										</div>
									</div>
								</>
							)}
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										Nama
									</label>
									<input
										name="nama"
										type="text"
										className="form-control"
										placeholder="input nama jurupungut"
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										Alamat
									</label>
									<input
										name="alamat"
										type="text"
										className="form-control"
										placeholder="input alamat lengkap jurupungut"
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										Nomor Telepon
									</label>
									<input
										name="no_telp"
										type="text"
										className="form-control"
										placeholder="input no telepon jurupungut"
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										Foto
										<div className="msg-input msg-warning">
											<i>boleh kosong jika tidak ada foto</i>
										</div>
									</label>
									<input name="foto" type="file" className="form-control" />
								</div>
							</div>
							<div className="col-lg-12">
								<hr />
								<div
									className="form-group"
									style={{ display: "flex", justifyContent: "flex-end" }}
								>
									<button
										type="button"
										className="btn btn-secondary mr-3 btn-sm"
									>
										Batal
									</button>
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
			{/* modal */}
			<div
				className="modal fade"
				id="exampleModalLong"
				tabIndex={-1}
				role="dialog"
				aria-labelledby="exampleModalLongTitle"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">
								Setor Saldo
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<form onSubmit={hndelUpdateSaldo}>
							<div className="modal-body">
								<div className="form-group">
									<label className="label" htmlFor="">
										JUMLAH SALDO PENGUTIP
									</label>
									<input
										type="text"
										id="saldo_pengutip"
										className="form-control"
										readOnly
									/>
								</div>
								<div className="form-group">
									<label className="label" htmlFor="">
										JUMLAH YANG DI SOTOR
									</label>
									<input
										type="number"
										name="jumlah_storan"
										className="form-control"
										placeholder="tidak boleh menggunkan titik / koma"
										required
									/>
								</div>

								<div className="form-group">
									<label className="label" htmlFor="">
										PIN ADMIN
									</label>
									<input
										name="pin"
										className="form-control pin-mode-input"
										required
									/>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary btn-sm"
									data-dismiss="modal"
								>
									Batal
								</button>
								<button
									type="submit"
									className="btn btn-primary action-btn btn-sm btn-form-submit"
								>
									Setor
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div style={{ display: "none" }}>
				<ComponentToPrint ref={componentRef} data={dataPrinting} />
			</div>
		</div>
	);
}

const DropdownMenu = (props) => {
	const [isOpen, setOpen] = React.useState(false);

	// helper function to close the menu
	function close() {
		setOpen(false);
	}

	const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
		isOpen,
		onOutsideClick: close, // close the menu when the user clicks outside
		// onDisappear: close, // close the menu when the menu gets scrolled out of sight
		overflowContainer: false, // keep the menu positioned inside the container
		auto: true, // automatically find the best placement
		placement: "top-end", // we prefer to place the menu "top-end"
		triggerOffset: 12, // keep some distance to the trigger
		containerOffset: 16, // give the menu some room to breath relative to the container
		arrowOffset: 16, // let the arrow have some room to breath also
	});
	return (
		<>
			<button
				className="btn-action-table view"
				{...triggerProps}
				onClick={() => setOpen(!isOpen)}
			>
				<IoEllipsisVertical size={20} />
			</button>

			{renderLayer(
				<AnimatePresence>
					{isOpen && (
						<motion.ul {...layerProps} className="dd-menu">
							<li onClick={props.onClickLihat}>
								<span
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<FaEye size={15} style={{ marginRight: "10px" }} />
									<span style={{ fontSize: "15px", fontWeight: "bold" }}>
										Lihat
									</span>
								</span>
							</li>
							{/* <li onClick={props.onClickCetak}>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <IoPrintOutline size={15} style={{ marginRight: "10px" }} />
                  <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Cetak
                  </span>
                </span>
              </li> */}
							<li
								onClick={props.onStorSaldo}
								data-toggle="modal"
								data-target="#exampleModalLong"
							>
								<span
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<FaDollarSign size={15} style={{ marginRight: "10px" }} />
									<span style={{ fontSize: "15px", fontWeight: "bold" }}>
										Setor Saldo
									</span>
								</span>
							</li>
							<li
								onClick={() => {
									setOpen(!isOpen);
									props.onClickEdit();
								}}
							>
								<span
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<FaPen size={15} style={{ marginRight: "10px" }} />
									<span style={{ fontSize: "15px", fontWeight: "bold" }}>
										Edit
									</span>
								</span>
							</li>
							<li onClick={props.onClickDelete}>
								<span
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<FaRegTrashAlt size={15} style={{ marginRight: "10px" }} />
									<span style={{ fontSize: "15px", fontWeight: "bold" }}>
										Hapus
									</span>
								</span>
							</li>
							<Arrow {...arrowProps} />
						</motion.ul>
					)}
				</AnimatePresence>
			)}
		</>
	);
};
