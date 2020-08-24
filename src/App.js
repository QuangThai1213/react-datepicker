import React from 'react';
import './App.css';
import ProductChart from './component/product-chart';
import CategoryChart from './component/category-chart';
import OrderChart from './component/order-chart';
import RevenueChart from './component/revenue-chart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/revenue">Revenue</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/revenue">
            <RevenueChart />
          </Route>
          <Route path="/products">
            <ProductChart />
          </Route>
          <Route path="/orders">
            <OrderChart />
          </Route>
          <Route path="/categories">
            <CategoryChart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
