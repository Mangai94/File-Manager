import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const LeftPanel = ({ data, showIcons, path1, level, displayFolderData, name, url, bubbleSelect, lastRefresh }) => {
	const history = useHistory();
	const currentPath = `${path1}/${name}`;
	const [isExpanded, setIsExpanded] = useState(false);
	const [hasSubFolders, setHasSubFolders] = useState(false);

	useEffect(() => {
		if (!data || data.type != 1) return;

		if (urlMatch()) {
			handleChildSelection(currentPath);
			displayFolderData(name, data.children);
		}

		let hasSubs = false;
		data.children &&
			Object.keys(data.children).forEach(key => {
				if (data.children[key].type == 1) hasSubs = true;
			});

		setHasSubFolders(hasSubs);
	}, [lastRefresh, data, url]);

	const urlMatch = () => url === currentPath;

	const handleChildSelection = currentPath => {
		setIsExpanded(true);
		if (bubbleSelect) bubbleSelect(currentPath);
	};

	const handleClick = e => {
		if (e.defaultPrevented) return;
		displayFolderData(name, data.children);
		history.push(currentPath);
	};

	const handleExpandToggle = e => {
		e.preventDefault();
		showIcons && hasSubFolders && setIsExpanded(!isExpanded);
	};

	if (!data || data.type != 1) return null;

	return (
		<div style={{ paddingLeft: level * 10 }}>
			<div
				style={{
					display: "flex",
					height: 40,
					cursor: "default",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: urlMatch() ? "#e4e6e7" : "#fff",
				}}
				onClick={handleClick}
			>
				<div style={{ flex: "0.1", paddingLeft: 10 }} onClick={handleExpandToggle}>
					{showIcons && hasSubFolders && <i className={`fas fa-chevron-${isExpanded ? "down" : "right"}`}></i>}
				</div>
				<div style={{ flex: "0.1" }}>
					<i className="fas fa-folder"></i>
				</div>
				<div
					style={{
						flex: "0.8",
						color: urlMatch() ? "#f25c50" : "#8e8e8e",
					}}
				>
					{name}
				</div>
			</div>
			<div
				style={{
					display: isExpanded ? "block" : "none",
				}}
			>
				{data &&
					data.children &&
					Object.keys(data.children)
						.sort()
						.map(k => (
							<div key={k}>
								<LeftPanel
									data={data.children[k]}
									showIcons={showIcons}
									level={level + 1}
									name={k}
									path1={currentPath}
									displayFolderData={displayFolderData}
									url={url}
									bubbleSelect={handleChildSelection}
									lastRefresh={lastRefresh}
								/>
							</div>
						))}
			</div>
		</div>
	);
};

export default LeftPanel;
