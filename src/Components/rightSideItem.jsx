import React, { useState, useEffect } from "react";

export default function RightSideItem({ name, item, onDoubleClick, onSelect, activeItem }) {
	const [hover, setHover] = useState(false);
	const [highlight, setHighlight] = useState(false);

	const handleClick = () => {
		onSelect(highlight ? null : name);
		setHighlight(!highlight);
	};

	useEffect(() => {
		setHighlight(activeItem === name);
	}, [activeItem]);

	return (
		<tr
			key={item}
			onDoubleClick={onDoubleClick}
			onClick={handleClick}
			onMouseOver={() => setHover(true)}
			onMouseOut={() => setHover(false)}
			style={{
				height: 40,
				cursor: "default",
				verticalAlign: "center",
				paddingLeft: 10,
				paddingTop: 5,
				paddingBottom: 5,
				backgroundColor: highlight ? "#e4e6e7" : hover ? "#f4f4f4" : "#fff",
			}}
		>
			<td className="table-content">
				<span style={{ width: 20, height: 40, marginLeft: 10 }}>
					<i className={`fas fa-${item.type == 1 ? "folder" : "file"}`}></i>
				</span>
				<span
					style={{
						height: 40,
						marginLeft: 15,
					}}
				>
					{name}
				</span>
			</td>
			<td className="table-content">{`${new Date(item.modified_on).toLocaleDateString()} ${new Date(
				item.modified_on
			).toLocaleTimeString()}`}</td>
			<td className="table-content">{item.type == 1 ? "Folder" : item.extension}</td>
		</tr>
	);
}
