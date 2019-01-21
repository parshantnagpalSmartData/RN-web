/**
 * Name :Parshant Nagpal
 * Description: Contains  MySchedule  component for web
 * Date : 3 Jan 2019
 * File: MyScheduleList.web.js
 */
/* eslint-disable*/

import React from "react";
import ReactTable from "react-table";
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

let spanHeaderStyle = {
    height: moderateScale(32),
    display: "flex",
    alignItems: "center",   
    justifyContent: "flex-start",
    color: "#545d62",
    paddingLeft: moderateScale(20)
  },
  spanCellStyle=  {
    height: moderateScale(32),
    display: "flex",
    alignItems: "center",   
    justifyContent: "flex-start",
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
  }
const RenderPrintableForms = ({ data, onFormPress }) => {
  return (
    <div className={""}>
    <View style={Styles.mainContainer}>
      <ReactTable
        style={{
          maxHeight: "200px",
          width : Constants.BaseStyle.DEVICE_WIDTH*0.70,
      
        }}
        data={data}
        columns={[
          {
            // Header: "Date",
            width: Constants.BaseStyle.DEVICE_WIDTH*0.60,
            Header: () => <span style={spanHeaderStyle}>FORMS</span>,
            accessor: "FormName",
            headerStyle: headerStyle,
            getProps: () => cellStyle,
            className: "formNameAlignLeft",
            Cell: props => (
              <span
              style={spanCellStyle}>
                {props.value}
              </span>
            )
          },
          {
            // Header: "Status",
            width: Constants.BaseStyle.DEVICE_WIDTH*0.10,
            Header: () => <span style={spanHeaderStyle}>ACTION</span>,
            accessor: "StatusName",
            headerStyle: headerStyle,
            getProps: () => cellStyle,
            Cell: props => (
              <span
               style={spanCellStyle}
              className="cusor-point"
              >
            <TouchableOpacity
                    style={Styles.iconView}
                    onPress={() => onFormPress(props.FormUrl)}
                >
                    <Image
                    source={Constants.Images.Downloads}
                    resizeMode={"contain"}
                    style={Styles.icon}
                    />
                </TouchableOpacity>   
              </span>
            )
          }
        ]}
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
        alignItems : 'center'
    },
    iconView: {
        height: moderateScale(30),
        width: moderateScale(30),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateScale(10)
      },
      icon: { height: moderateScale(30), width: moderateScale(30) }
})
export default RenderPrintableForms;
