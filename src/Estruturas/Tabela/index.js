import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import Table from "../../Component/Table";
import { Form, Input, Button, Checkbox, Table, Tag, Space } from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

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
  let arrayIntermediario = [];
  let arrayDataTable = [];
  let arrayDataTableIntermediario = [];

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
    nameTabela: "",
    variaveis: "",
    variavelWhere: "",
    variavelSinal: "",
    variavelValorWhere: "",
    arrayDataTableInter: [],  
    searchText: '',
    searchedColumn: '',
  });

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

    if (data.tabelaIntermediaria) {
      data.tabelaIntermediaria.map((pagina) => {
        arrayIntermediario.push(pagina.linha);
      });

      for (let i = 0; i < arrayIntermediario.length; i++) {
        if (groups === "empregados") {
          arrayDataTableIntermediario.push({
            matricula: arrayIntermediario[i]?.matricula
              ? arrayIntermediario[i].matricula
              : "-",
            nome: arrayIntermediario[i]?.nome
              ? arrayIntermediario[i].nome
              : "-",
            salario: arrayIntermediario[i]?.salario
              ? arrayIntermediario[i].salario
              : "-",
            lotacao: arrayIntermediario[i]?.lotacao
              ? arrayIntermediario[i].lotacao
              : "-",
          });
        } else if (groups === "departamento") {
          arrayDataTableIntermediario.push({
            id: arrayIntermediario[i].id ? arrayIntermediario[i].id : "-",
            nome: arrayIntermediario[i].nome ? arrayIntermediario[i].nome : "-",
            codigodepartamento: arrayIntermediario[i].codigodepartamento
              ? arrayIntermediario[i].codigodepartamento
              : "-",
          });
        } else {
        }
      }
    }

    data.projecao.map((pagina) => {
      arraynovo.push(pagina.linha);
    });

    for (let i = 0; i < arraynovo.length; i++) {
      if (groups === "empregados") {
        arrayDataTable.push({
          matricula: arraynovo[i]?.matricula ? arraynovo[i].matricula : "-",
          nome: arraynovo[i]?.nome ? arraynovo[i].nome : "-",
          salario: arraynovo[i]?.salario ? arraynovo[i].salario : "-",
          lotacao: arraynovo[i]?.lotacao ? arraynovo[i].lotacao : "-",
        });
      } else if (groups === "departamento") {
        arrayDataTable.push({
          id: arraynovo[i].id ? arraynovo[i].id : "-",
          nome: arraynovo[i].nome ? arraynovo[i].nome : "-",
          codigodepartamento: arraynovo[i].codigodepartamento
            ? arraynovo[i].codigodepartamento
            : "-",
        });
      } else {
      }
    }

    setState({
      ...state,
      buckets: arrayDataTable,
      pagina: data.paginas,
      arrayDataTableInter: arrayDataTableIntermediario,
    });

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

    if ((e = regex5.exec(query)) != null) {
      tamanho = 3;
      return e;
    }

    if ((f = regex6.exec(query)) != null) {
      tamanho = 3;
      return f;
    }

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
    let variavelWhere = "";
    let variavelSinal = "";
    let variavelValorWhere = "";
    if (variavel["length"] === 3 || variavel["length"] === 4) {
      for (let index = 0; index < tamanho; index++) {
        const element = variavel[index];
        if (
          element === "departamento" ||
          element === "dependente" ||
          element === "empregados"
        ) {
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

      if (tamanho === 4) {
        console.log("EDDIIIEEE", tamanho);
        makeRequest(values, "receberdoisparametros");
      } else {
        makeRequest(values, "receberumparametro");
      }
    }

    if (variavel["length"] === 7) {
      if (variavel[4] !== "") {
        for (let index = 0; index < tamanho; index++) {
          const element = variavel[index];
          if (
            element === "departamento" ||
            element === "dependente" ||
            element === "empregados"
          ) {
            tabeladatabase = element;
            groups = element;
          }
        }

        variaveis = variavel[1];

        setState({
          ...state,
          variaveis: variaveis,
          variavelWhere: variavelWhere,
          variavelSinal: variavelSinal,
          variavelValorWhere: variavelValorWhere,
        });

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
          {
            id: "3",
            data: {
              label: "Where " + variavel[3] + " " + variavel[4] + variavel[6],
            },
            position: { x: 50, y: 50 },
          },
          { id: "e1-2", source: "1", target: "2", animated: true },
          { id: "e2-3", source: "2", target: "3", animated: true },
        ]);

        makeRequest(values, "receberumparametrowhere");
      } else {
        for (let index = 0; index < tamanho; index++) {
          const element = variavel[index];
          if (
            element === "departamento" ||
            element === "dependente" ||
            element === "empregados"
          ) {
            tabeladatabase = element;
            groups = element;
          }
        }

        variaveis = variavel[1];

        setEle(tabeladatabase);

        setElements([
          {
            id: "1",
            data: { label: "Paginas " + tabeladatabase },
            position: { x: 250, y: 5 },
          },
          {
            id: "3",
            data: { label: "projeção[" + variaveis + "]" },
            position: { x: 100, y: 100 },
          },
          {
            id: "2",
            data: {
              label: "Where " + variavel[3] + " " + variavel[5] + variavel[6],
            },
            position: { x: 100, y: 100 },
          },
          { id: "e1-2", source: "1", target: "2", animated: true },
          { id: "e2-3", source: "2", target: "3", animated: true },
        ]);

        makeRequest(values, "receberumparametrobinario");
      }
    }

    if (variavel["length"] === 18) {
      console.log("entrou 2", variavel);
      if (
        variavel[2] === "departamento" ||
        variavel[2] === "dependente" ||
        variavel[2] === "empregados"
      ) {
        console.log("entrou 1");
        tabeladatabase = variavel[2];
        groups = variavel[2];
        variaveis = variavel[1];
        variavelWhere = variavel[3];
        variavelSinal = variavel[4];
        variavelValorWhere = variavel[6];
      } else {
        console.log("entrou 2");
        tabeladatabase = variavel[3];
        groups = variavel[3];
        variaveis = variavel[1] + "," + variavel[2];
        variavelWhere = variavel[4];
        variavelSinal = variavel[5];
        variavelValorWhere = variavel[7];
      }

      setEle(tabeladatabase);

      setElements([
        {
          id: "1",
          data: { label: "Paginas " + tabeladatabase },
          position: { x: 250, y: 5 },
        },
        {
          id: "3",
          data: { label: "projeção[" + variaveis + "]" },
          position: { x: 100, y: 100 },
        },
        {
          id: "2",
          data: {
            label: "Where " + variavel[3] + " " + variavel[4] + variavel[6],
          },
          position: { x: 100, y: 100 },
        },
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3", animated: true },
      ]);

      if (
        variavel[2] === "departamento" ||
        variavel[2] === "dependente" ||
        variavel[2] === "empregados"
      ) {
        makeRequest(values, "receberumparametrowhere");
      } else {
        console.log("entrou 2");
        makeRequest(values, "receberdoisparametrowhere");
      }
    }
    if (variavel["length"] === 8) {
      console.log("entrou 2", variavel);
      if (
        variavel[2] === "departamento" ||
        variavel[2] === "dependente" ||
        variavel[2] === "empregados"
      ) {
        console.log("entrou 1");
        tabeladatabase = variavel[2];
        groups = variavel[2];
        variaveis = variavel[1];
        variavelWhere = variavel[3];
        variavelSinal = variavel[4];
        variavelValorWhere = variavel[6];
      } else {
        console.log("entrou 2");
        tabeladatabase = variavel[3];
        groups = variavel[3];
        variaveis = variavel[1] + "," + variavel[2];
        variavelWhere = variavel[4];
        variavelSinal = variavel[5];
        variavelValorWhere = variavel[7];
      }

      setEle(tabeladatabase);

      setElements([
        {
          id: "1",
          data: { label: "Paginas " + tabeladatabase },
          position: { x: 250, y: 5 },
        },
        {
          id: "3",
          data: { label: "projeção[" + variaveis + "]" },
          position: { x: 100, y: 100 },
        },
        {
          id: "2",
          data: {
            label: "Where " + variavel[3] + " " + variavel[4] + variavel[6],
          },
          position: { x: 100, y: 100 },
        },
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3", animated: true },
      ]);

      makeRequest(values, "receberdoisparametrowhere");
    }
  };
  
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      // if (visible) {
      //   setTimeout(() => searchInput.select());
      // }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

 const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

  let columnsDepartamento = [
    {
      key: "id",
      dataIndex: "id",
      title: "Id",
      minWidth: 150,
      ...getColumnSearchProps('id')

    },
    {
      key: "nome",
      dataIndex: "nome",
      title: "Nome",
      minWidth: 150,
      ...getColumnSearchProps('nome')

    },
    {
      key: "codigodepartamento",
      dataIndex: "codigodepartamento",
      title: "Codigo departamento",
      minWidth: 150,
      ...getColumnSearchProps('codigodepartamento')

    },
  ];

  let columnsEmpregados = [
    {
      key: "matricula",
      dataIndex: "matricula",
      title: "Matricula",
      minWidth: 150,
      ...getColumnSearchProps('matricula')
    },
    {
      key: "nome",
      dataIndex: "nome",
      title: "Nome",
      minWidth: 150,
      ...getColumnSearchProps('nome')

    },
    {
      key: "salario",
      dataIndex: "salario",
      title: "Salario",
      minWidth: 150,
      ...getColumnSearchProps('salario')

    },
    {
      key: "lotacao",
      dataIndex: "lotacao",
      title: "Lotacâo",
      minWidth: 150,
      ...getColumnSearchProps('lotacao')
    },
  ];


  return (
    <>
      <Wrapper>
        <Forms
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onsubmit}
          onFinishFailed={onFinishFailed}
        >
          <InputWrapper>
            <FormItem label="Querry" name="numTuplas">
              <Input style={{ width: 558 }} />
            </FormItem>
          </InputWrapper>

          <ButtonWrapper>
            <Form.Item {...tailLayout}>
              <Buttons
                type="primary"
                htmlType="submit"
                style={{ height: 42, marginLeft: -160 }}
              >
                Processar
              </Buttons>
            </Form.Item>
          </ButtonWrapper>
        </Forms>
      </Wrapper>

      <hr />

      <TitleGrafico>Grafo</TitleGrafico>
      <CardGrafico>{BasicGraph()}</CardGrafico>
      {console.log("Eddie", groups)}
      {visable && (
        <div style={{ padding: 24 }}>
          {console.log("pequena 5", ele)}
          <p>{ele}</p>

          <Table
            columns={
              ele === "empregados" ? columnsEmpregados : columnsDepartamento
            }
            dataSource={state.pagina}
          />

          {state.arrayDataTableInter.length !== 0 && (
            <div>
              <p>Projeção Intermediaria </p>
              <Table
                columns={
                  ele === "empregados" ? columnsEmpregados : columnsDepartamento
                }
                dataSource={state.arrayDataTableInter}
              />
            </div>
          )}

          <p>Projeção Final</p>
          <Table
            columns={
              ele === "empregados" ? columnsEmpregados : columnsDepartamento
            }
            dataSource={state.buckets}
          />
        </div>
      )}
    </>
  );
};

export default Tabela;
