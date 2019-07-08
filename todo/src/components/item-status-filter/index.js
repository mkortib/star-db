import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  state = {
    filterName: ''
  }

  onFilterChange = (itms) => {
    this.props.onFilterChange(itms);
  }

  render() {
    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-info"
                onClick={() => onFilterChange('all')}
                >All</button>
        <button type="button"
                className="btn btn-outline-secondary"
                onClick={() => onFilterChange('active')}
                >Active</button>
        <button type="button"
                className="btn btn-outline-secondary"
                onClick={() => onFilterChange('done')}
                >Done</button>
      </div>
    );
  }
}
