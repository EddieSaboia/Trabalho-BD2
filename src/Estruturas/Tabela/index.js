import React, { useState } from "react";
import Table from "../../Component/Table"
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';

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
    colisaoTax: ""
  })

  async function makeRequest(values) {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    const response = await fetch('http://localhost:3333/manda', requestOptions);
    const data = await response.json();
    setState({
      ...state,
      buckets:data.tabela,
      overflowTax: data.overflowTax + "%",
      colisaoTax: data.colisaoTax + "%"
    })
    console.log("response", data)
}

  // const makeRequest = () => {
  //   axios.get('https://api.github.com/users/maecapozzi')
  //   .then(response => console.log(response))
  // }

  const columns = [
    {
      id: "index",
      label: "endereço Bucket",
      minWidth: 150
    },
    {
      id: "paginaId",
      label: "Pagina index",
      minWidth: 150
    },
    {
      id: "element",
      label: "Palavras",
      minWidth: 150
    },
    {
      id: "overflow",
      label: "overflow",
      minWidth: 150
    }
  ]

  const onFinish = values => {
    makeRequest(values)
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
    <h1>puefhep</h1>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tamanho do Bucket"
        name="tamanhoBucket"
        rules={[{ required: true, message: 'Colocar o tamanho do bucket!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="tamanho da pagina"
        name="tamanhoPagina"
        // rules={[{ required: true, message: 'Please input your password!' }]}
      >
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


    <Table
    columns={columns}
    data={state.buckets}
    />

    </>
  )

}

export default Tabela;