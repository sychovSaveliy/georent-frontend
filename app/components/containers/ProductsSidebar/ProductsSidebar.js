import React from 'react';
import './style.scss';
import ProductCardList from '../ProductCard/ProductCardList';
import ItemList from '../ProductCard/ItemListFile.JSON';

const itemList = ItemList.list;

const ProductsSidebar = () => (
  <aside className="sidebar">
    <h1>Products Sidebar</h1>
    <ProductCardList itemList={itemList} />
  </aside>
);

export default ProductsSidebar;
