import React, { Component } from 'react';
import { ChildDataProps, graphql, QueryControls } from '@apollo/client/react/hoc';
import { RouteComponentProps } from 'react-router-dom';
import { sanitize } from 'dompurify'
import { CurrencyContext } from '../context/currency.context';
import Header from '../components/Header';
import { GET_STORE_DATA } from '../graphql/query';
import { Attribute } from '../components/Attribute';
import { StoreData, ProductModel as Product } from '../Utils/StoreInterfaces';
import { ShopCartContext } from '../context/shopCart.context';
import { getPrice } from '../Utils/Helper';
import { compact } from "lodash";



const fixProductName = (str: string) => str.slice(1).split('%20').join(' ');

interface FullProductInfoProps {
  data: StoreData & QueryControls<StoreData, {}>
}

class FullProductInfo extends Component<ChildDataProps<RouteComponentProps<{}> & FullProductInfoProps, StoreData, {}>> {
  static contextType = CurrencyContext;

  state = { showOverlay: false, selectedAttributes: {} as any, mainPhoto: null };

  render() {
    const allProducts = this.props?.data?.category?.products;

    if (!allProducts) {
      return null;
    }

    const product = fixProductName(this.props.history.location.search);
    // @ts-ignore
    const productInfo: Product | null = allProducts.find((oneProduct) => oneProduct?.name === product);
    const photo = this.state.mainPhoto || productInfo?.gallery?.[0];

    const showOverlay = (state: boolean) => {
      this.setState({ showOverlay: state });
    };

    const price = getPrice(productInfo?.prices!, this.context.currency);

    return (
      <ShopCartContext.Consumer>
        {({ addProduct }) => (
          <div className="product-info-main">
            <Header showOverlay={showOverlay} history={this.props.history} />
            <div className="product-info-container">
              {this.state.showOverlay && <div className="product-info-overlay" />}
              <div className="product-info">
                <div className="product-info-all-iamges">
                  <div className="product-info-miniature">
                    {
                      productInfo?.gallery?.map((minPhoto: string | null) => (
                        <div key={minPhoto}>
                          <img src={minPhoto!} onClick={() => this.setState({ mainPhoto: minPhoto })} className="product-info-image-min image-min " />
                        </div>
                      ))
                    }
                  </div>
                  <div className="main-photo-product-info">
                    <div>
                      <img alt="main" src={photo!} className="product-info-photo" />
                    </div>
                  </div>
                </div>
                <div className="info-detail">
                  <div className="product-name">{productInfo?.name}</div>
                  {productInfo?.attributes?.map((attribute: any) => (
                    <Attribute
                      key={attribute!.id}
                      onAttributeSelect={(attributeItem) => {
                        this.setState({
                          selectedAttributes: {
                            ...this.state.selectedAttributes,
                            [attribute!.id]: attributeItem,
                          },
                        });
                      }}
                      selectedAttribute={this.state.selectedAttributes[attribute!.id]}
                      attribute={attribute!}
                    />
                  ))}
                  <div className="product-price-info">
                    <div className="product-info-word">PRICE: </div>
                    <div className="product-info-amount" >{`${this.context.currency} ${price?.toString()}`}</div >
                  </div>
                  <div
                    className="product-info-add-to-cart info-cart-hover"
                    onClick={() => {
                      addProduct(productInfo?.name!, this.state.selectedAttributes, productInfo?.attributes, productInfo?.prices, compact(productInfo?.gallery));
                    }}
                  >
                    ADD TO CART
                  </div>
                  
                  <div dangerouslySetInnerHTML={{ __html: sanitize(productInfo?.description!) }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </ShopCartContext.Consumer>
    );
  }
}

export default graphql<RouteComponentProps<{}> & FullProductInfoProps, StoreData, {}, {}>(GET_STORE_DATA)(FullProductInfo);
