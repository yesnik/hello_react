class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Search..." /><br />
        <label>
          <input type="checkbox" /> Only in stock
        </label>
      </div>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <td colSpan="2">Sport Goods</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>

          <ProductCategoryRow />

          <tr>
            <td>111</td>
            <td>asdfasdfasdf</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable />
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
  <FilterableProductTable />,
  document.getElementById('root')
);
