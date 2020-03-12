import React, { useState } from "react";
import Table from "../../Component/Table"

const Tabela = () => {
  
  const [state, setState] = useState({
    tupla: []
  })

  const columns = [
    {
      id: "word",
      label: "word",
      minWidth: 150
    },
    {
      id: "bucket",
      label: "endereco bucket",
      minWidth: 150
    },
    {
      id: "keySearch",
      label: "Chave de busca",
      minWidth: 150
    }
  ]


  return (
    <>
    <h1>puefhep</h1>
    <Table
    columns={columns}
    data={[]}
    />
    </>
  )

}

export default Tabela;