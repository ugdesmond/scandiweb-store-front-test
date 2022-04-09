import React, { Component } from 'react';
import { Link } from 'react-router-dom';



interface ItemCategoryProps {
  nameOfCategory?: string
  currentlyChosen: boolean
  to: string
}

class ItemCategory extends Component<ItemCategoryProps> {
  render() {
    const { currentlyChosen } = this.props;
    return (
      <Link to={{ pathname: this.props.to}} className={"link-color"} >
        <div className={ currentlyChosen ? "category item-category-name category-selected":" category item-category-name" }
          key={this.props.nameOfCategory}
        >
    
          {this.props.nameOfCategory?.toUpperCase()}
        
     
        </div>
      </Link>
    );
  }
}

export default ItemCategory;
