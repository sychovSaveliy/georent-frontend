import React from 'react';
import ItemList from './ItemListFile.JSON';
import Button from '../../elements/Button';

const itemList = ItemList.list;

const LotsList = (props) => {
  console.log(props);
  return (
    <div className="sidebar">
      <h1>Products Sidebar</h1>
      {itemList.map((item) => (
        <div key={item.itemCardID} className="CardWrapper">
          <img className="CardIMGStyle" src={item.itemImage} alt="" />
          <div className="ItemInfoWrapper">
            <div className="IfoContentAlign">
              <h2 className="CardHeader"><span>{item.itemName}.</span><span>{item.itemInformation}</span></h2>
              <p className="InfoStr">{item.itemDescription}</p>
              <div className="CardFooter">
                <div className="LocatIcon"></div>
                <span className="AdressWrapper">{item.itemAdress}</span>
                <span className="PriceItem">{item.itemPrice}<span>{item.itemPriceCurrency}</span>/day</span>
                <div className="CardButton"><Button text={'to rent'} active={'active'} /></div>
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default LotsList;
