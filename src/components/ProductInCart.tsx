import React, { Component } from 'react';
import {ReactComponent as ArrowLeft} from "../Assets/images/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../Assets/images/arrow-right.svg";
import {values} from "lodash";
import {CurrencyContext} from "../context/currency.context";
import {ShopCartContext, ShopCartProduct} from '../context/shopCart.context';






interface ProductInCartProps {
  product: ShopCartProduct

}

class ProductInCart extends Component<ProductInCartProps>{
  static contextType = CurrencyContext;
  state = { mainPhotoIndex: 0 };

  changePhoto = (button: string) => {
    if (button === 'right') {
      if (this.state.mainPhotoIndex + 1 < this.props.product.photo.length) {
          this.setState({mainPhotoIndex: this.state.mainPhotoIndex + 1})
        } else {
          this.setState({mainPhotoIndex: 0})
        }
      }

    if (button === 'left'){
      if (this.state.mainPhotoIndex - 1 < 0) {
        this.setState({mainPhotoIndex: this.props.product.photo.length-1})
      } else {
        this.setState({mainPhotoIndex: this.state.mainPhotoIndex - 1})
      }
    }
  }

  render() {
    return (
      <ShopCartContext.Consumer>
        {({ addProduct, removeProduct }) => (
          <div key={this.props.product.id} className="product-in-cart-main">
            <div className="product-in-cart-info">
              <div className="product-in-cart-name">{this.props.product.id}</div>
              <div className="product-in-cart-price">{this.context.currency + this.props.product.price * this.props.product.quantity}</div>
              <div>
                {values(this.props.product?.selectedAttributes).map((attribute) => (
                  <div className="product-in-cart-attribute">{attribute}</div>))}
              </div>
            </div>
            <div className="cart-button-photo">
              <div className="cart-button-block">
                <div className="cart-button"
                  onClick={() => addProduct(this.props.product.id, this.props.product.selectedAttributes, this.props.product.allAttributes, this.props.product.price, this.props.product.photo)}
                >
                  +
                </div>
                <div className="cart-quantity" >{this.props.product?.quantity}</div>
                <div className="cart-button"
                  onClick={() => removeProduct(this.props.product.id, this.props.product.selectedAttributes, this.props.product.allAttributes, this.props.product.price, this.props.product.photo)}
                >
                  -
                </div>
              </div>
              <div className="cart-photo-block">
                <div className="arrow-cart-container">
                  <div  onClick={()=> this.changePhoto('left')} className="arrow-pointer">
                    <ArrowLeft />
                  </div >
                  <div  onClick={()=> this.changePhoto('right')}  className="arrow-pointer">
                    <ArrowRight />
                  </div >
                </div >
                <img  src={this.props.product.photo[this.state.mainPhotoIndex]}  className="cart-miniature"/>
              </div>
            </div>
          </div>
        )}
      </ShopCartContext.Consumer>
    );
  }
}

export default ProductInCart;
