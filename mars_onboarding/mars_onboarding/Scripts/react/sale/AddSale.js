import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';

export default class AddSale extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Button color="green" onClick={() => this.props.addSale()}>Add Sale</Button>
			</div>
		);
	}
}