import React, { Component } from 'react';
import {
  MainPageQuery_category_products_attributes as MainPageQueryCategoryProductsAttributes,
} from '../Utils/StoreInterfaces';


interface AttributeProps {
  attribute: MainPageQueryCategoryProductsAttributes;
  onAttributeSelect: (attributeItem: string) => void;
  selectedAttribute: string | null;
}

export class Attribute extends Component<AttributeProps> {
  render() {
    const attributeName = this.props?.attribute?.id;


    return (
      <div className="attribute-container">
        <div className="attribute-name-container">
          {`${attributeName?.toUpperCase()}:`}
        </div>
        <div className="variants-container" >
          {this.props.attribute.type === 'swatch' && this.props?.attribute?.items?.map(
            (variant) => (
              <div
                className={this.props.selectedAttribute === variant?.id ? "attribute-onhover  one-variant-attribute variant-selected" : "attribute-onhover  one-variant-attribute "}
                key={variant?.id}
                style={{ backgroundColor:"red"}}
                onClick={() => this.props.onAttributeSelect(variant!.id)}
              />
            ),
          )}

          {this.props.attribute.type !== 'swatch' && this.props?.attribute?.items?.map(
            (variant) => (
              <div
                className={this.props.selectedAttribute === variant?.id ? "attribute-onhover  attribute-one-variant variant-selected" : "attribute-onhover  attribute-one-variant"}
                key={variant?.id}
                onClick={() => this.props.onAttributeSelect(variant!.id)}
              >
                {variant?.displayValue}
              </div >
            ),
          )}
        </div>
      </div>
    );
  }
}
