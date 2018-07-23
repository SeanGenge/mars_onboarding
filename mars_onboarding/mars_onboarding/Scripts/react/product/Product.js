import React from 'react';
import ReactDOM from 'react-dom';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';
import ProductModal from './ProductModal';
import { Grid, GridRow } from 'semantic-ui-react';

/* The main component that will hold all the other components */
class Product extends React.Component {
	constructor(props) {
		super(props);

		{/* showModal: toggles the modal on or off
		 *  modalState: The state the modal is in (add, edit or delete). Used for modal title and which callback to use
		 *  products: The list of products (From the database)
		 *  selectedProduct: The selected product when editing or deleting. This product is modified*/}
		this.state = {
			showModal: false,
			modalState: "none",
			products: [],
			selectedProduct: {}
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.setProduct = this.setProduct.bind(this);
		this.setModalState = this.setModalState.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.editProduct = this.editProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.saveProductToDatabase = this.saveProductToDatabase.bind(this);
		this.deleteProductFromDatabase = this.deleteProductFromDatabase.bind(this);
	}

	render() {
		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<AddProduct addProduct={this.addProduct} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<ProductTable products={this.state.products} editProduct={this.editProduct} deleteProduct={this.deleteProduct} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<ProductModal showModal={this.state.showModal} toggleModal={this.toggleModal} modalState={this.state.modalState} product={this.state.selectedProduct} setProduct={this.setProduct} saveToDatabase={this.saveProductToDatabase} deleteFromDatabase={this.deleteProductFromDatabase}/>
			</div>
		);
	}

	componentDidMount() {
		this.getProducts();
	}

	/* Gets the list of products from the database */
	getProducts() {
		$.get("/Products/GetProducts", (data) => {
			this.setState({
				products: data
			});
		});
	}
	
	/* Sets the selected product */
	setProduct(product) {
		let copyProduct = Object.assign({}, product);

		this.setState({
			selectedProduct: copyProduct
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
	addProduct() {
		this.setModalState("add");
		this.setProduct({});
		this.toggleModal();
	}

	/* Sets all the selected states when the edit button is clicked */
	editProduct(product) {
		this.setModalState("edit");
		this.setProduct(product);
		this.toggleModal();
	}

	/* Sets all the selected states when the delete button is clicked */
	deleteProduct(product) {
		this.setModalState("delete");
		this.setProduct(product);
		this.toggleModal();
	}

	/* Save the product to the database (add and edit) */
	saveProductToDatabase() {
		const product = this.state.selectedProduct;
		
		if (this.state.modalState == "add") {
			$.post("/Products/AddProduct", product, (data) => {
				this.getProducts();
			});
		}
		else if (this.state.modalState == "edit") {
			$.post("/Products/EditProduct", product, (data) => {
				this.getProducts();
			});
		}
		
		this.toggleModal();
	}

	/* Delete the product from the database */
	deleteProductFromDatabase() {
		const id = this.state.selectedProduct.Id;
		debugger;
		$.post("/Products/DeleteProduct/" + id, id, (data) => {
			this.getProducts();
		});

		this.toggleModal();
	}
}

ReactDOM.render(
	<Product />,
	document.getElementById('product')
);