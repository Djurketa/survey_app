import React from "react";

function Filter() {
	return (
		<div className="filter-wrapper">
			<input
				type="text"
				className="filter-input w33"
				placeholder="Enter title or description"
			/>
			<input
				type="text"
				className="filter-input w33"
				placeholder="Enter category"
			/>
			<div className="filter-btn-wrap w33">
				<button className="btn btn-primary">Search</button>
			</div>
		</div>
	);
}

export default Filter;
