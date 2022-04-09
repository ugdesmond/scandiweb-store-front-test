import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { GET_STORE_DATA } from '../graphql/query';

export const CurrencyContext = React.createContext({});

class CurrencyContextProvider extends Component<any, any> {
  state: any = {};

  constructor(props:any){
    super(props)

  }


  render() {
    return (
      <CurrencyContext.Provider value={{
        currency: this.state.currency || this.props?.data?.currencies?.[0].symbol,
        setCurrency: (newCurrency: string) => this.setState({ currency: newCurrency }),
        currencies: this.props?.data?.currencies || [],
      }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default graphql(GET_STORE_DATA)(CurrencyContextProvider);
