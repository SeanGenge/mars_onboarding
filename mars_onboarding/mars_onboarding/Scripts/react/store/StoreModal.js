import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';

export default class StoreModal extends React.Component {
	constructor(props) {
		super(props);

		this.editStoreName = this.editStoreName.bind(this);
		this.editStoreAddress = this.editStoreAddress.bind(this);
	}

	render() {
		{ /* Important: Need to add style to fix the modals position. Not aligned without this */ }
		const store = this.props.store;
		let formTitle = this.props.modalState[0].toUpperCase() + this.props.modalState.slice(1) + " Store";
		let action = null;

		if (this.props.modalState == "delete") {
			action = <Button color='red' onClick={() => this.props.deleteFromDatabase()}>Delete</Button>
		}
		else {
			action = <Button color='red' onClick={() => this.props.saveToDatabase()}>Save</Button>
		}

		return (
			<Modal open={this.props.showModal} style={{top: 20 + '%', bottom: 'auto'}}>
				<Modal.Header>{formTitle}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label>Store Name</label>
							<input placeholder="Store Name" disabled={this.props.modalState == "delete"} onChange={this.editStoreName} value={store.Name || ''} />
						</Form.Field>

						<Form.Field>
							<label>Store Address</label>
							<input placeholder="Store Address" disabled={this.props.modalState == "delete"} onChange={this.editStoreAddress} value={store.Address || ''} />
						</Form.Field> 
					</Form>
				</Modal.Content>

				<Modal.Actions>
					<Button secondary onClick={() => this.props.toggleModal()}>Cancel</Button>
					{action}
				</Modal.Actions>
			</Modal>
		);
	}

	editStoreName(event) {
		let store = this.props.store;
		store.Name = event.target.value;
		
		this.props.setStore(store);
	}

	editStoreAddress(event) {
		let store = this.props.store;
		store.Address = event.target.value;

		this.props.setStore(store);
	}
}