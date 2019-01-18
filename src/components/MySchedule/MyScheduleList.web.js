/**
 * Name :Parshant Nagpal
 * Description: Contains  MySchedule  component for web
 * Date : 3 Jan 2019
 * File: MyScheduleList.web.js
 */
/* eslint-disable*/

import React from "react";
import ReactTable from "react-table";
import moment from "moment";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
// import 'react-table/react-table.css'

let spanHeaderStyle = {
    height: moderateScale(32),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#545d62"
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
      textAlign: "center",
      color: "#848484",
      fontSize: moderateScale(11),
      ...Constants.Fonts.Regular
    }
  },
  scheduleColor = { color: "rgba(54, 156, 18, 0.7)" },
  nonScheduleColor = { color: "rgba(228, 67, 46, 0.7)" };
const MyScheduleList = ({ patitents, onPatientPress }) => {
  return (
    <div className={"contentScroll"}>
      <ReactTable
        style={{
          // marginLeft: moderateScale(18),
          // marginRight: moderateScale(18),
          maxHeight: "400px"
        }}
        data={patitents}
        columns={[
          {
            // Header: "Date",
            Header: () => <span style={spanHeaderStyle}>Date</span>,
            accessor: "SchedDate",
            headerStyle: headerStyle,
            getProps: () => cellStyle,
            Cell: props => (
              <span className="cusor-point">
                {moment(props.value).format("DD MMM YYYY")}
              </span>
            )
          },
          {
            // Header: "Name",
            Header: () => <span style={spanHeaderStyle}>Name</span>,
            accessor: "Pat_LName",
            headerStyle: headerStyle,
            getProps: () => cellStyle,
            Cell: props => (
              <span className="cusor-point">
                {props.value + " " + props.original.Pat_FName}
              </span>
            )
          },
          {
            // Header: "Time",
            Header: () => <span style={spanHeaderStyle}>Time</span>,
            accessor: "StartTime",
            headerStyle: headerStyle,
            getProps: () => cellStyle,
            Cell: props => <span className="cusor-point">{props.value}</span>
          },
          {
            // Header: "Status",
            Header: () => <span style={spanHeaderStyle}>Status</span>,
            accessor: "StatusName",
            headerStyle: headerStyle,
            getProps: () => cellStyle,
            Cell: props => (
              <span
                className="cusor-point"
                style={
                  props.value == "Scheduled" ? scheduleColor : nonScheduleColor
                }
              >
                {props.value}
              </span>
            )
          }
        ]}
        showPagination={true}
        getFooterProps={(state, rowInfo, column, instance) => ({
          color: "red"
        })}
        defaultPageSize={10}
        previousText={"Previous"}
        nextText={"Next"}
        loadingText={"Loading..."}
        noDataText={"No rows found"}
        // NextComponent={Button}
        className="-striped -highlight"
        getTrProps={(state, rowInfo, column) => {
          return {
            onClick: () => {
              onPatientPress(rowInfo.original);
            }
          };
        }}
      />
    </div>
  );
};

export default MyScheduleList;
