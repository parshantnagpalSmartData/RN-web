/* eslint-disable  */

import React from "react";
import ReactTable from "react-table";
import moment from "moment";
// import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
// import 'react-table/react-table.css'

const MyScheduleList = ({ patitents }) => {
  return (
    <div>
      <ReactTable
        data={patitents}
        columns={[
          {
            Header: "Date",
            accessor: "SchedDate",
            headerStyle: {
              backgroundColor: "#e2ebf0",
              height: moderateScale(32)
            },
            getProps: () => ({
              style: {
                textAlign: "center"
              }
            }),
            Cell: props => (
              <span className="number">
                {moment(props.value).format("DD MMM YYYY")}
              </span>
            ) // Custom cell components!
          },
          {
            Header: "Name",
            accessor: "Pat_LName",
            headerStyle: {
              backgroundColor: "#e2ebf0",
              height: moderateScale(32)
            },
            getProps: () => ({
              style: {
                textAlign: "center"
              }
            })
          },
          {
            Header: "Time",
            accessor: "StartTime",
            headerStyle: {
              backgroundColor: "#e2ebf0",
              height: moderateScale(32)
            },
            getProps: () => ({
              style: {
                textAlign: "center"
              }
            })
          },
          {
            Header: "Status",
            accessor: "StatusName",
            headerStyle: {
              backgroundColor: "#e2ebf0",
              height: moderateScale(32)
            },
            getProps: () => ({
              style: {
                textAlign: "center"
              }
            })
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
};

export default MyScheduleList;
