import React from 'react';
import ReactDOM from 'react-dom';
import CustomerTable from './CustomerTable';
import AddCustomer from './AddCustomer';
import CustomerModal from './CustomerModal';

/* The main component that will hold all the other components */
class Customer extends React.Component {
	constructor(props) {
		super(props);

		{/* showModal: toggles the modal on or off
		 *  modalState: The state the modal is in (add, edit or delete). Used for modal title and which callback to use
		 *  customers: The list of customers (From the database)
		 *  selectedCustomer: The selected customer when editing or deleting. This customer is modified*/}
		this.state = {
			showModal: false,
			modalState: "none",
			customers: [],
			selectedCustomer: {}
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.setCustomer = this.setCustomer.bind(this);
		this.setModalState = this.setModalState.bind(this);
		this.addCustomerBtn = this.addCustomerBtn.bind(this);
		this.editCustomerBtn = this.editCustomerBtn.bind(this);
		this.deleteCustomerBtn = this.deleteCustomerBtn.bind(this);
		this.databaseCallback = this.databaseCallback.bind(this);
	}

	render() {
		return (
			<div>
				<AddCustomer addCustomer={this.addCustomerBtn} />
				<CustomerTable customers={this.state.customers} editCustomer={this.editCustomerBtn} deleteCustomer={this.deleteCustomerBtn} />
				<CustomerModal showModal={this.state.showModal} toggleModal={this.toggleModal} modalState={this.state.modalState} customer={this.state.selectedCustomer} setCustomer={this.setCustomer} databaseCallback={this.databaseCallback}/>
			</div>
		);
	}

	componentDidMount() {
		this.getCustomers();
	}

	/* Gets the list of customers from the database */
	getCustomers() {
		$.get("/Customers/GetCustomers", (data) => {
			this.setState({
				customers: data
			});
		});
	}
	
	/* Sets the selected customer */
	setCustomer(customer) {
		let copyCustomer = Object.assign({}, customer);

		this.setState({
			selectedCustomer: copyCustomer
		});
	}

	/* Toggles the modal on or off */
	toggleModal() {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	/* Sets the state of the modal */
	setModalState(newModalState) {
		this.setState({
			modalState: newModalState
		});
	}

	/* Sets all the selected states when the add button is clicked */
	addCustomerBtn() {
		this.setModalState("add");
		this.setCustomer({});
		this.toggleModal();
	}

	/* Sets all the selected states when the edit button is clicked */
	editCustomerBtn(customer) {
		this.setModalState("edit");
		this.setCustomer(customer);
		this.toggleModal();
	}

	/* Sets all the selected states when the delete button is clicked */
	deleteCustomerBtn(customer) {
		this.setModalState("delete");
		this.setCustomer(customer);
		this.toggleModal();
	}

	/* Modify the database (add, edit and delete) */
	databaseCallback() {
		const customer = this.state.selectedCustomer;
		
		if (this.state.modalState == "add") {
			$.post("/Customers/AddCustomer", customer, (data) => {
				this.getCustomers();
			});
		}
		else if (this.state.modalState == "edit") {
			$.post("/Customers/EditCustomer", customer, (data) => {
				this.getCustomers();
			});
		}
		else if (this.state.modalState == "delete") {
			const id = this.state.selectedCustomer.Id;

			$.post("/Customers/DeleteCustomer/" + id, id, (data) => {
				this.getCustomers();
			});
		}
		
		this.toggleModal();
	}
}

ReactDOM.render(
	<Customer />,
	document.getElementById('customer')
);