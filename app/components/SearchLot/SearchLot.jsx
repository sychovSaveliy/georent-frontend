import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';

export default class SearchLot extends Component {
  state = {
    lotName: '',
    lotAddress: ''
  }

  render() {
    const {searchData, searchAddress, setFlag, styles, andOr} = this.props;
    return (
      <div>
        <div className="p-inputgroup search-input--margin">
          <InputText
            placeholder="Item Name"
            onInput={(e) => this.setState({lotName: e.target.value})}
          />
          <Button label="Search" onClick={() =>
            andOr ? searchData(this.state.lotName, this.state.lotAddress) : searchData(this.state.lotName, '')}
          />
        </div>
        <div className="p-inputgroup search-input--margin">
          <InputText
            placeholder="Address"
            onInput={(e) => this.setState({lotAddress: e.target.value})}
          />
          <Button label="Search" onClick={() =>
            andOr ? searchData(this.state.lotName, this.state.lotAddress) : searchData('', this.state.lotAddress)}
          />
        </div>
        <div className={styles.checkboxWrapper}>
          <span className={styles.checkBoxLabel}>Search with Name and Address</span>
          <Checkbox onChange={e => setFlag(e.checked)} checked={andOr}/>
        </div>
      </div>
    );
  }
}
