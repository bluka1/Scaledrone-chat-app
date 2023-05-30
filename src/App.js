import { useEffect, useState } from 'react';
import Input from './Input';
import Messages from './Messages';
import useDrone from './useDrone.js';
import useRoom from './useRoom.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
	const [messages, setMessages] = useState([]);
	const { isOpened, member, drone, connected, error } = useDrone();
	const { members, message } = useRoom(drone);

	useEffect(() => {
		if (message) {
			setMessages((prev) => [...prev, message]);
		}
	}, [message]);

	if (error) {
		return <h3>Error connecting to drone: {error}</h3>;
	}

	const sendMessageHandler = (message) => {
		const msg = { member: member, text: message };
		drone.publish({
			room: 'observable-chatApp',
			message: msg,
		});
	};

	return (
		<div className='app'>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			{!(isOpened && connected) ? (
				<h3>Connecting...</h3>
			) : (
				<>
					<div className='header'>Scaledrone Chat App</div>
					<Messages messages={messages} currentMember={member} />
					<Input onSendMessage={sendMessageHandler} />
				</>
			)}
		</div>
	);
}
