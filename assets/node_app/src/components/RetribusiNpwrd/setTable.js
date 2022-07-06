import React, { useState, useEffect, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import "../../style/global.scss";
import $ from "jquery";
import {
	FaTimes,
	FaPen,
	FaTrash,
	FaEye,
	FaRegTrashAlt,
	FaPrint,
} from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import { useLayer, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import swalReact from "@sweetalert/with-react";
import { onDeleted, rupiah } from "../../utils/functionComponent";
import moment from "moment";
// momet indonesia
moment.locale("id");

export const Colom = (data) => {
	const ItemSet = {
		selectFilter: [""],
		Column: [
			{
				title: "No",
				style: {
					width: "5px",
				},
			},
			"NPWRD",
			"NAMA PENYETOR",
			"NAMA",
			"NAMA ADMIN PENGUTIP",
			"ALAMAT",
			"MENYETOR BERDASARKAN",
			"MASA RETRIBUSI",
			"PERIODE MULAI",
			"PERIODE SAMPAI DENGAN",
			"JUMLAH",
			"TANGGAL SETOR",
			"ACTION",
		],
		dataSet: data,
		pagination: {
			pageLimit: 10,
		},
	};
	return ItemSet;
};

export const Build = (data, response, action) => {
	const result = [];
	data.map((item, i) => {
		result.push({
			No: <strong>{i + 1}</strong>,
			npwrd: item?.npwrd ?? "",
			nama_penyetor: item?.nama_penyetor ?? "",
			nama: item?.join_npwrd?.nama ?? "",
			admin_pengutip: item?.join_admin?.nama ?? "",
			alamat: item?.join_npwrd?.alamat ?? "",
			menyetoran_berdasarkan: item?.join_npwrd?.menyetoran_berdasarkan ?? "",
			masa_retribusi: moment(item?.masa_retribusi ?? "2022-01").format(
				"MMMM YYYY"
			),
			periode_mulai: moment(item?.periode_mulai ?? "2022-01").format(
				"MMMM YYYY"
			),
			periode_selesai: moment(item?.periode_sampai ?? "2022-01").format(
				"MMMM YYYY"
			),
			jumlah: rupiah("" + item.jumlah, "Rp"),
			tanggal_setor: moment(item?.tgl_setor ?? "2022-01").format(
				"DD MMMM YYYY"
			),
			action: (
				<div
					className="d-flex"
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<DropdownMenu
						item={item}
						onClickCetak={() => {
							action.onCetak(item);
						}}
						onClickEdit={() => {
							action.onEdit(item);
						}}
						onClickDelete={() => {
							action.onDelete(item.id_retribusi);
						}}
					/>
				</div>
			),
		});
	});
	response(result);
};
// image viwer sweetalert type
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
const DropdownMenu = (props) => {
	const [isOpen, setOpen] = React.useState(false);
	const componentRef = useRef();

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
						<ul {...layerProps} className="dd-menu">
							<ReactToPrint
								trigger={() => (
									<li
										onClick={() => {
											setOpen(!isOpen);
										}}
									>
										<span
											style={{
												display: "flex",
												justifyContent: "flex-start",
												alignItems: "center",
											}}
										>
											<FaPrint size={15} style={{ marginRight: "10px" }} />
											<span style={{ fontSize: "15px", fontWeight: "bold" }}>
												Print
											</span>
										</span>
									</li>
								)}
								content={() => componentRef.current}
							/>

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
									<FaRegTrashAlt
										className="delete"
										size={15}
										style={{ marginRight: "10px" }}
									/>
									<span style={{ fontSize: "15px", fontWeight: "bold" }}>
										Hapus
									</span>
								</span>
							</li>
							<Arrow {...arrowProps} />
						</ul>
					)}
				</AnimatePresence>
			)}
			<div style={{ display: "none" }}>
				<ComponentToPrint ref={componentRef} values={props.item} />
			</div>
		</>
	);
};
