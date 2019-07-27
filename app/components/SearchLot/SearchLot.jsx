import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default class SearchLot extends Component {
  state = {
    lotName: '',
    lotAddress: ''
  }

  render() {
    const { searchData, searchAddress, styles } = this.props;
    return (
      <div className={styles.searchInputs}>
        <div className="p-inputgroup search-input--margin">
          <InputText
            placeholder="Item Name"
            onInput={(e) => this.setState({ lotName: e.target.value })}
          />
          <Button label="Search" onClick={() => searchData(this.state.lotName)} />
        </div>
        <div className="p-inputgroup search-input--margin">
          <InputText
            placeholder="Address"
            onInput={(e) => this.setState({ lotAddress: e.target.value })}
          />
          <Button label="Search" onClick={() => searchAddress(this.state.lotAddress)} />
        </div>
      </div>
    );
  }
}
