import React from 'react';
import ReactDOM from 'react-dom';
import SaleTable from './SaleTable';
import AddSale from './AddSale';
import SaleModal from './SaleModal';

/* The main component that will hold all the other components */
class Sale extends React.Component {
	constructor(props) {
		super(props);

		{/* showModal: toggles the modal on or off
		 *  modalState: The state the modal is in (add, edit or delete). Used for modal title and which callback to use
		 *  sales: The list of sales (From the database)
		 *  selectedSale: The selected sale when editing or deleting. This sale is modified*/}
		this.state = {
			showModal: false,
			modalState: "none",
			sales: [],
			customers: [],
			products: [],
			stores: [],
			selectedSale: {}
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.setSale = this.setSale.bind(this);
		this.setModalState = this.setModalState.bind(this);
		this.addSaleBtn = this.addSaleBtn.bind(this);
		this.editSaleBtn = this.editSaleBtn.bind(this);
		this.deleteSaleBtn = this.deleteSaleBtn.bind(this);
		this.databaseCallback = this.databaseCallback.bind(this);
	}

	render() {
		return (
			<div>
				<AddSale addSale={this.addSaleBtn} />
				<SaleTable sales={this.state.sales} editSale={this.editSaleBtn} deleteSale={this.deleteSaleBtn} />
				<SaleModal showModal={this.state.showModal} toggleModal={this.toggleModal} modalState={this.state.modalState} sale={this.state.selectedSale} customers={this.state.customers} products={this.state.products} stores={this.state.stores} setSale={this.setSale} databaseCallback={this.databaseCallback} />
			</div>
		);
	}

	componentDidMount() {
		this.getSales();
		this.getCustomers();
		this.getProducts();
		this.getStores();
	}

	/* Gets the list of sales from the database */
	getSales() {
		$.get("/ProductSolds/GetSales", (data) => {
			for (let i = 0; i < data.length; i++) {
				let date = new Date(parseInt(data[i].DateSold.substr(6)));
				data[i].DateSold = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
			}

			this.setState({
				sales: data
			});
		});
	}

	/* Gets the list of customers from the database */
	getCustomers() {
		$.get("/Customers/GetCustomers", (data) => {
			this.setState({
				customers: data
			});
		});
	}

	/* Gets the list of products from the database */
	getProducts() {
		$.get("/Products/GetProducts", (data) => {
			this.setState({
				products: data
			});
		});
	}

	/* Gets the list of stores from the database */
	getStores() {
		$.get("/Stores/GetStores", (data) => {
			this.setState({
				stores: data
			});
		});
	}

	/* Sets the selected sale */
	setSale(sale) {
		let copySale = Object.assign({}, sale);

		this.setState({
			selectedSale: copySale
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
	addSaleBtn() {
		this.setModalState("add");
		this.setSale({});
		this.toggleModal();
	}

	/* Sets all the selected states when the edit button is clicked */
	editSaleBtn(sale) {
		this.setModalState("edit");
		this.setSale(sale);
		this.toggleModal();
	}

	/* Sets all the selected states when the delete button is clicked */
	deleteSaleBtn(sale) {
		this.setModalState("delete");
		this.setSale(sale);
		this.toggleModal();
	}

	/* Modify the database (add, edit and delete) */
	databaseCallback() {
		const sale = this.state.selectedSale;

		if (this.state.modalState == "add") {
			debugger;
			$.post("/ProductSolds/AddSale", sale, (data) => {
				this.getSales();
			});
		}
		else if (this.state.modalState == "edit") {
			$.post("/ProductSolds/EditSale", sale, (data) => {
				this.getSales();
			});
		}
		else if (this.state.modalState == "delete") {
			const id = this.state.selectedSale.Id;

			$.post("/ProductSolds/DeleteSale/" + id, id, (data) => {
				this.getSales();
			});
		}

		this.toggleModal();
	}
}

ReactDOM.render(
	<Sale />,
	document.getElementById('sale')
);