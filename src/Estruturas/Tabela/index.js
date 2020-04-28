import React, { useState } from "react";
import Table from "../../Component/Table";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { FormInstance } from "antd/lib/form";

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
    });
    console.log("response", data);
  }

  const columns = [
    {
      id: "index",
      label: "endereço Bucket",
      minWidth: 150,
    },
    {
      id: "paginaId",
      label: "Pagina index",
      minWidth: 150,
    },
    {
      id: "palavraId",
      label: "Palavra index",
      minWidth: 150,
    },
    {
      id: "element",
      label: "Palavras",
      minWidth: 150,
    },
    {
      id: "overflow",
      label: "overflow",
      minWidth: 150,
      render: (rowData) => {
        
        // <p>{rowData.index}</p>
      },
    },
  ];

  const onFinish = (values) => {
    makeRequest(values);
    console.log("Success:", values);
  };

  // constructor(index, tamanho) {
  //   this.tamanho = tamanho;
  //   this.index = index;
  //   this.paginaId = []
  //   this.palavraId = []
  //   this.element = []
  //   this.overflow = []
  //   this.taxacolisao = 0;
  // }

  const busca = (value) => {
    console.log(value.palavra);
    state.buckets.forEach((bucket) => {
      for (let i = 0; i < bucket.palavraId.length; i++) {
        const element = bucket.palavraId[i];
        if (value.palavra == element) {
          console.log(element);
          setState({
            ...state,
            resultBusca: bucket.element[i],
          });
        }
      }
      for (let i = 0; i < bucket.overflow.length; i++) {
        const buckettt = bucket.overflow[i];
        console.log(buckettt.palavraId[0])
        if (buckettt.palavraId[0] == value.palavra) {
          console.log(buckettt.element[0])
          setState({
            ...state,
            resultBusca: buckettt.element[0],
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
      <h1>TABELA HASH</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Tamanho de Tuplas" name="numTuplas">
          <Input />
        </Form.Item>

        <Form.Item label="tamanho da pagina" name="tamanhoPagina">
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
        </Form.Item>
      </Form>

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={busca}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Index da palavra" name="palavra">
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p>Taxa de Overflow : {state.overflowTax} </p>

      <p>Taxa de colisão : {state.colisaoTax} </p>

      <p>Palavra buscada é : {state.resultBusca} </p>

      <Table columns={columns} data={state.buckets} />
    </>
  );
};

export default Tabela;
