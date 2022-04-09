import React, { Component, } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CurrencyContext } from '../context/currency.context';
import { getPrice } from '../Utils/Helper';
import { ProductModel } from '../Utils/StoreInterfaces';




interface ProductProps {
  product: ProductModel
}
class Product extends Component<RouteComponentProps<{}> & ProductProps>  {
  static contextType = CurrencyContext;

  render() {
    const productInfo = this.props?.product;
    let price = null;
    const available = productInfo?.inStock;

    price = getPrice(productInfo.prices, '$');

    return (
      <div style={{ paddingTop: 25 }} >
        <div className="product-main-div product-div" onClick={() => {
          this.props.history.push(`/product?${productInfo.name}`);
        }
        }
        >
          <div className="image-container">
            <img src={productInfo?.gallery?.[0]!} className="image-style" />
            {!available && <div className="show-out-of-stock"> Out of stock</div>}
          </div>
          <p style={{ paddingTop: 25 }}>{productInfo.name}</p>
          <p style={{ margin: 0, fontWeight: '500' }} >{`${this.context.currency} ${price?.toString()}`}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
