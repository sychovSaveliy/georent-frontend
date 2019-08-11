import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const LotsList = ({ styles, lots }) => (
  <div className={styles.lotsListContainer}>
    <h1>Lots list</h1>
    {lots.map((item) => (
        <div key={item.id} className={styles.CardWrapper}>
          <div className={styles.CardIMGStyle}>
            {item.imageUrl ? <img src={item.imageUrl || item.description.urls[0]} alt=""/> : ''}
          </div>
          <div className={styles.ItemInfoWrapper}>
            <h2 className={styles.CardHeader}><span>{item.id}. </span><Link
              to={`/user/lot/${item.id}`}>{item.lotName || item.description.lotName}</Link></h2>
            <div className={styles.CardFooter}>
              <div className={styles.LocatIcon}></div>
              <div className={styles.AdressWrapper}>{item.address}</div>
              <div className={styles.PriceItem}>{item.price} $/day</div>
              <div className={styles.CardButton}>
                <Button
                  label='to rent'
                  type="button"
                  className="btn"
                />
              </div>
            </div>
          </div>
        </div>
      )
    )
    }
  </div>
);

LotsList.propTypes = {
  styles: PropTypes.object.isRequired,
  lots: PropTypes.array.isRequired,
};

export default LotsList;
