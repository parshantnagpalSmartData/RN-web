/**
 * Name :Parshant Nagpal
 * Description: Contains  MySchedule  component for web
 * Date : 3 Jan 2019
 * File: MyScheduleList.web.js
 */
/* eslint-disable*/

import React from "react";
import ReactTable from "react-table";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import ResourceButton from "../Common/ResourcesButton";

let spanHeaderStyle = {
    height: moderateScale(32),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#545d62",
    paddingLeft: moderateScale(20)
  },
  spanCellStyle = {
    height: moderateScale(32),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  headerStyle = {
    backgroundColor: "#e2ebf0",
    borderWidth: 0,
    // fontWeight: "bold",
    fontSize: moderateScale(11),
    ...Constants.Fonts.Medium
  },
  cellStyle = {
    style: {
      textAlign: "left",
      color: "#848484",
      fontSize: moderateScale(11),
      paddingLeft: moderateScale(20),
      ...Constants.Fonts.Regular
    }
  };

// const getColumns=()=> {
//   return Object.keys(data.initial_data[0]).map(key => {
//     return {
//       Header: key,
//       accessor: key
//     };
//   });

const CommonUrlHandlerForms = ({ data, onFormPress, printable }) => {
  console.log("datdatadtadtdat", data);
  const columns = [
    {
      // Header: "Date",
      width: Constants.BaseStyle.DEVICE_WIDTH * 0.6,
      Header: () => (
        <span style={spanHeaderStyle}>{printable ? "FORMS" : "RESOURCES"}</span>
      ),
      accessor: printable ? "FormName" : "ResourceName",
      headerStyle: headerStyle,
      getProps: () => cellStyle,
      className: "formNameAlignLeft",
      Cell: props => <span style={spanCellStyle}>{props.value}</span>
    },
    {
      // Header: "Status",
      width: Constants.BaseStyle.DEVICE_WIDTH * 0.1,
      Header: () => <span style={spanHeaderStyle}>ACTION</span>,
      accessor: printable ? "FormUrl" : "ResourceURL",
      headerStyle: headerStyle,
      getProps: () => cellStyle,
      Cell: props => (
        <span style={spanCellStyle} className="cusor-point">
          <ResourceButton
            source={
              printable ? Constants.Images.Downloads : Constants.Images.Search
            }
            onFormPress={onFormPress}
            formUrl={props.value}
          />
        </span>
      )
    }
  ];
  return (
    <div className={""}>
      <View style={Styles.mainContainer}>
        <ReactTable
          style={{
            maxHeight: "200px",
            width: Constants.BaseStyle.DEVICE_WIDTH * 0.7
          }}
          data={data}
          columns={columns}
          showPagination={false}
          loadingText={"Loading..."}
          noDataText={"No rows found"}
        />
      </View>
    </div>
  );
};

const Styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center"
  },
  iconView: {
    height: moderateScale(30),
    width: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(10)
  },
  icon: { height: moderateScale(30), width: moderateScale(30) }
});

CommonUrlHandlerForms.defaultProps = {
  data: [],
  onFormPress: null,
  printable: false
};

CommonUrlHandlerForms.propTypes = {
  data: PropTypes.array,
  onFormPress: PropTypes.func,
  printable: PropTypes.bool
};

export default CommonUrlHandlerForms;
