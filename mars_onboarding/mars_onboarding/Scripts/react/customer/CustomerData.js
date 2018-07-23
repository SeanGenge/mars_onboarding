import React from 'react';
import ReactDOM from 'react-dom';

export default class CustomerData extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const customer = this.props.customer;

		return (
			<tr>
				<td>{customer.Name}</td>
				<td>{customer.Address}</td>
				<td><button className='ui yellow button' onClick={() => this.props.editCustomer(customer)}>Edit</button></td>
				<td><button className='ui red button' onClick={() => this.props.deleteCustomer(customer)}>Delete</button></td>
			</tr>
		);
	}
}