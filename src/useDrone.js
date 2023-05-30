import { useCallback, useEffect, useMemo, useState } from 'react';
import { randomColor, randomName } from './util';

export default function useDrone() {
	const [member, setMember] = useState({
		name: randomName(),
		color: randomColor(),
	});
	const [connected, setConnected] = useState(false);
	const [isOpened, setIsOpened] = useState(false);
	const [error, setError] = useState(null);

	const drone = useMemo(
		() =>
			new window.Scaledrone('33BrfFVg4VjY6tox', {
				data: member,
			}),
		[],
	);

	const onOpen = useCallback(() => {
		member.id = drone.clientId;
		setIsOpened(true);
		setConnected(true);
	}, []);

	const onClose = useCallback(() => {
		setConnected(false);
	}, []);

	const onError = useCallback((error) => {
		setError(error);
	}, []);

	const onDisconnect = useCallback(() => {
		setConnected(false);
	}, []);

	const onReconnect = useCallback(() => {
		setConnected(true);
	}, []);

	useEffect(() => {
		drone.on('open', onOpen);
		drone.on('close', onClose);
		drone.on('error', onError);
		drone.on('disconnect', onDisconnect);
		drone.on('reconnect', onReconnect);
	}, [drone, onOpen, onClose, onError, onDisconnect, onReconnect]);

	return { isOpened, member, drone, connected, error };
}
