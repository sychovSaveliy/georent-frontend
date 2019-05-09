import React from 'react';
import Button from '../../elements/Button/Button';
import ItemList from './ItemListFile.JSON';
import './style.scss';

const ProductCardList = (props) => {
  const itemList = ItemList.list;
  const CardContent = props.itemList.map((item) => (
    <div key={itemList.id} className="CardWrapper">
      <img className="CardIMGStyle" src={item.itemImage} alt="" />
      <div className="ItemInfoWrapper">
        <h2 className="CardHeader"><span>{item.itemName}.</span><span>{item.itemInformation}</span></h2>
        <p className="InfoStr">{item.itemDescription}</p>
        <div>
          <div className="LocatIcon"></div>
          <span className="AdressWrapper">{item.itemAdress}</span>
          <span className="PriceItem">{item.itemPrice}<span>{item.itemPriceCurrency}</span>/day</span>
          <Button />
        </div>
      </div>
    </div>
  )
  );
  return (
    <div>
      {CardContent}
    </div>);
};

export default ProductCardList;
