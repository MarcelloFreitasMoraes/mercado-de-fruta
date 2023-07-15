import { useEffect } from "react";
import { Container } from "../../styles/Global";
import * as S from "./styles";
import { PDFDownloadLink } from '@react-pdf/renderer/lib/react-pdf.browser.cjs.js';
import PdfDocument from '../ReportPdf';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function Car({ data, del, setDel, fruitsSelected, setFruitsSelected }) {

  useEffect(() => {
    if (data) {
      const newArray = data.map((item) => item[1]);
      setFruitsSelected(newArray.filter((item) => item !== 'lock'));
    }
  }, [data]);

  const prices = fruitsSelected?.map((som) => {
    return parseFloat(som.price.replace(',', '.'));
  });

  const totalCheckout = prices?.reduce((acumulado, x) => {
    return acumulado + x;
  });

  const total = totalCheckout?.toString().replace('.', ',');

  const delet = (id) => {
    axios
      .delete(
        `https://mercado-de-fruta2-default-rtdb.firebaseio.com/frutas/checkout/${id}.json`
      )
      .then(() => {
        alert("fruta excluída");
        setDel(!del);

        // Atualize o estado para remover o item excluído da lista
        setFruitsSelected((prevFruitsSelected) =>
          prevFruitsSelected.filter((fruit) => fruit.id !== id)
        );
      })
      .catch(() => alert("fruta não excluída"));
  };

  return (
    <S.Details>
      <Container>
        <S.Grid>
          <S.Wrapper>
            {data &&
              data.map((fruit) => {
                return (
                  <S.Content key={fruit}>
                    <S.Product>
                      <img src={fruit[1]?.image} alt={fruit[1]?.name} />
                    </S.Product>

                    <S.Detail>
                      <S.Heading>
                        <h2>{fruit[1]?.name}</h2>
                        <p>{fruit[1]?.description}</p>
                      </S.Heading>

                      <S.Price>
                        <sup>R$</sup>
                        <span>{fruit[1]?.price}</span>
                      </S.Price>

                      <S.Buttons>
                        <span>Quantidade:</span>
                        <span>1</span>
                        <span onClick={() => delet(fruit[0])}>
                          <FaTrash size={16} />
                        </span>
                      </S.Buttons>
                    </S.Detail>
                  </S.Content>
                );
              })}
          </S.Wrapper>

          <S.Aside>
            <S.Heading>
              <h1>Valor da Compra</h1>
            </S.Heading>

            {fruitsSelected &&
              fruitsSelected.map((products) => {
                return (
                  <>
                    <S.Items>
                      <S.ListProducts>
                        <li>
                          <span>[1x] </span>
                          {products.name}
                        </li>
                      </S.ListProducts>

                      <S.ListProducts>
                        <li>
                          <span>
                            <sup>R$</sup>
                            {products.price}
                          </span>
                        </li>
                      </S.ListProducts>
                    </S.Items>
                  </>
                );
              })}

            <S.Finish>
              <S.Total>
                <h3>Total: </h3>

                <div>
                  <sup>R$</sup>
                  <span>{total}</span>
                </div>
              </S.Total>

              <div>
                <PDFDownloadLink
                  document={<PdfDocument data={fruitsSelected} total={total} />}
                  fileName="boleto.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Finalizar Compra"
                  }
                </PDFDownloadLink>
              </div>
            </S.Finish>
          </S.Aside>
        </S.Grid>
      </Container>
    </S.Details>
  );
}
