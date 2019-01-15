/**
 * Name : Parshant Nagpal
 * FileName: PrintableForms
 * Description : Contains the pdf rendering part for web
 */

import React from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";

const PrintableForms = ({
  onDocumentLoadSuccess,
  loadError,
  numPages,
  pageNumber
}) => {
  return (
    <div>
      <Document
        // file="https://cors-anywhere.herokuapp.com/https://www.antennahouse.com/XSLsample/pdf/sample-link_1.pdf"
        file="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={loadError}
      >
        <Page pageNumber={1} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
export default PrintableForms;
