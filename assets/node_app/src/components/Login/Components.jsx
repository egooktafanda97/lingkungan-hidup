import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import { FaTimes, FaPen, FaTrash, FaEye } from "react-icons/fa";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
export default function Components() {
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState({});
	const hndelLogin = (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		if (loading == false) {
			Login(form_data, (res) => {
				if (res.status == 200) {
					localStorage.setItem("token", res.data.access_token);
					localStorage.setItem("user", JSON.stringify(res.data.user));
					window.location.href = localStorage.getItem("web_url") + "Dashboard";
				} else {
					setErr(res.data);
					setLoading(false);
				}
			});
		}
	};
	const Login = async (data, response) => {
		setLoading(true);
		const Logs = await axios
			.post(localStorage.getItem("base_url") + "api/auth/login-admin", data)
			.catch((err) => {
				response(err.response);
			});
		if (Logs.status != undefined && Logs.status == 200) {
			response(Logs);
		}
	};
	return (
		<div id="app">
			<section className="section">
				<div className="container mt-5">
					<div className="row">
						<div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
							<div className="login-brand">PELALAWAN</div>
							<div className="card card-primary">
								<div className="card-header">
									<h4>Login</h4>
								</div>
								<div className="card-body">
									<form
										onSubmit={hndelLogin}
										className="needs-validation"
										noValidate
									>
										<div className="form-group">
											<label htmlFor="email">Username</label>
											<input
												id="username"
												type="username"
												className="form-control"
												name="username"
												tabIndex={1}
												onChange={() => {
													setErr({});
												}}
												required
												autofocus
												readOnly={loading}
											/>
											<div className="invalid-feedback">
												Please fill in your username
											</div>
											{err.username != undefined && (
												<div className="alert-err">{err.username}</div>
											)}
										</div>
										<div className="form-group">
											<label htmlFor="password" className="d-block">
												Password
												{/* <div className="float-right">
													<a href="forgot.html">Forgot Password?</a>
												</div> */}
											</label>
											<input
												id="password"
												type="password"
												className="form-control"
												name="password"
												tabIndex={2}
												onChange={() => {
													setErr({});
												}}
												required
												readOnly={loading}
											/>
											<div className="invalid-feedback">
												please fill in your password
											</div>
											{err.password != undefined && (
												<div className="alert-err">{err.password}</div>
											)}
										</div>
										{/* <div className='form-group'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          name='remember'
                          className='custom-control-input'
                          tabIndex={3}
                          id='remember-me'
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='remember-me'>
                          Remember Me
                        </label>
                      </div>
                    </div> */}
										<div className="form-group">
											<button
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
												type="submit"
												className="btn btn-primary btn-block action-btn btn-form-submit"
												tabIndex={4}
											>
												{loading ? (
													<>
														<div className="loading_mode_standart"></div>
														<div
															style={{ marginLeft: "5px", marginRight: "5px" }}
														>
															Loading
														</div>
													</>
												) : (
													<div>Login</div>
												)}
												{/* <div className='dots'>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div> */}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
