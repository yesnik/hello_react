class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleSearchTextChange(event) {
    this.props.onSearchTextChange(event.target.value);
  }

  handleInStockChange(event) {
    this.props.onInStockChange(event.target.checked);
  }

  render() {
    const searchText = this.props.searchText;
    const inStock = this.props.inStock;

    return (
      <div>
        <input type="text" placeholder="Search..." 
          value={searchText}
          onChange={this.handleSearchTextChange} /><br />
        <label>
          <input type="checkbox" 
            checked={inStock} 
            onChange={this.handleInStockChange} /> Only in stock
        </label>
      </div>
    );
  }
}

class ProductCategoryRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td colSpan="2" className="category-title">{this.props.category}</td>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.product;
    const name = product.stocked ? 
      product.name :
      <span className="stocked">
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rows = [];
    let lastCategory = '';

    const products = this.props.products;

    products.forEach((product) => {
      if (product.category !== lastCategory) {
        lastCategory = product.category;
        rows.push(
          <ProductCategoryRow 
            key={lastCategory}
            category={lastCategory} />
        );
      }

      rows.push(
        <ProductRow 
          key={product.name} 
          product={product} />
      );
    });

    const productsList = this.props.products.map((product, index) => (
      <ProductRow 
        key={index} 
        product={product} />
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: 'bas',
      inStock: true
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText
    });
  }

  handleInStockChange(inStock) {
    this.setState({
      inStock: inStock
    });
  }

  getProducts() {
    let products = [];
    let pattern = new RegExp(this.state.searchText, 'i');
    let inStockOnly = this.state.inStock;

    this.props.products.forEach((product) => {

      if (inStockOnly && product.stocked === false) {
        return;
      }

      if (pattern.test(product.name)) {
        products.push(product);
      }
    });

    return products;
  }

  render() {
    const searchText = this.state.searchText;
    const inStock = this.state.inStock;
    const products = this.getProducts();

    return (
      <div>
        <SearchBar 
          searchText={searchText} 
          inStock={inStock}
          onSearchTextChange={this.handleSearchTextChange} 
          onInStockChange={this.handleInStockChange} />

        <ProductTable products={products} />
      </div>
    );
  }
}

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);
