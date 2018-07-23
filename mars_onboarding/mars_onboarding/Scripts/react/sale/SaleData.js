import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';

export default class SaleData extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const sale = this.props.sale;

		return (
			<Table.Row>
				<Table.Cell>{sale.DateSold}</Table.Cell>
				<Table.Cell>{sale.CustomerName}</Table.Cell>
				<Table.Cell>{sale.ProductName}</Table.Cell>
				<Table.Cell>{sale.StoreName}</Table.Cell>
				<Table.Cell><button className='ui yellow button' onClick={() => this.props.editSale(sale)}>Edit</button></Table.Cell>
				<Table.Cell><button className='ui red button' onClick={() => this.props.deleteSale(sale)}>Delete</button></Table.Cell>
			</Table.Row>
		);
	}
}