import React from 'react';
import ReactDOM from 'react-dom';
import StoreTable from './StoreTable';
import AddStore from './AddStore';
import StoreModal from './StoreModal';
import { Grid, GridRow } from 'semantic-ui-react';

/* The main component that will hold all the other components */
class Store extends React.Component {
	constructor(props) {
		super(props);

		{/* showModal: toggles the modal on or off
		 *  modalState: The state the modal is in (add, edit or delete). Used for modal title and which callback to use
		 *  stores: The list of stores (From the database)
		 *  selectedStore: The selected store when editing or deleting. This store is modified*/}
		this.state = {
			showModal: false,
			modalState: "none",
			stores: [],
			selectedStore: {}
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.setStore = this.setStore.bind(this);
		this.setModalState = this.setModalState.bind(this);
		this.addStore = this.addStore.bind(this);
		this.editStore = this.editStore.bind(this);
		this.deleteStore = this.deleteStore.bind(this);
		this.saveStoreToDatabase = this.saveStoreToDatabase.bind(this);
		this.deleteStoreFromDatabase = this.deleteStoreFromDatabase.bind(this);
	}

	render() {
		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<AddStore addStore={this.addStore} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<StoreTable stores={this.state.stores} editStore={this.editStore} deleteStore={this.deleteStore} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<StoreModal showModal={this.state.showModal} toggleModal={this.toggleModal} modalState={this.state.modalState} store={this.state.selectedStore} setStore={this.setStore} saveToDatabase={this.saveStoreToDatabase} deleteFromDatabase={this.deleteStoreFromDatabase} />
			</div>
		);
	}

	componentDidMount() {
		this.getStores();
	}

	/* Gets the list of stores from the database */
	getStores() {
		$.get("/Stores/GetStores", (data) => {
			this.setState({
				stores: data
			});
		});
	}

	/* Sets the selected store */
	setStore(store) {
		let copyStore = Object.assign({}, store);

		this.setState({
			selectedStore: copyStore
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
	addStore() {
		this.setModalState("add");
		this.setStore({});
		this.toggleModal();
	}

	/* Sets all the selected states when the edit button is clicked */
	editStore(store) {
		this.setModalState("edit");
		this.setStore(store);
		this.toggleModal();
	}

	/* Sets all the selected states when the delete button is clicked */
	deleteStore(store) {
		this.setModalState("delete");
		this.setStore(store);
		this.toggleModal();
	}

	/* Save the store to the database (add and edit) */
	saveStoreToDatabase() {
		const store = this.state.selectedStore;

		if (this.state.modalState == "add") {
			$.post("/Stores/AddStore", store, (data) => {
				this.getStores();
			});
		}
		else if (this.state.modalState == "edit") {
			$.post("/Stores/EditStore", store, (data) => {
				this.getStores();
			});
		}

		this.toggleModal();
	}

	/* Delete the store from the database */
	deleteStoreFromDatabase() {
		const id = this.state.selectedStore.Id;
		debugger;
		$.post("/Stores/DeleteStore/" + id, id, (data) => {
			this.getStores();
		});

		this.toggleModal();
	}
}

ReactDOM.render(
	<Store />,
	document.getElementById('store')
);