import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { ChildDataProps, graphql, QueryControls } from '@apollo/client/react/hoc';
import Header from '../components/Header';
import { GET_STORE_DATA } from '../graphql/query';
import { capitalize } from "lodash";
import '../Assets/styles/home.css'
import { StoreData } from '../Utils/StoreInterfaces';
import Product from '../components/Product'
import { enums } from '../Utils/Helper';


interface MatchParams {
  category: string;
}

interface HomePageProps extends RouteComponentProps<MatchParams> {
  data: StoreData & QueryControls<StoreData, {}>
}

class HomePage extends Component<ChildDataProps<HomePageProps, StoreData, {}>> {
  state = { showOverlay: false };



  render() {
    const products = this.props?.data?.category?.products;
    const { category } = this.props.match.params;

    const showOverlay = (state: boolean) => {
      this.setState({ showOverlay: state });
    };

    let filteredProducts = products;


    if (category && category !== enums.Constant.all) {
      filteredProducts = products?.filter((product) => product?.category === category);
    }
   
    return (
      <div className="home-main-div">
        <Header showOverlay={showOverlay} category={category} history={this.props.history}/>
        <div className="home-container">
          {this.state.showOverlay && <div className="home-overlay" />}
          <div className="category-products">
            <div className="category-name">
              {capitalize(category)}</div>
            <div className="product-list product-list-align">
              {filteredProducts?.map((product) => (
                <Product key={product?.id} product={product!} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql<HomePageProps, StoreData, {}, {}>(GET_STORE_DATA)(HomePage);
