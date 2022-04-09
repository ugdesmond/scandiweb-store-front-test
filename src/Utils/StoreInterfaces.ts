export interface MainPageQuery_category_products_prices {
    __typename: "Price";
    amount: number;
    currency: string;
  }
  
  export interface MainPageQuery_category_products_attributes_items {
    __typename: "Attribute";
    displayValue: string | null;
    id: string;
    value: string | null;
  }
  
  export interface MainPageQuery_category_products_attributes {
    __typename: "AttributeSet";
    id: string;
    items: (MainPageQuery_category_products_attributes_items | null)[] | null;
    name: string | null;
    type: string | null;
  }
  
  export interface ProductModel {
    id: string;
    name: string;
    gallery:(string | null)[] | null;
    category: string;
    description: string;
    prices: MainPageQuery_category_products_prices[];
    inStock: boolean | null;
    attributes: (MainPageQuery_category_products_attributes | null)[] | null;
  }
  
  export interface Category {
    __typename: "Category";
    name: string | null;
    products: (ProductModel | null)[];
  }
  export interface CategoryProps {
    name?:string
  }
  
  export interface StoreData {
    category: Category | null;
    currencies: (string | null)[] | null;
    categories: CategoryProps[];
  }