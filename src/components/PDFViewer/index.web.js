/**
 * Name : Parshant Nagpal
 * FileName: PrintableForms
 * Description : Contains the pdf rendering part for web
 */

import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import { Text } from "react-native";
import ReactToPrint from "react-to-print";

const createTable = numPages => {
  let table = [];

  for (let i = 1; i <= numPages; i++) {
    table.push(
      <div>
        <div className={"pdfPageCount"}>
          <Text>
            {" "}
            Page {i} of {numPages}
          </Text>
        </div>
        <Page pageNumber={i} />
      </div>
    );
  }
  return table;
};

class ViewPDF extends React.Component {
  render() {
    let { onDocumentLoadSuccess, loadError, numPages, base64Data } = this.props;
    return (
      <div className={"pdfpopupScroll"}>
        <Document
          // file="https://cors-anywhere.herokuapp.com/https://www.antennahouse.com/XSLsample/pdf/sample-link_1.pdf"
          // file="https://cors-anywhere.herokuapp.com/http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
          file={"data:application/pdf;base64," + base64Data.file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={loadError}
          // renderMode={'svg'}
          scale={0.5}
        >
          {createTable(numPages)}
        </Document>
      </div>
    );
  }
}

class PDF extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a>Print this out!</a>}
          content={() => this.componentRef}
        />
        <ViewPDF {...this.props} ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}
export default PDF;
