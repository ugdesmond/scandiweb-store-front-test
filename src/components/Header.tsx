import React, { Component } from 'react';
import { ChildDataProps, graphql } from '@apollo/client/react/hoc';

import { ReactComponent as LogoImage } from '../Assets/images/logo.svg';
import { ReactComponent as ArrowDown } from '../Assets/images/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../Assets/images/arrow-up.svg';
import { ReactComponent as ShopCartImage } from '../Assets/images/shop-cart.svg';
import { CurrencyContext } from '../context/currency.context';
import { ShopCartContext } from '../context/shopCart.context';
import ShopCardMini from './ShopCartMini';
import { GET_STORE_DATA } from '../graphql/query';
import { StoreData } from '../Utils/StoreInterfaces';
import ItemCategory from './ItemCategory';
//  import { browserHistory } from 'react-router'
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;


interface HeaderProps {
    showOverlay: (state: boolean) => void
    category?: string
    history?: any
}
interface CurrencyProps {
    label?: string
    symbol?: string
}

class Header extends Component<ChildDataProps<HeaderProps, StoreData, {}>> {
    currencyWrapperRef: React.RefObject<HTMLDivElement>;

    shopCardWrapperRef: React.RefObject<HTMLDivElement>;

    state = { currencySwitcherOpen: false, shopCardSwitchOpen: false };

    static contextType = CurrencyContext;

    constructor(props: any) {
        super(props);

        this.currencyWrapperRef = React.createRef();
        this.shopCardWrapperRef = React.createRef();
    }

    handleClickOutside = (event: any) => {
        if (!this.currencyWrapperRef.current?.contains(event.target)) {
            this.setState({ currencySwitcherOpen: false });
        }

        if (!this.shopCardWrapperRef.current?.contains(event.target)) {
            this.setState({ shopCardSwitchOpen: false });
            this.props.showOverlay(false);
        }
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {

        const currencies = this.context?.currencies;
        const categoriesNames = this.props.data.categories || [];
       
        

        return (
            <ShopCartContext.Consumer>
                {
                    ({ products }) => {
                        return (
                            <div className="header-container">
                                <div className="categories-header">
                                    {categoriesNames.map(
                                        (name) => (
                                            <ItemCategory
                                                nameOfCategory={name.name}
                                                key={name.name}
                                                currentlyChosen={name.name == this.props.category}
                                                to={`/${name.name}`}
                                            />
                                        ),
                                    )}
                                </div>
                                <div   className="logo"  onClick={this.props.history.goBack} ><LogoImage /></div>
                                <div className="currency-shop-cart">
                                    <div ref={this.currencyWrapperRef} className="currency-open">
                                        <div className="symbols" onClick={() => this.setState({ currencySwitcherOpen: !this.state.currencySwitcherOpen })}>
                                            {this.context.currency}
                                            <div className="arrow-up-container">
                                                {!this.state.currencySwitcherOpen && <ArrowDown />}
                                                {this.state.currencySwitcherOpen && <ArrowUp />}
                                            </div>
                                        </div>
                                        {this.state.currencySwitcherOpen
                                            && (
                                                <div className="currency-menu">
                                                    {currencies.map((currency: CurrencyProps) => (
                                                        <div className="currency-header currency"
                                                            onClick={() => {
                                                                this.context.setCurrency(currency.symbol);
                                                                this.setState({ currencySwitcherOpen: !this.state.currencySwitcherOpen });
                                                            }}
                                                            key={currency.symbol}
                                                        >
                                                            {currency.label + ' ' + currency.symbol}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                    <div className="shop-cart-container">
                                        <ShopCartImage
                                            onClick={() => {
                                                this.setState({ shopCardSwitchOpen: !this.state.shopCardSwitchOpen });
                                                this.props.showOverlay(!this.state.shopCardSwitchOpen);
                                            }}
                                        />
                                        {products.length > 0 && <div className="cart-list-shop" onClick={() => {
                                            this.setState({ shopCardSwitchOpen: !this.state.shopCardSwitchOpen });
                                            this.props.showOverlay(!this.state.shopCardSwitchOpen);
                                        }}>{products.length}</div>}
                                        <div ref={this.shopCardWrapperRef} className="shop-cart-open">
                                            {this.state.shopCardSwitchOpen && <ShopCardMini />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }

            </ShopCartContext.Consumer>
        );
    }

}

export default graphql<HeaderProps, StoreData>(GET_STORE_DATA)(Header);
