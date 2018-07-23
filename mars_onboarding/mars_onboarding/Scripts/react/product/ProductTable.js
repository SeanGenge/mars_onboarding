import React from 'react';
import ReactDOM from 'react-dom';
import ProductData from './ProductData';
import { Table } from 'semantic-ui-react';

export default class ProductTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const products = this.props.products;

		return (
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Product Name</Table.HeaderCell>
						<Table.HeaderCell>Product Price</Table.HeaderCell>
						<Table.HeaderCell>Action (Edit)</Table.HeaderCell>
						<Table.HeaderCell>Action (Delete)</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{
						products.map(item => (
							<ProductData key={item.Id} product={item} editProduct={this.props.editProduct} deleteProduct={this.props.deleteProduct} />
						))
					}
				</Table.Body>
			</Table>
		);
	}
}