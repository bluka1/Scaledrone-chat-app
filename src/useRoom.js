import { useCallback, useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export default function useRoom(drone) {
	const [members, setMembers] = useState([]);
	const [message, setMessage] = useState();

	const room = useMemo(() => drone.subscribe('observable-chatApp'), [drone]);

	const onMembers = useCallback(
		(members) => {
			setMembers(members);
		},
		[setMembers],
	);

	const onMemberJoin = useCallback(
		(member) => {
			console.log(member);
			toast(`${member.clientData.name} joined!`, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
			setMembers((prevState) => [...prevState, member]);
		},
		[setMembers],
	);

	const onMemberLeave = useCallback(
		(member) => {
			toast(`${member.clientData.name} left!`, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
			setMembers((prevState) => prevState.filter((m) => m.id !== member.id));
		},
		[setMembers],
	);

	const onMessage = useCallback((message) => {
		setMessage(message);
	}, []);

	useEffect(() => {
		room.on('members', onMembers);
		room.on('member_join', onMemberJoin);
		room.on('member_leave', onMemberLeave);
		room.on('message', onMessage);
	}, [room, onMembers, onMemberJoin, onMemberLeave, onMessage]);

	return { members, message };
}
