import React, { useState, useEffect } from 'react';
import TextFileReader from '../../Component/Textfield'


const Tupla = Component => {
  let myTxt = require("./words.txt");
  let fileReader;
  const [state, setState] = useState({
    text: "",
   tupla: [{
    line: 0,
    value: '',
    data: ''
   }]
  })

  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content)
  }


  const readFile = (pathFile) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(pathFile)
  }


  return (
    <div className="upload-expense">
      <TextFileReader
        txt={myTxt}
      />
    </ div>
  )
}

export default Tupla;