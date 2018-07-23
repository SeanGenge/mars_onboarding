import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import StoreData from '../store/StoreData';

export default class SaleModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			customerDropdown: [],
			productDropdown: [],
			storeDropdown: [],
			customerValue: '',
			productValue: '',
			storeValue: '',
			dateSoldValue: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// Converts the list of customers, products and stores into a drop down friendly array of objects
		let customers = nextProps.customers.map((item) => ({ key: item.Id, value: item.Name, text: item.Name }));
		let products = nextProps.products.map((item) => ({ key: item.Id, value: item.Name, text: item.Name }));
		let stores = nextProps.stores.map((item) => ({ key: item.Id, value: item.Name, text: item.Name }));
		// The values are used to bind the drop down lists to the names in the sale object
		// Make sure to update the names in the sale object (state) in order to update the drop down
		let cValue = nextProps.sale.CustomerName;
		let pValue = nextProps.sale.ProductName;
		let sValue = nextProps.sale.StoreName;
		let dsValue = nextProps.sale.DateSold;
		 
		 this.setState({
			 customerDropdown: customers,
			 productDropdown: products,
			 storeDropdown: stores,
			 customerValue: cValue,
			 productValue: pValue,
			 storeValue: sValue,
			 dateSoldValue: dsValue
		 });
	}

	render() {
		{ /* Important: Need to add style to fix the modals position. Not aligned without this */ }
		const sale = this.props.sale;
		let formTitle = this.props.modalState[0].toUpperCase() + this.props.modalState.slice(1) + " Sale";
		let sendText = "";
		// Easier way to get all the required variables from the state (no need to individually initialize each one)
		const { customerDropdown, productDropdown, storeDropdown, customerValue, productValue, storeValue, dateSoldValue } = this.state;

		if (this.props.modalState == "delete") {
			sendText = "Delete";
		}
		else {
			sendText = "Save";
		}
		

		return (
			<Modal open={this.props.showModal} style={{ top: 20 + '%', bottom: 'auto', overflow: 'visible' }}>
				<Modal.Header>{formTitle}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Select disabled={this.props.modalState == "delete"} label="Customer" options={customerDropdown} value={customerValue} placeholder="Select Customer" onChange={(e, { value }, id) => this.handleChange(e, value, "customer")} />
						<Form.Select disabled={this.props.modalState == "delete"} label="Product" options={productDropdown} value={productValue} placeholder="Select Product" onChange={(e, { value }, id) => this.handleChange(e, value, "product")} />
						<Form.Select disabled={this.props.modalState == "delete"} label="Store" options={storeDropdown} value={storeValue} placeholder="Select Store" onChange={(e, { value }, id) => this.handleChange(e, value, "store")} />
						<Form.Input disabled={this.props.modalState == "delete"} label="Date Sold" placeholder="MM/DD/YYYY" value={dateSoldValue} onChange={(e, { value }, id) => this.handleChange(e, value, "dateSold")} />
					</Form>
				</Modal.Content>

				<Modal.Actions>
					<Button secondary onClick={() => this.props.toggleModal()}>Cancel</Button>
					<Button color='red' onClick={() => this.props.databaseCallback()}>{sendText}</Button>
				</Modal.Actions>
			</Modal>
		);
	}

	handleChange(event, value, id) {
		let sale = this.props.sale;
		
		if (id == 'customer') {
			// The id of the selected customer
			const cId = this.state.customerDropdown.find(item => item.value == value).key;

			// Update the id and the name of the selected customer
			sale.CustomerId = cId;
			sale.CustomerName = value;
			this.props.setSale(sale);
		}
		else if (id == 'product') {
			const pId = this.state.productDropdown.find(item => item.value == value).key;

			sale.ProductId = pId;
			sale.ProductName = value;
			this.props.setSale(sale);
		}
		else if (id == 'store') {
			const sId = this.state.storeDropdown.find(item => item.value == value).key;

			sale.StoreId = sId;
			sale.StoreName = value;
			this.props.setSale(sale);
		}
		else if (id == 'dateSold') {
			sale.DateSold = value;
			this.props.setSale(sale);
		}
	}
}