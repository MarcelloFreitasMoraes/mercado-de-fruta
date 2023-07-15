import Head from 'next/head'
import Products from '../src/components/Products'
import Search from '../src/components/Search'
import Slider from '../src/components/Slider'
import axios from "axios";
import { useState,useEffect } from 'react'
import { API } from '../src/config/api';

export default function Home({isLogged}) {
  const [search, setSearch] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    axios.get(API).then((res) => {
      const filterProducts = (Object.entries(res.data))?.filter(item =>{
        return item !== null 
      })
      setResult(filterProducts);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Mercado Fruta | Página Inicial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search setSearch={setSearch} search={search}  />

      <Slider />

      <Products result={result?.[0]?.[1]} isLogged={isLogged} />
    </>
  )
}
