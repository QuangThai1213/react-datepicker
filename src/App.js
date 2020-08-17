import React from 'react';
import './App.css';
import RevenueChart from './component/revenue-chart';
import ProductChart from './component/product-chart';
import SKUChart from './component/sku-chart';
import CategoryChart from './component/category-chart';
function App() {
  return (
    <div>
      <RevenueChart />
      <ProductChart />
      <SKUChart />
      <CategoryChart />
    </div>

  );
}
export default App;
