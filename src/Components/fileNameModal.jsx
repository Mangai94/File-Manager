import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function FilenameModal({ show, handleClose, modifyFolder, inputText, btnText, modalHeading }) {
	const [name, setName] = useState("");

	function handleChange(e) {
		setName(e.target.value);
	}

	useEffect(() => {
		setName(inputText);
	}, [inputText]);

	const handlePress = e => {
		e.preventDefault();
		if (name === "") return;

		modifyFolder(modalHeading, name, btnText);
		setName("");
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{modalHeading}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handlePress}>
					<input
						type="text"
						autoFocus
						value={name}
						onChange={handleChange}
						className="form-control"
						placeholder={`${modalHeading} name`}
					/>
					<button type="submit" className="btn btn-secondary mt-4">
						{btnText}
					</button>
				</form>
			</Modal.Body>
			{/* <Modal.Footer>
			</Modal.Footer> */}
		</Modal>
	);
}
