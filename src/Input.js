import { useState } from 'react';

export default function Input(props) {
	const [inputValue, setInputValue] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		props.onSendMessage(inputValue);
		setInputValue('');
	};

	return (
		<form onSubmit={submitHandler}>
			<input
				type='text'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button>Send</button>
		</form>
	);
}
