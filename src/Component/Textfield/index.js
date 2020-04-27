import React, { Component } from "react";

class TextFileReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      json: new Map(),
    };
  }

  componentDidMount() {
    this.readTextFile(this.props.txt);
  }

  readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
					var allText = rawFile.responseText;
					console.log("olha eu aqui")
          this.setState({
            text: allText,
          });
        }
      }
    };
    rawFile.send(null);
  };

  handleSaveToPC = (jsonData) => {
    if (jsonData.size > 0) {
      var fileData = JSON.stringify(jsonData);
      var blob = new Blob([fileData], { type: "text/plain" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.download = "filename.json";
      link.href = url;
      link.click();
    }
  };

  render() {
    var a = new Map();

    return (
      <div>
        {this.state.text.split("\n").map((item, key) => {
						a.set(key, item);
					}),
					console.log(a)
				}
      </div>
    );
  }
}

export default TextFileReader;
