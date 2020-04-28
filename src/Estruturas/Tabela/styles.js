import styled from 'styled-components'
import { Form, Input, Button } from 'antd'

export const Exibicao = styled.p`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
` 

export const TabelaDados = styled.div`
  width: 500px;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 20px;
  margin-left: 20px;
`

export const Forms = styled(Form)`
  width: 500px;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
`

export const InputWrapper = styled.div`
  margin-top: 20px;
  margin-left: 10px;
`

export const ButtonWrapper = styled.div`
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 50px;
`

export const Buttons = styled(Button)`
  background-color: #000000;
  padding: 10px;
  font-family: 'Open Sans Condensed';
  font-weight: 400;
  font-size: 17px;
  letter-spacing: 1px;
  cursor: pointer;
  opacity: 0.7;
  margin: 10px 0;
  width: 90%;
  outline: none;
  border: none;
  color: white;

  &:hover {
      opacity: 1;
  }
`