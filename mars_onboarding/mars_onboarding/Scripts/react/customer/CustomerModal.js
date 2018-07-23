import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';

export default class CustomerModal extends React.Component {
	constructor(props) {
		super(props);

		this.editCustomerName = this.editCustomerName.bind(this);
		this.editCustomerAddress = this.editCustomerAddress.bind(this);
	}

	render() {
		{ /* Important: Need to add style to fix the modals position. Not aligned without this */ }
		const customer = this.props.customer;
		let formTitle = this.props.modalState[0].toUpperCase() + this.props.modalState.slice(1) + " Customer";
		let sendText = "";

		if (this.props.modalState == "delete") {
			sendText = "Delete";
		}
		else {
			sendText = "Save";
		}

		return (
			<Modal open={this.props.showModal} style={{top: 20 + '%', bottom: 'auto'}}>
				<Modal.Header>{formTitle}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label>Customer Name</label>
							<input placeholder="Customer Name" disabled={this.props.modalState == "delete"} onChange={this.editCustomerName} value={customer.Name || ''} />
						</Form.Field>

						<Form.Field>
							<label>Customer Address</label>
							<input placeholder="Customer Address" disabled={this.props.modalState == "delete"} onChange={this.editCustomerAddress} value={customer.Address || ''} />
						</Form.Field> 
					</Form>
				</Modal.Content>

				<Modal.Actions>
					<Button secondary onClick={() => this.props.toggleModal()}>Cancel</Button>
					<Button color='red' onClick={() => this.props.databaseCallback()}>{sendText}</Button>
				</Modal.Actions>
			</Modal>
		);
	}

	editCustomerName(event) {
		let customer = this.props.customer;
		customer.Name = event.target.value;
		
		this.props.setCustomer(customer);
	}

	editCustomerAddress(event) {
		let customer = this.props.customer;
		customer.Address = event.target.value;

		this.props.setCustomer(customer);
	}
}