import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default class SearchLot extends Component {
  state = {
    lotName: '',
    lotAddress: ''
  }

  render() {
    return (
      <div>
        <div className="p-inputgroup search-input--margin">
          <InputText
            placeholder="Item Name"
            onChange={(e) => this.setState({ lotName: e.target.value })}
          />
          <Button label="Search" onClick={this.props.searchData(this.state.lotName)} />
        </div>
        <div className="p-inputgroup search-input--margin">
          <InputText
            placeholder="Address"
            onChange={(e) => this.setState({ lotAddress: e.target.value })}
          />
          <Button label="Search" onClick={this.props.searchAddress(this.state.lotAddress)} />
        </div>
      </div>
    );
  }
}
