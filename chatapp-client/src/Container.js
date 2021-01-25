import { useEffect, useContext, useRef } from 'react';

import ChatList from './components/ChatList';
import ChatForm from './components/ChatForm';
import ColorPicker from './components/ColorPicker';

import ColorContext from './contexts/ColorContext';

import {
	initSocket,
	disconnectSocket,
	subscribeToChat,
	subscribeInitialMessages,
	getInitialColor,
	sendColorData,
	subscribeToColor
} from './socketService';

function Container() {
	const { colorData, setColorData, username, setUsername } = useContext(ColorContext);
	const colorRef = useRef(null);

	useEffect(() => {
		const name = window.prompt("Kullanıcı adın ne olsun", "ziyaretçi" + Math.random() * 2);
		setUsername(name);

		initSocket();

		getInitialColor((initColorData) => {
			setColorData(initColorData);
		});

		subscribeToColor((newColorData) => {
			console.log("new color", newColorData);
			setColorData(newColorData);
		});

		return () => {
			disconnectSocket();
		};
	}, []);

	/* 	useEffect(() => {
			if (!color) return;
			set
			sendColor({
				color,
				username
			});
		}, [color]); */

	function handleColorChange() {
		setColorData((currentState) => {
			return { person: "sen", color: colorRef.current.value };
		});
		sendColorData({
			color: colorRef.current.value,
			person: username
		});
	}

	const { color, person } = colorData;

	return (
		<div style={{ height: "100vh", backgroundColor: color, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
			<ColorPicker colorRef={colorRef} />
			<div>
				<button onClick={handleColorChange}>
					rengi değiştir
				</button>
			</div>
			<p>şu anki renk = {color} - rengi değiştiren kişi = {person}</p>
		</div>
	);
	/* const { setMessages } = useContext(ChatContext);

	useEffect(() => {
		initSocket();

		subscribeInitialMessages((data) => {
			setMessages(data);
		});

		subscribeToChat((message) => {
			setMessages((oldChats) => [...oldChats, { message }]);
		});

		return () => disconnectSocket();
	}, [setMessages]);

	return (
		<>
			<ChatList />
			<ChatForm />
		</>
	); */
}

export default Container;
