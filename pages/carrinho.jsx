import React, { useState, useEffect } from 'react'
import Car from '../src/components/Car'
import GoBack from '../src/components/Back'
import axios from  'axios'
import { CHECK } from '../src/config/api'

export default function listProducts() {
    const [data, setData] = useState()
    const [fruitsSelected, setFruitsSelected] = useState();
    const [del, setDel] = useState();
    
    useEffect(() => {
        axios.get(CHECK).then((res) => {
          setData(Object.entries(res.data));
        });
      }, [del]);

    return (
        <>
            <Car data={data} del={fruitsSelected} fruitsSelected={fruitsSelected} setDel={setDel}setFruitsSelected={setFruitsSelected}/>
            <GoBack />
        </>
    )
}
