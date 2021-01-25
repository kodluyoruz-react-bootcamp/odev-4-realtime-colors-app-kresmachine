import "./App.css";

import { ColorProvider } from "./contexts/ColorContext";
import Container from "./Container";

function App() {
	return (
		<ColorProvider>
			<Container />
		</ColorProvider>
	)
}

export default App;
