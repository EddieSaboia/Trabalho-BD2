import React, { useState, useEffect } from 'react';
import TextFileReader from '../../Component/Textfield'

const Tupla = Component => {

  let myTxt = require("./words.txt");

  const [state, setState] = useState({
    lineID: 0,
    value: '',
    data: ''
  })

  return (

    <div className="upload-expense">
      <TextFileReader
        txt={myTxt}
      />
    </ div>
  
  )
}

export default Tupla;