import React, { Component } from 'react'
import { PlanetDetails, PlanetList } from '../sw-components';
import Row from '../row'
import { withRouter } from 'react-router-dom';

const PlanetPage = ({ history, match }) => {

		const { id } = match.params;

		return (
			<Row
				left={ <PlanetList onItemSelected={ (id) => history.push(id)  } />}
				right={ <PlanetDetails itemId={ id } /> }
			/>
		)
}

export default withRouter(PlanetPage);