import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';

export default class StoreData extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const store = this.props.store;

		return (
			<Table.Row>
				<Table.Cell>{store.Name}</Table.Cell>
				<Table.Cell>{store.Address}</Table.Cell>
				<Table.Cell><button className='ui yellow button' onClick={() => this.props.editStore(store)}>Edit</button></Table.Cell>
				<Table.Cell><button className='ui red button' onClick={() => this.props.deleteStore(store)}>Delete</button></Table.Cell>
			</Table.Row>
		);
	}
}