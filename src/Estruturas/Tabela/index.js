import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Table from "../../Component/Table";
import axios from "axios";
import { Form, Input, Button, Checkbox, Tag, Space } from "antd";

import {
  TabelaDados,
  Exibicao,
  Forms,
  InputWrapper,
  ButtonWrapper,
  Buttons,
  FormItem,
  CardItem,
  CardGrafico,
  TitleGrafico,
} from "./styles";
import { FormInstance } from "antd/lib/form";
import { Wrapper } from "../../Component/styles";
import ShowInfo from "../../Component/ShowInfo";
import ReactFlow from "react-flow-renderer";
import { Card } from "antd";

import "antd/dist/antd.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Tabela = () => {

  const [elements, setElements] = useState([]);
  const [ele, setEle] = useState("AHHH");

  const [visable, setVisable] = useState(false);

  let groups = "";
  let tamanho = 0;
  let arraynovo = [];
  let arrayDataTable = [];

  const [state, setState] = useState({
    numbTuplas: [],
    buckets: [],
    pagina: [],
    overflowTax: "",
    colisaoTax: "",
    resultBusca: "",
    qtdTuplasPagina: "",
    qtdPaginas: "",
    open: false,
    acessoDisco: 0,
    acessoDiscoReal: 0,
    nameTabela: ""
  });

  let columnsDepartamento = [ {
    id: "id",
    label: "Id",
    minWidth: 150,
  },
  {
    id: "nome",
    label: "Nome",
    minWidth: 150,
  },
  {
    id: "codigodepartamento",
    label: "Codigo departamento",
    minWidth: 150,
  }];

  let columnsEmpregados = [
    {
      id: "matricula",
      label: "Matricula",
      minWidth: 150,
    },
    {
      id: "nome",
      label: "Nome",
      minWidth: 150,
    },
    {
      id: "salario",
      label: "Salario",
      minWidth: 150,
    },
    {
      id: "lotacao",
      label: "Lotacâo",
      minWidth: 150,
    },
  ];

  async function makeRequest(values, link) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    const response = await fetch(
      "http://localhost:3333/" + link,
      requestOptions
    );
    const data = await response.json();
    console.log("pequena 1",data.numbTuplas)

    data.numbTuplas.map((pagina) => {
      arraynovo.push(pagina.linha);
    });
    console.log("pequena 2",arraynovo)

    for (let i = 0; i < arraynovo.length; i++) {
      if (groups === "empregados") {
        arrayDataTable.push({
          matricula: arraynovo[i]?.matricula ? arraynovo[i].matricula : "",
          nome: arraynovo[i]?.nome ? arraynovo[i].nome : "",
          salario: arraynovo[i]?.salario ? arraynovo[i].salario : "",
          lotacao: arraynovo[i]?.lotacao ? arraynovo[i].lotacao : "",
        });
      } else if (groups === "departamento") {
        arrayDataTable.push({
          id: arraynovo[i].id ? arraynovo[i].id : "",
          nome: arraynovo[i].nome? arraynovo[i].nome : "",
          codigodepartamento: arraynovo[i].codigodepartamento ? arraynovo[i].codigodepartamento : ""
        });
      } else {
      }
    }

    console.log("pequena",arrayDataTable)

    setState({
      ...state,
      buckets: arrayDataTable
    })

    setVisable(true);
  }

  useEffect(() => {
    console.log("variavel", state);
  }, [state]);



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
            acessoDiscoReal: acessoDisco,
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
            acessoDiscoReal: acessoDisco,
            resultBusca: bucketMontado,
          });
        }
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const interpretasor = (query) => {
    const regex1 = /\s*select\s+([*])\s+from\s+(\w+)$/g;
    const regex2 = /\s*select\s+(\w+)\s+from\s+(\w+)\s*$/g;
    const regex3 = /\s*select\s+(\w+)\s*,\s*(\w+)\s+from\s+(\w+)\s*$/g;
    const regex4 = /\s*select\s+([*])\s+from\s+(\w+)\s+where\s+(\w+)\s*([<>!]{0,1})([=]{0,1})\s*(\d+)\s*$/g;
    const regex5 = /\s*select\s+(\w+)\s+from\s+(\w+)\s+where\s+(\w+)\s*([<>!]{0,1})([=]{0,1})\s*(\d+)\s*$/g;
    const regex6 = /\s*select\s+(\w+)\s*,\s*(\w+)\s+from\s+(\w+)\s+where\s+(\w+)\s*([<>!]{0,1})([=]{0,1})\s*(\d+)\s*$/g;
    const regex7 = /\s*select\s+(\w+)\s+from\s+(\w+)\s+where\s+(\w+)\s*([<>!]{0,1})([=]{0,1})\s*(\w+)\s*$/g;
    const regex8 = /\s*select\s+(\w+)\s*,\s*(\w+)\s+from\s+(\w+)\s+(\w+)\s*,\s*(\w+)\s+(\w+)\s+where\s+(\w+)\s*([<>=])\s*(\d+)\s+and\s+(\w+\.\w+)\s*([<>=])\s*(\w+\.[a-zA-Z]*$)\s*$/g;

    console.log("variavel 1", regex1.exec(query));
    console.log("variavel 2", regex2.exec(query));
    console.log("variavel 3", regex3.exec(query));
    console.log("variavel 4", regex4.exec(query));
    console.log("variavel 5", regex5.exec(query));
    console.log("variavel 6", regex6.exec(query));

    var a = regex1.exec(query);
    var b = regex2.exec(query);
    var c = regex3.exec(query);
    var d = regex4.exec(query);
    var e = regex5.exec(query);
    var f = regex6.exec(query);

    if ((a = regex1.exec(query)) != null) {
      tamanho = 3;
      return a;
    }

    if ((b = regex2.exec(query)) != null) {
      console.log("variavel BB", b);
      tamanho = 3;
      return b;
    }

    if ((c = regex3.exec(query)) != null) {
      tamanho = 4;
      return c;
    }

    if ((d = regex4.exec(query)) != null) {
      // console.log("variavel BB", b);
      tamanho = 7;
      return d;
    }

    // if ((a = regex1.exec(query)) != null) {
    //   tamanho = 3;
    //   return a;
    // }

    // if ((b = regex2.exec(query)) != null) {
    //   console.log("variavel BB", b);
    //   tamanho = 3;
    //   return b;
    // }

    return "Expressão invalida";
  };

  const graphStyles = { width: "100%", height: "400px" };

  const BasicGraph = () => (
    <ReactFlow elements={elements} style={graphStyles} />
  );

  const onsubmit = (values) => {
    let variavel = interpretasor(values.numTuplas);
    let tabeladatabase = "";
    let variaveis = "";
    console.log(variavel["length"]);
    if (variavel["length"] === 3) {
      for (let index = 0; index < tamanho; index++) {
        const element = variavel[index];
        if (
          element === "departamento" ||
          element === "dependente" ||
          element === "empregados"
        ){
          tabeladatabase = element;
          groups = element;
        }
      
      }
      if (tamanho === 4) {
        variaveis = variavel[1] + "," + variavel[2];
      } else {
        variaveis = variavel[1];
      }

      setEle(tabeladatabase);

      setElements([
        {
          id: "1",
          data: { label: "Paginas " + tabeladatabase },
          position: { x: 250, y: 5 },
        },
        {
          id: "2",
          data: { label: "projeção[" + variaveis + "]" },
          position: { x: 100, y: 100 },
        },
        { id: "e1-2", source: "1", target: "2", animated: true },
      ]);

      makeRequest(values, "receberumparametro");

    }
  };

  return (
    <>
      <Wrapper>
        <div>
          <Forms
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onsubmit}
            onFinishFailed={onFinishFailed}
          >
            <InputWrapper>
              <FormItem label="Querry" name="numTuplas">
                <Input />
              </FormItem>
            </InputWrapper>

            <ButtonWrapper>
              <Form.Item {...tailLayout}>
                <Buttons
                  type="primary"
                  htmlType="submit"
                  style={{ height: 42 }}
                >
                  Processar Tabela
                </Buttons>
              </Form.Item>
            </ButtonWrapper>
          </Forms>
        </div>

        {/* <ShowInfo isVisible={state.open} bucket={state.resultBusca} /> */}
      </Wrapper>

      <hr />

      <TitleGrafico>Grafo</TitleGrafico>
      <CardGrafico>{BasicGraph()}</CardGrafico>
      {console.log("Eddie", groups)}
      {visable && (
        <div style={{ padding: 24 }}>
          {console.log("pequena 5", ele)}
          <Table
            columns={ele === "empregados" ? columnsEmpregados : columnsDepartamento}
            data={state.buckets}
          />
        </div>
      )}
    </>
  );
};

export default Tabela;
