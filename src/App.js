
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn,updateCart } from './actions';
import { useEffect } from 'react';
// import authReducer from './reducers/auth.reducer';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    //if not authenticate user then have to login
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  
//below when reload the cart data lost hence doing this.When reload then this root component load first
useEffect(()=>{
  console.log('App.js - updateCart')
  dispatch(updateCart());
},[auth.authenticate]);

  return (
    <div className="App">
      {/* <HomePage/> */}
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage}/>
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
