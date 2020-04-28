import React, { useState } from "react";
import Table from "../../Component/Table";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { TabelaDados, Exibicao, Forms, InputWrapper, ButtonWrapper, Buttons } from "./styles"
import { FormInstance } from "antd/lib/form";
import { Wrapper } from "../../Component/styles";
import ShowInfo from "../../Component/ShowInfo";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Tabela = () => {
  const [state, setState] = useState({
    buckets: [],
    overflowTax: "",
    colisaoTax: "",
    resultBusca: "",
    qtdTuplasPagina: "",
    qtdPaginas: "",
    open: false,
    acessoDisco: 0,
    acessoDiscoReal: 0
  });

  async function makeRequest(values) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    const response = await fetch(
      "http://localhost:3333/recebendoValores",
      requestOptions
    );
    const data = await response.json();
    setState({
      ...state,
      buckets: data.tabela,
      overflowTax: data.overflowTax + "%",
      colisaoTax: data.colisaoTax + "%",
      qtdTuplasPagina: data.qtdTuplasPagina,
      qtdPaginas: data.qtdPaginas,
    });
  }

  const columns = [
    {
      id: "index",
      label: "Endereço do Bucket",
      minWidth: 150,
    },
    {
      id: "paginaId",
      label: "Index da Página",
      minWidth: 150,
    },
    {
      id: "palavraId",
      label: "Index da Palavra",
      minWidth: 150,
    },
    {
      id: "element",
      label: "Palavras", 
      minWidth: 150,
    },
    {
      id: "overflow",
      label: "Overflow",
      minWidth: 150
    }
  ];

  const onFinish = (values) => {
    makeRequest(values);
  };

  const busca = (value) => {
    let acessoDisco = 0;
    state.buckets.forEach((bucket) => {
      for (let i = 0; i < bucket.palavraId.length; i++) {
        acessoDisco++;
        const element = bucket.palavraId[i];
        if (value.palavra == element) {
          // acessoDiscoReal = acessoDisco
          const bucketMontado = {
            index: bucket.index,
            paginaId: bucket.paginaId[i],
            palavraId: bucket.palavraId[i],
            element: bucket.element[i],
          };

          setState({
            ...state,
            open: true,
            acessoDiscoReal:acessoDisco,
            resultBusca: bucketMontado,
          });
        }
      }

      for (let i = 0; i < bucket.overflow.length; i++) {
        acessoDisco++;
        const buckettt = bucket.overflow[i];
        if (buckettt.palavraId[0] == value.palavra) {
          const bucketMontado = {
            index: bucket.index,
            paginaId: buckettt.paginaId[0],
            palavraId: buckettt.palavraId[0],
            element: buckettt.element[0],
          };

          setState({
            ...state,
            open: true,
            acessoDiscoReal:acessoDisco,
            resultBusca: bucketMontado,
          });
        }
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Wrapper>
        <div>
          <Forms
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <InputWrapper>
              <Forms.Item label="Qtd de tuplas por página" name="numTuplas">
                <Input />
              </Forms.Item>
            </InputWrapper>

            <InputWrapper>
              <Forms.Item label="Qtd de páginas" name="tamanhoPagina">
                <Input />
              </Forms.Item>
            </InputWrapper>

            <ButtonWrapper>
              <Forms.Item {...tailLayout}>
                <Buttons type="primary" htmlType="submit">
                  Processar Tabela
          </Buttons>
              </Forms.Item>
            </ButtonWrapper>

          </Forms>

          <Forms
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={busca}
            onFinishFailed={onFinishFailed}
          >

            <InputWrapper>
              <Form.Item label="Index da palavra" name="palavra">
                <Input />
              </Form.Item>
            </InputWrapper>

            <ButtonWrapper>
              <Form.Item {...tailLayout}>
                <Buttons type="primary" htmlType="submit">
                  Procurar
          </Buttons>
              </Form.Item>
            </ButtonWrapper>

          </Forms>

          <TabelaDados>

            <Exibicao>Taxa de Overflow : {state.overflowTax} </Exibicao>

            <Exibicao>Taxa de colisão : {state.colisaoTax} </Exibicao>

            <Exibicao>Número de tuplas por página : {state.qtdTuplasPagina} </Exibicao>

            <Exibicao>Número de páginas : {state.qtdPaginas} </Exibicao>

            <Exibicao>Acesso em disco pela Busca: {state.acessoDiscoReal} </Exibicao>

          </TabelaDados>
        </div>

        <ShowInfo isVisible={state.open} bucket={state.resultBusca} />

      </Wrapper>

      <Table columns={columns} data={state.buckets} />
    </>
  );
};

export default Tabela;
