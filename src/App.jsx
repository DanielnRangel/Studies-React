import "./App.css"
import { useState } from 'react';

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

function groupProducts(products){   //Cria a função utilitária
  const grouped = []    //vai criar o novo array que vai receber o antigo array agrupado
  products.forEach((product) => {   //para cada elemento dentro do array:
    if(!grouped[product.category]){   //se a categoria atual do array grouped for diferente ele vai criar um novo espaço para a nova categoria
      grouped[product.category] = []
    }
    grouped[product.category].push(product)   //puxa para dentro da categoria atual todos os produtos pertencentes a essa categoria
  })
  return grouped    //retorna o array grouped
}

function ProductRow({product : {name, stocked, price}}){    //Cria o componente dos produtos individuais e ja desestrutura o objeto "product" recebido
  const displayName = stocked ? name : <span className="out">{name}</span>    //Cria um operador ternário para verificar se o produto está em estoque
  return(   //retorna um table row com o nomem do produto e o preço
    <tr>
      <td>{displayName}</td>
      <td>{price}</td>
    </tr>
  )
}

function ProductCategoryRow({ category }){    //Cria o componente responsável por separar os produtos em categorias
  return(   //retorna um table Head contendo a categoria
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  )
}

function ProductTable({products, filterText, inStockOnly}){   //Cria o componente responsável por juntar os produtos e as categorias em uma tabela
  const grouped = groupProducts(products)   //Chama a função utilitária grouped e armazena os produtos agrupados no objeto grouped
  const rows = []   //Cria um array para armazenar todos os rows da tabela.

  Object.keys(grouped).forEach((category) => {    //Utiliza o object keys para passar por todos as categorias dentro do objeto grouped com o método forEach
    rows.push(    //Pra cada categoria dentro de grouped ele vai puxar para dentro do array rows essa categoria
      <ProductCategoryRow key={category} category={category}/>    //Chama o componente de categoria para ser armaenado dentro do arary e passa a categoria atual
    )

    grouped[category].forEach((product) => {    //Para cada item dentro de cada categoria em grouped:
      if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {    //Se o nome do produto não contém o texto digitado ignora
      return
      } 
      if (inStockOnly && !product.stocked) {    //Se o campo inStockOnly estiver marcado e o produto não estiver em stock ingora o produto
      return;
      }

      rows.push(    //Puxa os itens por categoria para dentro de rows
        <ProductRow key={product.name} product={product}/>    //Chama o componente de itens para ser armazenado dentro de rows e retornar os itens
      )
    })
  })  

  return (    //Retorna uma tabela contendo todos os itens e categorias
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

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}){   //Cria o componente responsável pela barra de busca
  return(   //retorna um formulário contendo a barra de busca e uma checkbox para filtrar os itens
    <form>
      <input 
      type="text" 
      value={filterText}    //Passa o valor inserido para o filterText
      placeholder="search..."
      onChange = {(e) => onFilterTextChange(e.target.value)} /> //Quando houver mudança no input ele vai chamar o setFilterText e pessar o texto inserido pelo usuário
      <br />
      <label>
        <input 
        type="checkbox" 
        checked = {inStockOnly}   //Pasas o valor booleano para o inStockOnly
        onChange = {(e) => onInStockOnlyChange(e.target.checked)} />//Qunado houver mudança no checkbox ele vai chamar o setInStockOnly e atualizar o boolean
        {' '}
        Only show products in stock
      </label>
    </form>
  )

}

function FilterableProductTable({products}){    //Cria a função responsável por retornar as anteriores de forma organizada
  const [filterText, setFilterText] = useState('')    //Cria o useState para armazenar o filtro de texto inserido pelo usuário
  const [inStockOnly, setInStockOnly] = useState(false)   //Cria o useState para armazenar o estado da checkBox
  return(
    <div>
      <SearchBar    //Passa as props
      filterText = {filterText}
      inStockOnly = {inStockOnly}
      onFilterTextChange = {setFilterText}
      onInStockOnlyChange = {setInStockOnly}/>
      <ProductTable   //Passa as props
      products = {products}
      filterText = {filterText}
      inStockOnly = {inStockOnly}
      onFilterTextChange = {setFilterText}
      onInStockOnlyChange = {setInStockOnly}/>
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