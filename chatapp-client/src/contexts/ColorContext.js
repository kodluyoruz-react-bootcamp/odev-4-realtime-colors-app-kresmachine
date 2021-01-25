import { createContext, useState } from "react";

const ColorContext = createContext(null);

export const ColorProvider = ({ children }) => {
	const [colorData, setColorData] = useState({});
	const [username, setUsername] = useState("ziyaretçi-" + Math.random() * 2);

	const values = {
		colorData,
		setColorData,
		username,
		setUsername,
	};

	return (
		<ColorContext.Provider value={values}>
			{children}
		</ColorContext.Provider>
	);
};

export default ColorContext;
