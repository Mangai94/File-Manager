import "./App.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LeftPanel from "./Components/leftPanel";
import RightPanel from "./Components/rightPanel";
import Navbar from "./Components/navBar";
import FilenameModal from "./Components/fileNameModal";
import filexp from "./Services/folderdata";

class App extends Component {
	state = {
		data: {},
		folderData: [],
		selectedFolderName: "root",
		showModal: false,
		modalHeading: "",
		inputText: "",
		showIcons: true,
		showRightPanel: true,
		showLeftPanel: true,
		currentScreen: "large",
		lastRefresh: new Date().toString(),
		activePath: "/root",
		activeItem: null,
	};

	componentDidMount() {
		window.addEventListener("load", e => {
			this.setDisplayOptions();
		});

		window.addEventListener("resize", e => {
			this.setDisplayOptions();
		});

		var input = filexp.getData("data");
		if (!input) filexp.initializeData();
		var fileData = filexp.getData("data");
		console.log("filedata", fileData)
		this.setState({
			data: fileData,
			folderData: fileData["root"].children,
			lastRefresh: new Date().toString(),
		});
	}

	setDisplayOptions = override => {
		if (window.screen.width < 768) {
			if (this.state.currentScreen == "small" && !override) return;

			this.setState({
				currentScreen: "small",
				showLeftPanel: false,
				showRightPanel: true,
			});
		} else {
			if (this.state.currentScreen == "large" && !override) return;

			this.setState({
				currentScreen: "large",
				showLeftPanel: true,
				showRightPanel: true,
			});
		}
	};

	displayFolderData = (name, children) => {
		this.setDisplayOptions(true);
		this.setState({ selectedFolderName: name, folderData: children, activeItem: null });
	};

	openModal = (action, type) => {
		let text = action == "edit" ? this.state.activeItem : "";
		let btnText = action == "edit" ? "Rename" : "Create";
		this.setState({ showModal: true, inputText: text, btnText, modalHeading: type == 1 ? "Folder" : "File" });
	};

	handleClose = () => {
		this.setState({ showModal: false });
	};

	handleChildSelection = currentPath => {
		this.setState({ activePath: currentPath });
	};

	modifyFolder = (type, name, action) => {
		let pathArray = this.state.activePath.substring(1).split("/");
		if (action == "Rename") this.renameFolder(name, pathArray);
		else this.create(type, name, pathArray);
	};

	create = (type, name, pathArray) => {
		const { data } = this.state;
		let originalData = {};
		Object.assign(originalData, data);

		var parent = originalData;
		var lookUpObj = originalData;
		let newItem = {
			type: type == "Folder" ? "1" : "2",
			created_on: new Date(),
			modified_on: new Date(),
			children: null,
		};

		if (type != "Folder") {
			const nameSplit = name.split(".");
			if (nameSplit.length > 1) newItem.extension = nameSplit[nameSplit.length - 1];
		}

		for (var path of pathArray) {
			if (lookUpObj == null) break;

			if (lookUpObj[path] != null) {
				parent = lookUpObj[path];
				lookUpObj = lookUpObj[path].children;
			}
		}

		if (!parent.children) {
			parent.children = {};
		}

		if (parent.children[name]) {
			alert("File/Folder with same name exits already !!");
			return;
		}

		parent.modified_on = new Date();
		parent.children[name] = newItem;
		filexp.setData(originalData);

		this.setState({ data: originalData, showModal: false, lastRefresh: new Date().toString(), activeItem: name });
	};

	renameFolder = (name, pathArray) => {
		let { data: originalData } = { ...this.state };
		let lookUpObj = originalData;
		for (var path of pathArray) {
			if (lookUpObj == null) break;
			lookUpObj = lookUpObj[path].children;
		}
		if (lookUpObj != null) {
			Object.defineProperty(lookUpObj, name, Object.getOwnPropertyDescriptor(lookUpObj, this.state.activeItem));
			delete lookUpObj[this.state.activeItem];
		}

		filexp.setData(originalData);
		this.setState({ data: originalData, showModal: false, inputText: "", lastRefresh: new Date().toString(), activeItem: name });
	};

	handleMenuPress = () => {
		this.setState({ showRightPanel: !this.state.showRightPanel, showLeftPanel: !this.state.showLeftPanel });
	};

	handleSelect = name => {
		this.setState({ activeItem: name });
	};

	handleDelete = () => {
		const { data } = this.state;
		let originalData = {};
		Object.assign(originalData, data);

		let pathArray = this.state.activePath.substring(1).split("/");
		let lookUpObj = originalData;
		for (var path of pathArray) {
			if (lookUpObj == null) break;
			lookUpObj = lookUpObj[path].children;
		}

		delete lookUpObj[this.state.activeItem];
		filexp.setData(originalData);
		this.setState({ data: originalData, lastRefresh: new Date().toString(), activeItem: null });
	};

	renameItem = () => { };

	render() {
		return (
			<div className="container-fluid" style={{ margin: 0, padding: 0, overflow: "hidden" }}>
				<div style={{ maxWidth: 1366, marginLeft: "auto", marginRight: "auto" }}>
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<FilenameModal
								show={this.state.showModal}
								handleClose={this.handleClose}
								modifyFolder={this.modifyFolder}
								inputText={this.state.inputText}
								btnText={this.state.btnText}
								modalHeading={this.state.modalHeading}
							/>
						</div>
					</div>
					<Navbar openModal={this.openModal} onMenuPress={this.handleMenuPress} />
					<div className="row">
						<div
							className="col-sm-12 col-md-3 col-lg-3 left-panel"
							style={{ paddingRight: 0, display: this.state.showLeftPanel ? "block" : "none" }}
							onMouseEnter={() => this.setState({ showIcons: true })}
							onMouseLeave={() => this.setState({ showIcons: true })}
						>
							<LeftPanel
								data={this.state.data["root"]}
								showIcons={this.state.showIcons}
								level={0}
								path1=""
								name="root"
								url={this.props.location.pathname == "/" ? "/root" : this.props.location.pathname}
								displayFolderData={this.displayFolderData}
								lastRefresh={this.state.lastRefresh}
								bubbleSelect={this.handleChildSelection}
							/>
						</div>
						<div
							className="col-sm-12 col-md-9 col-lg-9 right-panel"
							style={{ display: this.state.showRightPanel ? "block" : "none" }}
						>
							<RightPanel
								data={this.state.folderData}
								name={this.state.selectedFolderName}
								url={this.props.location.pathname == "/" ? "/root" : this.props.location.pathname}
								activePath={this.state.activePath}
								displayFolderData={this.displayFolderData}
								openModal={this.openModal}
								onSelect={this.handleSelect}
								activeItem={this.state.activeItem}
								deleteItem={this.handleDelete}
								renameItem={this.renameItem}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
