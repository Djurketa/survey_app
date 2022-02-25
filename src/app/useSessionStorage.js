import { useState, useEffect } from "react";

function getSessionStorageOrDefault(key, defaultValue) {
	const stored = sessionStorage.getItem(key);
	if (!stored) {
		console.log("id", defaultValue);
		return defaultValue;
	}
	console.log("else", defaultValue);

	return JSON.parse(stored);
}

export function useSessionStorage(key, defaultValue) {
	const [value, setValue] = useState(
		getSessionStorageOrDefault(key, defaultValue)
	);

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
