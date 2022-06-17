import React, { useState, useEffect, useRef } from "react";
import "../../../style/global.scss";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import swalReact from "@sweetalert/with-react";
import Paginator from "react-hooks-paginator";
import Select from "react-select";
import Table from "../../../utils/Table";
import { onDeleted, rupiah } from "../../../utils/functionComponent";

import { useLayer } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import { Build, Colom } from "./setTable";
import moment from "moment";
import {
	GetDataJenisUsaha,
	GetDataZaona,
	UsahaGet,
	UserGetUser,
	actionReq,
	GetDataPemohon,
	UserGetUserSearch,
} from "./Model";
import LoadingAnimate from "../../../utils/loadingAnimate";
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
export default function Components() {
	const [data, setData] = useState([]);
	const [dataset, setDataSet] = useState([]);
	const [Footers, setFooter] = useState(null);
	const [juru, setJuru] = useState([]);
	const [tipe, setTipe] = useState([]);
	const [search, setSearch] = useState({
		id_jurupungut: window.id_user,
	});
	const [loadData, setLoadData] = useState(false);
	const componentRef = useRef();
	useEffect(() => {
		setterData(() => {
			setLoadData(true);
		});
	}, []);
	const setterData = (callback) => {
		UserGetUserSearch(
			{
				type: "whereGroup",
				search: search,
			},
			(res) => {
				Build(
					res,
					(res) => {
						setData(res);
						setDataSet(res);
						setLoadData(true);
					},
					(Foot) => {
						setFooter(<Foot />);
					},
					null
				);
			}
		);
	};
	useEffect(() => {
		setJuruData(() => {});
		setterJnisUsaha(() => {});
	}, []);
	const setJuruData = (callback) => {
		UserGetUser((res) => {
			setJuru(res);
			callback(res);
		});
	};

	const setterJnisUsaha = (callback) => {
		GetDataJenisUsaha((res) => {
			setTipe(res);
			callback(res);
		});
	};

	const hndelSearch = (e) => {
		if (e.target.getAttribute("data-type") == "relation") {
			setSearch({
				...search,
				relation: [
					{
						table: e.target.getAttribute("data-table"),
						where: {
							[e.target.name]: e.target.value == "" ? null : e.target.value,
						},
					},
				],
			});
		} else {
			setSearch({
				...search,
				[e.target.name]: e.target.value == "" ? null : e.target.value,
			});
		}
	};
	useEffect(() => {
		setLoadData(false);
		console.log(search);
		UserGetUserSearch(
			{
				type: "whereGroup",
				search: search,
			},
			(res) => {
				Build(
					res,
					(result) => {
						setData(result);
						setDataSet(result);
						setLoadData(true);
					},
					(Foot) => {
						setFooter(<Foot />);
					},
					null
				);
			}
		);
	}, [search]);
	return (
		<div>
			<div className="w-100 p-3">
				<div
					className="w-100"
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<div>
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
					</div>
					<div style={{ display: "flex" }}>
						{/* <div className='searchs-container'>
              <select
                name='id_jurupungut'
                className='search-opt'
                onChange={hndelSearch}>
                <option value=''>Pilih Juru Pungut</option>
                {juru.map((res) => {
                  return <option value={res.id}>{res.nama}</option>;
                })}
              </select>
            </div> */}
						<div className="searchs-container">
							{/* <select
                data-table='usaha'
                name='id_tipe_usaha'
                className='search-opt'
                onChange={hndelSearch}>
                <option value=''>Pilih Tipe Usaha</option>
                {tipe.map((res) => {
                  return (
                    <option value={res.id_tipe_usaha}>{res.tipe_usaha}</option>
                  );
                })}
              </select> */}
							<ReactToPrint
								trigger={() => (
									<div className="btn btn-secondary btn-sm ml-2 mb-2">
										<span
											style={{
												display: "flex",
												justifyContent: "flex-start",
												alignItems: "center",
											}}
										>
											<IoPrintOutline
												size={15}
												style={{ marginRight: "10px" }}
											/>
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
				</div>
				{loadData ? (
					<div>
						<Table {...Colom(data)} Footer={Footers != null ? Footers : null} />
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
			<div style={{ display: "none" }}>
				<ComponentToPrint ref={componentRef} data={dataset} />
			</div>
		</div>
	);
}
