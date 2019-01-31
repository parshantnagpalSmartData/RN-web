import RNFetchBlob from "rn-fetch-blob";
import RNPrint from "react-native-print";

export const printPDF = async base64PrintableData => {
  const dirs = RNFetchBlob.fs.dirs;

  var path = dirs.DocumentDir + "/data.pdf";

  RNFetchBlob.fs
    .writeFile(path, base64PrintableData.file, "base64")
    .then(async () => {
      await RNPrint.print({ filePath: dirs.DocumentDir + "/data.pdf" });
    });

  // await RNPrint.print({ filePath: 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf' })
  // await RNPrint.print({ filePath: "data:application/pdf;base64," + base64PrintableData.file })
};
