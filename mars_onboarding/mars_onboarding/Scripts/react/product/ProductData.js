import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';

export default class ProductData extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const product = this.props.product;

		return (
			<Table.Row>
				<Table.Cell>{product.Name}</Table.Cell>
				<Table.Cell>{product.Price}</Table.Cell>
				<Table.Cell><button className='ui yellow button' onClick={() => this.props.editProduct(product)}>Edit</button></Table.Cell>
				<Table.Cell><button className='ui red button' onClick={() => this.props.deleteProduct(product)}>Delete</button></Table.Cell>
			</Table.Row>
		);
	}
}