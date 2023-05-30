export default function Messages({ messages, currentMember }) {
	const renderMessage = (message) => {
		const { member, text } = message.data;
		const messageFromMe = member.id === currentMember.id;
		const className = messageFromMe ? 'message currentMember' : 'message';

		return (
			<li className={className} key={message.id}>
				<span className='avatar' style={{ backgroundColor: member.color }} />
				<div className='message-content'>
					<div className='username'>{member.name}</div>
					<div className='text'>{text}</div>
				</div>
			</li>
		);
	};
	return (
		<ul className='messages'>
			{messages &&
				messages.length > 0 &&
				messages.map((msg) => renderMessage(msg))}
		</ul>
	);
}
