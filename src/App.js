import React from 'react';
import './App.css';
import RevenueChart from './component/revenue-chart';
import ProductChart from './component/product-chart';
import SKUChart from './component/sku-chart';
function App() {
  return (
    <div>
      <RevenueChart />
      <ProductChart />
      <SKUChart />
    </div>

  );
}
export default App;
