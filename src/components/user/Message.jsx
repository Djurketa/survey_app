import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../slices/surveySlice";

function Message(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(function () {
			dispatch(setMessage(""));
		}, props.time || 2000);
	}, []);

	return <div className="error">{props.msg}</div>;
}

export default Message;
