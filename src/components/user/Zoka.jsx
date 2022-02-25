import React from "react";
import { useState } from "react";

function Zoka({ data }) {
	const [nesto, setNesto] = useState("1");
	function func(e) {
		setNesto("lsjadlksjdlkajsd");
	}
	return (
		<div>
			<h1>{nesto}</h1>
			<button onClick={func}>dugme </button>
		</div>
	);
}

export default Zoka;
