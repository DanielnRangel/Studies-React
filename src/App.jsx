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
  return grouped//retorna o array grouped
}

function ProductRow({product : {name, stocked, price}}){//Cria o componente dos produtos individuais e ja desestrutura o objeto "product" recebido
  const displayName = stocked ? name : <span className="out">{name}</span> //Cria um operador ternário para verificar se o produto está em estoque
  return(//retorna um table row com o nomem do produto e o preço
    <tr>
      <td>{displayName}</td>
      <td>{price}</td>
    </tr>
  )
}

function ProductCategoryRow({ category }){//Cria o componente responsável por separar os produtos em categorias
  return(//retorna um table Head contendo a categoria
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  )
}

function ProductTable({products}){//Cria o componente responsável por juntar os produtos e as categorias em uma tabela
  const grouped = groupProducts(products)//Chama a função utilitária grouped e armazena os produtos agrupados no objeto grouped
  const rows = []//Cria um array para armazenar todos os rows da tabela.

  Object.keys(grouped).forEach((category) => {//Utiliza o object keys para passar por todos as categorias dentro do objeto grouped com o método forEach
    rows.push(//Pra cada categoria dentro de grouped ele vai puxar para dentro do array rows essa categoria
      <ProductCategoryRow key={category} category={category}/> //Chama o componente de categoria para ser armaenado dentro do arary e passa a categoria atual
    )

    grouped[category].forEach((product) => {//Para cada item dentro de cada categoria em grouped:
      rows.push(//Puxa os itens por categoria para dentro de rows
        <ProductRow key={product.name} product={product}/>//Chama o componente de itens para ser armazenado dentro de rows e retornar os itens
      )
    })
  })  

  return (//Retorna uma tabela contendo todos os itens e categorias
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

function SearchBar(){//Cria o componente responsável pela barra de busca
  return(//retorna um formulário contendo a barra de busca e uma checkbox para filtrar os itens
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

function FilterableProductTable({products}){//Cria a função responsável por retornar as anteriores de forma organizada
  return(
    <div>
      <SearchBar />
      <ProductTable products = {products}/>
    </div>
  )
}

export default function App(){//Cria a função default que vai ser exportada para o main e retornar o componente anterior passando o props inicial
  return(
    <div className="tabela">
      <FilterableProductTable products={PRODUCTS}/>
    </div>
  )
}