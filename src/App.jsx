import "./App.css"

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Meat", price: "$5", stocked: true, name: "Chicken"},
  {category: "Meat", price: "$2", stocked: true, name: "Pork"},
  {category: "Meat", price: "$4", stocked: false, name: "Duck"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function groupProducts(products){//Cria a função utilitária
  const grouped = []//vai criar o novo array que vai receber o antigo array agrupado
  products.forEach((product) => {//para cada elemento dentro do array:
    if(!grouped[product.category]){//se a categoria atual do array grouped for diferente ele vai criar um novo espaço para a nova categoria
      grouped[product.category] = []
    }
    grouped[product.category].push(product)//puxa para dentro da categoria atual todos os produtos pertencentes a essa categoria
  })
  return grouped
}

function ProductRow({product : {name, stocked, price}}){
  const displayName = stocked ? name : <span className="out">{name}</span>
  return(
    <tr>
      <td>{displayName}</td>
      <td>{price}</td>
    </tr>
  )
}

function ProductCategoryRow({ category }){
  return(
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  )
}

function ProductTable({products}){
  const grouped = groupProducts(products)
  const rows = []

  Object.keys(grouped).forEach((category) => {
    rows.push(
      <ProductCategoryRow key={category} category={category}/>
    )

    grouped[category].forEach((product) => {
      rows.push(
        <ProductRow key={product.name} product={product}/>
      )
    })
  })  

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar(){
  return(
    <form>
      <input type="text" placeholder="search..."/>
      <br />
      <label>
        <input type="checkbox"/>
        {' '}
        Only show products in stock
      </label>
    </form>
  )

}

function FilterableProductTable({products}){
  return(
    <div>
      <SearchBar />
      <ProductTable products = {products}/>
    </div>
  )
}

export default function App(){
  return(
    <div className="tabela">
      <FilterableProductTable products={PRODUCTS}/>
    </div>
  )
}