import React, { Component } from 'react';
import { values } from 'lodash';
import { withRouter } from 'react-router-dom';
import { ShopCartContext } from '../context/shopCart.context';
import { CurrencyContext } from '../context/currency.context';



class ShopCartMini extends Component<any, any> {
  static contextType = CurrencyContext;

  render() {
    return (
      <ShopCartContext.Consumer>
        {
        ({ addProduct, removeProduct, products }) => (
          <div className="shop-mini-main-container">
            <div className="content-container">
              <div className="text-style">
                <p className="shop-bag">My bag </p>
                {' '}
                <p >
                  ,
                  {products.length}
                  {' '}
                  items
                </p>
              </div>
              <div className="all-products">
                {products.map((product) => (
                  <div key={product?.id + product.photo} className="shop-product">
                    <div className="product-info" style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <div>
                      <div className="name-product">{product?.id}</div >
                      <div className="amount-product">{this.context.currency + product?.price.toString()}</div>
                      <div className="attribute-set">
                        {values(product?.selectedAttributes).map((attribute) => (<div key={attribute} className="attribute-cart">{attribute}</div>))}
                      </div>
                    
                      </div>
                    
                      <div className="button-shop" style={{marginLeft:10}}>
                      <div className="button-block">
                        <div className="shop-button"
                          onClick={() => addProduct(product.id, product.selectedAttributes, product.allAttributes, product.price, product.photo)}
                        >
                          +
                        </div>
                        <div className="shop-quantity" >{product?.quantity}</div>
                        <div className="shop-button"
                          onClick={() => removeProduct(product.id, product.selectedAttributes, product.allAttributes, product.price, product.photo)}
                        >
                          -
                        </div>
                      </div>
                      <div>
                        <img src={product?.photo[0]} className="miniatue"/>
                      </div>
                    </div>
                     
                    </div>
                   
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <div className="shop-bag">Total: </div>
                <p className="total-amount-cart">
                  {this.context.currency + products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2).toString()}
                </p>
              </div>
            </div>
            <div className="checkout-button">
              <button className="view-bag" onClick={() => this.props.history.push('/shopcart') }>VIEW BAG</button>
              <button className="check-out">CHECK OUT</button>
            </div>
          </div>
        )
      }
      </ShopCartContext.Consumer>
    );
  }
}

export default withRouter(ShopCartMini);
