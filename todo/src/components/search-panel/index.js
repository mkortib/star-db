import React from 'react';

import './search-panel.css';

class SearchPanel extends React.Component {

  state = {
    inputVal:''
  }

  onInputChar = (e) => {
    this.setState({
      inputVal: e.target.value
    });
    this.props.onInputChar(e.target.value);
  }

  render() {

    // console.log(this.state.inputVal)
  
    return (

      <input type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={this.onInputChar} 
              value={this.state.inputVal}
      />
    )

  };
};

export default SearchPanel;
