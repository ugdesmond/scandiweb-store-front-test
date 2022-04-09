import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import { CurrencyContext } from '../context/currency.context';
import { ShopCartContext } from '../context/shopCart.context';
import ProductInCart from "../components/ProductInCart";


class FullShopCart extends Component<any, any> {
  state = { showOverlay: false };

  static contextType = CurrencyContext;

  render() {
    const showOverlay = (state: boolean) => {
      this.setState({ showOverlay: state });
    }

    return (
      <ShopCartContext.Consumer>
        {({ products }) => {
          return (
            <div className="full-shop-div">
              <Header showOverlay={showOverlay} history={this.props.history}/>
              <div className="full-shop-container">
                {this.state.showOverlay && <div className="full-shop-overlay"/>}
                <div  className="product-block">
                  <div className="full-shop-cart">Cart</div>
                  {products.map((product) => (<ProductInCart product={product}/>))}
                </div>
              </div>
            </div>
          );
        }}
      </ShopCartContext.Consumer>
    );
  }
}

export default withRouter(FullShopCart);
