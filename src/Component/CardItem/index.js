import React from "react";
import { Item, TextItem } from "./styles";
import { Card } from "antd";

const CardItem = ({ pagina }) => {
  const renderItem = (tupla) => {
    console.log(tupla)
    return (
      <>
          <Item>
            <TextItem>Index : {tupla?.index}</TextItem>
            <TextItem>Palavra : {tupla?.element}</TextItem>
          </Item>
      </>
    );
  };

  const renderizar = () => {
    return <>{pagina.tuplas.map((tupla) => {renderItem(tupla)})}</>;
  };

  return <>{renderizar()}</>;
};

export default CardItem;
