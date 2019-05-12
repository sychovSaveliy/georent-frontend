import React from 'react';
import Button from '../../elements/Button/Button';
import './style.scss';

const ProductCardList = (props) => {
  const CardContent = props.itemList.map((item) => (
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
            <div className="CardButton"><Button /></div>
          </div>
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
