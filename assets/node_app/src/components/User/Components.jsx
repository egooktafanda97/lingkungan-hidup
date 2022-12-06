import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import { FaTimes, FaPen, FaTrash, FaEye } from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import LoadingAnimate from "../../utils/loadingAnimate";
import { actionReq } from "./Model";

import { Build, Colom } from "./setTable";

export default function Components() {
	const [data, setData] = React.useState([]);
	const [loadData, setLoadData] = useState(false);
	const [inputModal, setInputModal] = useState("hide-inp");

	const [id, setId] = useState(null);
	const [zona, setZona] = useState(null);

	// ================================

	const Actions = {
		onEdit: (res) => {
			ModalInp();
			setId(res.id);
			// jquery name input
			$("[name='nip']").val(res.nip);
			$("[name='nama']").val(res.nama);
			$("[name='jabatan']").val(res.jabatan);
			$("[name='alamat']").val(res.alamat);
			$("[name='no_telp']").val(res.no_telp);
			$("[name='email']").val(res.email);
			$("[name='username']").val(res.username);
			$("[name='pin']").val(res.pin);
		},
		onDelete: (id) => {
			onDeleted("auth/delete/" + id, (res) => {
				setterData(() => {});
				reset();
			});
		},
	};
	useEffect(() => {
		setterData(() => {});
	}, []);

	const actions = (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.append("role", "ADMIN");
		if ($("[name='password']").val() != "") {
			form_data.append("password_confirmation", form_data.get("password"));
		}

		if (id != null && id != undefined) {
			form_data.append("id", id);
		}
		actionReq(form_data, (res) => {
			setterData(() => {});
			ModalInpClose();
			reset();
		});
	};
	const setterData = async (callback) => {
		setLoadData(false);
		const getter = await axios
			.get(localStorage.getItem("base_url") + "api/auth/userGetAdmin", {
				headers: {
					Authorization: "bearer " + localStorage.getItem("token"),
				},
			})
			.catch((err) => {
				console.log(err.response);
			});
		if (getter != undefined && getter.status == 200) {
			Build(
				getter.data,
				(res) => {
					// console.log(res);
					setData(res);
				},
				Actions
			);
			callback(getter.data);
			setLoadData(true);
		}
	};

	// ================================
	// actions
	function onEdit(data) {}
	const onDelete = (id) => {
		onDeleted("usaha/delete/" + id, (res) => {
			setterData(() => {});
			reset();
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
		$("[name='nama_zona']").focus();
	};

	const reset = () => {
		$("[name='nama_zona']").val("");
		$("[name='status_zona']").val("");
		$("[name='keterangan']").val("");
		setIdZona(null);
	};

	return (
		<div>
			<div className="w-100 cards p-3">
				<div className="flex-betwen mb-4">
					<div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
						Management User
					</div>
					<button
						className="btn btn-primary btn-sm"
						onClick={() => {
							ModalInp();
							reset();
						}}
					>
						Tambah Data
					</button>
				</div>

				{loadData ? (
					<Table {...Colom(data)} />
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

			<div
				className={`form-container ${inputModal}`}
				style={{ overflowY: "auto" }}
			>
				<div className="w-100 p-5">
					<div className="flex-betwen">
						<h6>Zona</h6>
						<button className="btn-circle button-close" onClick={ModalInpClose}>
							<FaTimes />
						</button>
					</div>
					<hr />
					<form onSubmit={actions}>
						<div className="row">
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										NIP
									</label>
									<input
										name="nip"
										type="text"
										className="form-control"
										placeholder="nip boleh kosong jika tidak ada"
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										NAMA
									</label>
									<input
										name="nama"
										type="text"
										className="form-control"
										placeholder="nama panjang"
										required
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										JABATAN
									</label>
									<select
										name="jabatan"
										className="form-control form-control-sm"
										required
									>
										<option value="">Pilih Status</option>
										<option value="KEPALA DINAS">KEPALA DINAS</option>
										<option value="KEPALA-BIDANG">KEPALA BIDANG</option>
										<option value="BENDAHARA">BENDAHARA PENERIMA</option>
										<option value="STAFF">STAFF</option>
									</select>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										ALAMAT
									</label>
									<input
										name="alamat"
										type="text"
										className="form-control"
										placeholder="alamat"
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										NO TELEPON
									</label>
									<input
										name="no_telp"
										type="text"
										className="form-control"
										placeholder="nomor telepon"
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										EMAIL
									</label>
									<input
										name="email"
										type="text"
										className="form-control"
										placeholder="nama usaha"
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										USERNAME
									</label>
									<input
										name="username"
										type="text"
										className="form-control"
										placeholder="username"
										required
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										PASSWORD
									</label>
									<input
										name="password"
										type="password"
										className="form-control"
										placeholder="nama usaha"
										required
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										PIN
									</label>
									<input
										name="pin"
										type="text"
										className="form-control"
										placeholder="PIN MINIMAL 4 DIGIT"
										required
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label className="label" htmlFor="">
										FOTO
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
										onClick={() => {
											ModalInpClose();
											reset();
										}}
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
		</div>
	);
}
