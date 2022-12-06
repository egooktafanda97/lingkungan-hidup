import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import { FaTimes, FaPen, FaTrash, FaEye, FaEdit } from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "./../../utils/Table";
import { onDeleted, rupiah } from "../../utils/functionComponent";

import LoadingAnimate from "../../utils/loadingAnimate";
import { actionReq } from "./Model";

import { Build, Colom } from "./setTable";

export default function Components() {
	const [data, setData] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	// axios get auth data user
	useEffect(() => {
		getter();
	}, []);
	const getter = async () => {
		setLoading(true);
		const get = await axios
			.get(localStorage.getItem("base_url") + "api/auth/me", {
				headers: {
					Authorization: "bearer " + localStorage.getItem("token"),
				},
			})
			.catch((err) => {
				console.log(err);
			});
		if (get.status == 200) {
			setData(get.data);
			setLoading(false);
			$("[name='nip']").val(get.data?.nip ?? "-");
			$("[name='nama']").val(get.data?.nama ?? "-");
			$("[name='jabatan']").val(get.data?.jabatan ?? "-");
			$("[name='alamat']").val(get.data?.alamat ?? "-");
			$("[name='no_telp']").val(get.data?.no_telp ?? "-");
			$("[name='email']").val(get.data?.email ?? "-");
			$("[name='username']").val(get.data?.username ?? "-");
			$("[name='pin']").val(get.data?.pin ?? "-");
		}
	};

	const actions = (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.append("role", "ADMIN");
		if ($("[name='password']").val() != "") {
			form_data.append("password_confirmation", form_data.get("password"));
		}
		form_data.append("id", data.id);
		actionReq(form_data, (res) => {
			getter();
		});
	};

	return (
		<div>
			{console.log(data)}
			<div className="w-100 cards p-3">
				<div className="flex-betwen mb-4">
					<div style={{ fontSize: "1em", fontWeight: "bold", color: "#000" }}>
						PROFILE
					</div>
				</div>

				<div className="continer">
					<div className="row">
						<div className="col-md-4">
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
											"public/img/users/" +
											data.foto
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
									{data.role == "SUPER_ADMIN" && (
										<>
											<div className="list-detail">
												<strong>SALDO ADMIN</strong>
												<strong style={{ color: "red" }}>
													{rupiah("" + data?.saldo ?? 0, "Rp ")}
												</strong>
											</div>
											<hr />
										</>
									)}
									<div className="list-detail">
										<strong>NIP</strong>
										<strong>{data?.nip ?? "-"}</strong>
									</div>
									<hr />
									<div className="list-detail">
										<strong>NAMA</strong>
										<strong>{data?.nama ?? "-"}</strong>
									</div>
									<hr />
									<div className="list-detail">
										<strong>ALAMAT</strong>
										<strong>{data?.alamat ?? "-"}</strong>
									</div>
									<hr />
									<div className="list-detail">
										<strong>NOMOR TELEPON</strong>
										<strong>{data?.no_telp ?? "-"}</strong>
									</div>
									<hr />
									<div className="list-detail">
										<strong>EMAIL</strong>
										<strong>{data?.email ?? "-"}</strong>
									</div>
									<hr />
									<div className="list-detail">
										<strong>JABATAN</strong>
										<strong>{data?.jabatan ?? "-"}</strong>
									</div>
									<hr />
									<div className="list-detail">
										<strong>PIN</strong>
										<strong>{data?.pin ?? "-"}</strong>
									</div>
									<hr />
									<div className="list-detail">
										<strong>USERNAME</strong>
										<strong>{data?.username ?? "-"}</strong>
									</div>
									<hr />
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="w-100 cards1 p-3">
								<div className="w-100">
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
														<option value="BENDAHARA">
															BENDAHARA PENERIMA
														</option>
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
													<input
														name="foto"
														type="file"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-lg-12">
												<hr />
												<div
													className="form-group"
													style={{
														display: "flex",
														justifyContent: "flex-end",
													}}
												>
													<button
														type="submit"
														className="btn btn-success action-btn btn-sm btn-form-submit"
													>
														<FaEdit /> EDIT
													</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
