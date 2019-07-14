import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';

const LotsList = ({ styles, lots }) => (
  <div className={styles.lotsListContainer}>
    <h1>Lots list</h1>
    {lots.map((item) => (
      <div key={item.id} className={styles.CardWrapper}>
        <div className={styles.CardIMGStyle}>
          <img src={item.imageUrl} alt="" />
        </div>
        <div className={styles.ItemInfoWrapper}>
          <h2 className={styles.CardHeader}><span>{item.id}. </span><span>{item.lotName}</span></h2>
          <div className={styles.CardFooter}>
            <div className={styles.LocatIcon}></div>
            <div className={styles.AdressWrapper}>{item.address}</div>
            <div className={styles.PriceItem}>{item.price} грн/day</div>
            <div className={styles.CardButton}><Button text="to rent" active="active" /></div>
          </div>
        </div>
      </div>
    ))
    }
  </div>
);

LotsList.propTypes = {
  styles: PropTypes.object.isRequired,
  lots: PropTypes.array.isRequired,
};

export default LotsList;
