//---------------components--------------------------
import Card from "../components/Card";
import SearchBox from "../components/SearchBox";
import SideBar from "../components/SideBar";
//--------------hooks---------------------------------
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext"
import { filterProducts, getInitialQuery, orderProducts, searchProducts } from "../helpers/helpers";
import { useSearchParams } from "react-router-dom";
//---------------styles-------------------------------
import styles from './Products.module.css';
import { useTitle } from "../hooks/TitleComponent";

//----------------loading-----------------------------
import Spinner from "../components/Spinner";

//________________________________________________________________
function Products() {
  //-------------------custum hook--------------------------
  useTitle("🏪Products Page");
  //------------datas---------------------------------
  const data = useProducts();
  //-------------states-------------------------------
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  //--------------useEffects---------------------------
  useEffect(()=>{
    setProducts(data)
    setQuery(getInitialQuery(searchParams));
    
  },[data])

  useEffect(() => {
    setSearch(query.search || '')
    let finalProducts = searchProducts(data, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    finalProducts = orderProducts(finalProducts, query.order);
    setProducts(finalProducts);
    setSearchParams(query)
  }, [query])
  useEffect(() => {
  })



//___________________________html___________________________________________
  return (
    <>
    <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>
      <div className={styles.container}>
          <div className={!data.length || !products.length  ? styles.products2 : styles.products}>
          {!data.length && <Spinner/>}
            {products && products.map(data => 
              <Card key={data.id} data={data} />
              )}
              {data.length && !products.length && <h2>Products Not Founded</h2>}
          </div>
              <SideBar query={query} setQuery={setQuery} />
        </div>
    </>
  )
}

export default Products