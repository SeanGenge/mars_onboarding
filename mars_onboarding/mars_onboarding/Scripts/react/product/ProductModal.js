import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';

export default class ProductModal extends React.Component {
	constructor(props) {
		super(props);

		this.editProductName = this.editProductName.bind(this);
		this.editProductPrice = this.editProductPrice.bind(this);
	}

	render() {
		{ /* Important: Need to add style to fix the modals position. Not aligned without this */ }
		const product = this.props.product;
		let formTitle = this.props.modalState[0].toUpperCase() + this.props.modalState.slice(1) + " Product";
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
							<label>Product Name</label>
							<input placeholder="Product Name" disabled={this.props.modalState == "delete"} onChange={this.editProductName} value={product.Name || ''} />
						</Form.Field>

						<Form.Field>
							<label>Product Price</label>
							<input placeholder="Product Price" disabled={this.props.modalState == "delete"} onChange={this.editProductPrice} value={product.Price || ''} />
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

	editProductName(event) {
		let product = this.props.product;
		product.Name = event.target.value;
		
		this.props.setProduct(product);
	}

	editProductPrice(event) {
		let product = this.props.product;
		product.Price = event.target.value;

		this.props.setProduct(product);
	}
}