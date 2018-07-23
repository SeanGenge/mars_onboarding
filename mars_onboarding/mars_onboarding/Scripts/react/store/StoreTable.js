import React from 'react';
import ReactDOM from 'react-dom';
import StoreData from './StoreData';
import { Table } from 'semantic-ui-react';

export default class StoreTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const stores = this.props.stores;

		return (
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Store Name</Table.HeaderCell>
						<Table.HeaderCell>Store Address</Table.HeaderCell>
						<Table.HeaderCell>Action (Edit)</Table.HeaderCell>
						<Table.HeaderCell>Action (Delete)</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{
						stores.map(item => (
							<StoreData key={item.Id} store={item} editStore={this.props.editStore} deleteStore={this.props.deleteStore} />
						))
					}
				</Table.Body>
			</Table>
		);
	}
}