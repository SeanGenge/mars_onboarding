import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';

export default class AddProduct extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Button color="green" onClick={() => this.props.addProduct()}>Add Product</Button>
			</div>
		);
	}
}