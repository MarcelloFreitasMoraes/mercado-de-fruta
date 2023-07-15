import Head from 'next/head'
import Products from '../src/components/Products'
import Search from '../src/components/Search'
import { product_card } from '../src/components/Products/data'
import axios from "axios";
import { useEffect, useState } from 'react'
import { Container } from '../src/styles/Global';
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { API } from '../src/config/api';

export default function Home({isLogged}) {
  const [search, setSearch] = useState()
  const [data, setData] = useState()
  const [result, setResult] = useState();

  const router = useRouter()
  const { fruta } = router.query

  useEffect(() => {
    axios.get(API).then((res) => {

      const filterProducts = (Object.entries(res.data))?.filter(n =>{
        return n !== null 
      })
      setData(filterProducts);
    });
  }, []);


  useEffect(() => {
    const filtered = data?.[0]?.[1]?.filter(item => {
    
      if (item?.name?.indexOf(fruta) !== -1) {      
        return true; 
      }
      return false;
    });
    setResult(filtered);
    
  }, [data]);  

  const Title = styled.h1``

  return (
    <>
      <Head>
        <title>Mercado Fruta | Página Inicial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search data={product_card} setSearch={setSearch} search={search} />

      <Container>
       {result?.length > 0 ? (<Title>Resultados para {fruta !== -1}</Title>) : (<>não há reultados</>)} 
      </Container>

      <Products result={result} isLogged={isLogged} />
    </>
  )
}
