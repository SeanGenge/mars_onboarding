import React from 'react';
import ReactDOM from 'react-dom';
import SaleData from './SaleData';
import { Table } from 'semantic-ui-react';

export default class SaleTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const sales = this.props.sales;

		return (
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Date Sold</Table.HeaderCell>
						<Table.HeaderCell>Customer Name</Table.HeaderCell>
						<Table.HeaderCell>Product Name</Table.HeaderCell>
						<Table.HeaderCell>Store Name</Table.HeaderCell>
						<Table.HeaderCell>Action (Edit)</Table.HeaderCell>
						<Table.HeaderCell>Action (Delete)</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{
						sales.map(item => (
							<SaleData key={item.Id} sale={item} editSale={this.props.editSale} deleteSale={this.props.deleteSale} />
						))
					}
				</Table.Body>
			</Table>
		);
	}
}