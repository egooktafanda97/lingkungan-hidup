import React, { useState, useEffect } from "react";
import "../../style/global.scss";
import $ from "jquery";
import { FaTimes, FaPen, FaTrash, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical, IoPrintOutline } from "react-icons/io5";
import { useLayer, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import swalReact from "@sweetalert/with-react";
import { onDeleted, rupiah } from "../../utils/functionComponent";

export const Colom = (data) => {
	const ItemSet = {
		selectFilter: ["kode", "jurupungut", "nama_pemilik", "nama_usaha", "zona"],
		Column: [
			{
				title: "No",
				style: {
					width: "5px",
				},
			},
			"FOTO",
			"KODE",
			"JURUPUNGUT",
			"NAMA PEMILIK",
			"NAMA USAHA",
			"JENIS USAHA",
			"KETERANGAN",
			"ALAMAT",
			"TIPE USAHA",
			"TARIF",
			"ACTION",
		],
		dataSet: data,
		pagination: {
			pageLimit: 6,
		},
	};
	return ItemSet;
};

export const Build = (data, response, action) => {
	const result = [];
	data.map((item, i) => {
		result.push({
			No: <strong>{i + 1}</strong>,
			foto: () => (
				<img
					onClick={() =>
						viewImg(
							localStorage.getItem("base_url") + "public/img/usaha/" + item.foto
						)
					}
					className="img-circle"
					style={{ width: "40px", height: "40px" }}
					src={
						localStorage.getItem("base_url") + "public/img/usaha/" + item.foto
					}
					alt=""
				/>
			),
			kode: item.kode,
			hidden: item.qrCode,
			jurupungut: item.user.nama,
			nama_pemilik: item.nama_pemilik,
			nama_usaha: item.nama_usaha,
			jenis_usaha: item.jenis_usaha,
			zona: item.zona.nama_zona,
			alamat: item.alamat,
			tipe_usaha: item.tipe_usaha.tipe_usaha,
			Jumlah_Retribusi: rupiah(item.tipe_usaha.jumlah_retribusi, "Rp"),
			action: (
				<div
					className="d-flex"
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<DropdownMenu
						onClickEdit={() => {
							action.onEdit(item);
						}}
						onClickDelete={() => {
							action.onDelete(item.id_usaha);
						}}
						onClickLihat={() => {
							action.onLihat(item);
						}}
					/>
				</div>
			),
		});
	});
	response(result);
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
						<ul {...layerProps} className="dd-menu">
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
							<li onClick={props.onClickCetak}>
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
		</>
	);
};
