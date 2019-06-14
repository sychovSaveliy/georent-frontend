import React from 'react';
import PropTypes from 'prop-types';
import ItemList from './mock/ItemListFile.JSON';
import Button from '../../elements/Button';

const itemList = ItemList.list;

const LotsList = ({ styles }) => (
  <div className={styles.lotsListContainer}>
    <h1>Products Sidebar</h1>
    {itemList.map((item) => (
      <div key={item.itemCardID} className={styles.CardWrapper}>
        <div className={styles.CardIMGStyle}>
          <img src={item.itemImage} alt="" />
        </div>
        <div className={styles.ItemInfoWrapper}>
          <h2 className={styles.CardHeader}><span>{item.itemName}.</span><span>{item.itemInformation}</span></h2>
          <p className={styles.InfoStr}>{item.itemDescription}</p>
          <div className={styles.CardFooter}>
            <div className={styles.LocatIcon}></div>
            <span className={styles.AdressWrapper}>{item.itemAdress}</span>
            <span className={styles.PriceItem}>{item.itemPrice}<span>{item.itemPriceCurrency}</span>/day</span>
            <div className={styles.CardButton}><Button text="to rent" active="active" /></div>
          </div>
        </div>
      </div>
    ))
    }
  </div>
);

LotsList.propTypes = {
  styles: PropTypes.object.isRequired
};

export default LotsList;
