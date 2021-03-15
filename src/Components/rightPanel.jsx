import React, { useState } from "react";
import { useHistory } from "react-router";
import RightSideItem from "./rightSideItem";

export default function RightPanel({ data, activePath, openModal, onSelect, activeItem, deleteItem }) {
	const history = useHistory();
	const [isExpanded, setIsExpanded] = useState(false);
	//const currentPath = `${path1}/${name}`;

	const handleClick = (name, item) => {
		onSelect(null);
		if (item.type != 1) return;

		history.push(`${activePath}/${name}`);
	};

	const handleNewClick = (action, type) => {
		setIsExpanded(false);
		openModal(action, type);
	};

	return (
		<div>
			<table style={{ width: "100%" }} className="table">
				<thead>
					<tr>
						<th style={{ width: "65%" }} className="table-heading">
							Name
						</th>
						<th style={{ width: "30%" }} className="table-heading">
							Last Modified
						</th>
						<th style={{ width: "5%" }} className="table-heading">
							Type
						</th>
					</tr>
				</thead>
				<tbody>
					{!data && (
						<tr>
							<td colSpan={3} style={{ textAlign: "center" }}>
								This folder is empty.
							</td>
						</tr>
					)}
					{data &&
						Object.keys(data).sort().map(name => (
							<RightSideItem
								name={name}
								item={data[name]}
								key={name}
								onDoubleClick={() => handleClick(name, data[name])}
								onSelect={onSelect}
								activeItem={activeItem}
							/>
						))}
				</tbody>
			</table>
			{activeItem && (
				<>
					<span className="delete-icon" onClick={deleteItem}>
						<i className="fas fa-trash fa-1x"></i>
					</span>
					<span className="edit-icon" onClick={() => handleNewClick("edit", data[activeItem].type)}>
						<i className="fas fa-edit fa-1x"></i>
					</span>
				</>
			)}
			<span className="add-icon">
				<i style={{}} className="fas fa-plus-circle fa-1x" onClick={() => setIsExpanded(!isExpanded)}></i>
			</span>
			{isExpanded && (
				<span className="add-options">
					<span
						style={{
							border: "1px solid #e2e2e2",
							margin: 10,
							padding: 5,
							borderRadius: 5,
							cursor: "default",
						}}
						onClick={() => handleNewClick("new", 1)}
					>
						New Folder
					</span>
					<span
						style={{
							border: "1px solid #e2e2e2",
							margin: 10,
							padding: 5,
							borderRadius: 5,
							cursor: "default",
						}}
						onClick={() => handleNewClick("new", 2)}
					>
						New File
					</span>
				</span>
			)}
		</div>
	);
}
