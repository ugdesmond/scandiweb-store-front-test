import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import client from './Utils/Client';
import CurrencyContextProvider from './context/currency.context';
import ShopCartContext from './context/shopCart.context';
import FullProductInfo from './pages/FullProductInfo';
import FullShopCart from './pages/FullShopCart';



const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <CurrencyContextProvider>
          <ShopCartContext>
            <Switch>
              <Route path="/product" component={FullProductInfo} />
              <Route path="/shopcart" component={FullShopCart} />
              <Route exact  path="/:category" component={HomePage} />
              <Route  path="/" component={HomePage} />
            </Switch>
          </ShopCartContext>
        </CurrencyContextProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
