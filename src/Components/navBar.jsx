import "../App.css";
const Navbar = ({ openModal, onMenuPress }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light cursor">
			<div className="container-fluid">
				<span className="menu-button" onClick={onMenuPress}>
					<i className="fas fa-bars"></i>
				</span>
				<div className="navbar-brand cursor">File Manager</div>
				<div className="collapse navbar-collapse" id="navbarNav">
					{/* <ul className="navbar-nav">
						<li className="nav-item">
							<div className="nav-link cursor" onClick={() => openModal("new")}>
								New Folder
							</div>
						</li>
						<li className="nav-item">
							<div className="nav-link cursor" onClick={() => openModal("edit")}>
								Rename
							</div>
						</li>
						<li className="nav-item">
							<div className="nav-link cursor">Delete</div>
						</li>
					</ul> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
