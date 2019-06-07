import React from 'react';
import Button from '../../elements/Button/Button';
import './style.scss';

const ProductCardList = (props) => {
  const CardContent = props.itemList.map((item) => (
    <div key={item.itemCardID} className="cardWrapper">
      <img className="cardIMGStyle" src={item.itemImage} alt="" />
      <div className="itemInfoWrapper">
        <div className="ifoContentAlign">
          <h2 className="cardHeader"><span>{item.itemName}.</span><span>{item.itemInformation}</span></h2>
          <p className="infoStr">{item.itemDescription}</p>
          <div className="cardFooter">
            <div className="locationIcon"></div>
            <span className="addressWrapper">{item.itemAddress}</span>
            <span className="priceItem">{item.itemPrice}<span>{item.itemPriceCurrency}</span>/day</span>
            <div className="cardButton"><Button text={'to rent'} active={'active'} /></div>
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
