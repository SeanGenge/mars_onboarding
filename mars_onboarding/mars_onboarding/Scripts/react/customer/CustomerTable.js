import React from 'react';
import ReactDOM from 'react-dom';
import CustomerData from './CustomerData';
import style from '../styles/customer.css';

export default class CustomerTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const customers = this.props.customers;

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Customer Name</th>
							<th>Customer Address</th>
							<th>Action (Edit)</th>
							<th>Action (Delete)</th>
						</tr>
					</thead>

					<tbody>
						{
							customers.map(item => (
								<CustomerData key={item.Id} customer={item} editCustomer={this.props.editCustomer} deleteCustomer={this.props.deleteCustomer} />
							))
						}
					</tbody>
				</table>
			</div>
		);
	}
}