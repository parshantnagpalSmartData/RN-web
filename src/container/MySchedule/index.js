/*
FileName: index.js
Author :Parshant Nagpal
Description: contains the myschedule page 
Date : 13 december 2018
*/

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import * as appAction from "../../actions";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Header from "../../components/Common/Header";
import MySchedule from "../../components/MySchedule";
import Avtar from "../../components/Common/Avatar";
import CustomModal from "../../components/CustomModal";
import Filter from "../../components/Common/Filter";
import MyScheduleList from "../../components/MySchedule/MyScheduleList";
import MapApi from "../../helpers/MapApi";
import { openLinkingURL } from "../../helpers/Linking";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      page: 1,
      isVisible: false,
      prevDate: moment().format("MM/DD/YYYY"),
      nextDate: moment()
        .add(6, "d")
        .format("MM/DD/YYYY")
    };
    this.closeModal = this.closeModal.bind(this);
    this.openEmail = this.openEmail.bind(this);
    this.openTelephone = this.openTelephone.bind(this);
  }
  componentDidMount() {
    this.fetchMySchedules();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  patientDetails = () => {
    //  alert(patient);
  };

  fetchPatientDetails = schedule => {
    this.setState({ patient: schedule, isVisible: true });
  };

  renderPatients = ({ item, index }) => {
    return (
      <MySchedule
        item={item}
        index={index}
        onPatientPress={this.fetchPatientDetails}
        key={index}
      />
    );
  };
  closeModal() {
    this.setState({ isVisible: false });
  }

  onDateChange = (prevDate, nextDate) => {
    this.setState(
      {
        prevDate,
        nextDate
      },
      () => {
        this.fetchMySchedules();
      }
    );
  };

  /*
   * Method to open the telephone number
   */
  openTelephone(phoneNumber) {
    openLinkingURL("tel", phoneNumber);
  }
  /*
   * Method to open the telephone number
   */
  openEmail(email) {
    openLinkingURL("email", email);
  }
  /**
   * Method to open the google maps
   *
   */
  openMaps(dest) {
    MapApi.getCurrentPosition()
      .then(pos => {
        let { latitude, longitude } = pos;
        let source = {
          latitude,
          longitude
        };
        let destination = {
          latitude: dest.latitude,
          longitude: dest.longitude
        };
        MapApi.googleMapNavigate(source, destination);
      })
      .catch(e => console.warn(e)); //eslint-disable-line
  }

  fetchMySchedules = (refresh = false) => {
    let { prevDate, nextDate, page } = this.state;
    this.props.appAction.fetchMySchedules(page, prevDate, nextDate, refresh);
  };

  onCurrentPageEndReach = () => {
    let { myScheduleMeta } = this.props;
    let { page } = this.state;
    if (page < myScheduleMeta.totalPages) {
      this.setState({ page: page + 1 }, () => this.fetchMySchedules());
    }
  };

  onRefresh = () => {
    this.setState({ page: 1 }, () => this.fetchMySchedules(true));
  };

  render() {
    let { isVisible, nextDate, prevDate, patient } = this.state,
      { mySchedules, app } = this.props,
      { Close, UserImage } = Constants.Images;

    return (
      <View style={Styles.containner}>
        <Header title={"My Schedule"} onDrawerPress={this.onDrawerPress} />
        <Filter
          prevDate={new Date(prevDate)}
          nextDate={new Date(nextDate)}
          onDateChange={(prevDate, nextDate) =>
            this.onDateChange(prevDate, nextDate)
          }
        />

        <MyScheduleList
          patitents={mySchedules}
          renderItem={this.renderPatients}
          onPatientPress={this.fetchPatientDetails}
          loader={app.refreshLoader}
          appLoader={app.loading}
          onRefresh={this.onRefresh}
          onEndReached={this.onCurrentPageEndReach}
        />

        <CustomModal
          isVisible={isVisible}
          onBackdropPress={() => this.closeModal()}
          customStyles={customStyles}
        >
          <View style={Styles.ModalContainer}>
            <TouchableOpacity
              onPress={() => {
                this.closeModal();
              }}
              style={Styles.closeButton}
            >
              <Image style={Styles.closeImage} source={Close} />
            </TouchableOpacity>
            <Avtar source={UserImage} />
            <Text style={[Styles.commonFontColor, Styles.BoldText]}>
              {`${patient.Pat_LName}, ${patient.Pat_FName}`}
            </Text>
            <Text
              style={[Styles.commonFontColor, Styles.smallOne]}
              onPress={() =>
                this.openMaps({
                  latitude: patient.Patient_Latitude,
                  longitude: patient.Patient_Longitude
                })
              }
            >
              {`${patient.Patient_Address}, ${patient.Patient_City} ${
                patient.Patient_State
              } ${patient.Patient_Zip}`}
            </Text>
            <View style={Styles.centerLine} />
            <Text
              style={[
                Styles.commonFontColor,
                Styles.schedularName,
                Styles.paddingTop
              ]}
            >
              {Constants.Strings.MySchedule.SchdeularName}
            </Text>
            <Text
              style={[
                Styles.commonFontColor,
                Styles.smallOne,
                Styles.schedularFullName
              ]}
            >
              {`${patient.Scheduler_LastName}, ${patient.Scheduler_FirstName}`}
            </Text>
            <Text
              style={[Styles.commonFontColorBold, Styles.smallOne]}
              onPress={() => this.openTelephone(patient.Scheduler_Phone)}
            >
              P{" "}
              <Text style={Styles.commonFontColor}>
                : {patient.Scheduler_Phone} /
              </Text>
              Ext{" "}
              <Text style={Styles.commonFontColor}>
                {" "}
                : {patient.Scheduler_Extension}
              </Text>
            </Text>
            <Text
              style={[Styles.commonFontColor, Styles.smallOne]}
              onPress={() => this.openEmail(patient.Scheduler_Email)}
            >
              {patient.Scheduler_Email}
            </Text>
          </View>
        </CustomModal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  mySchedules: state.schedule.mySchedules,
  myScheduleMeta: state.schedule.myScheduleMeta
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  },
  ModalContainer: {
    backgroundColor: Constants.Colors.White,
    height: moderateScale(380),
    marginHorizontal: moderateScale(12),
    borderRadius: moderateScale(10),
    paddingTop: moderateScale(50),
    alignItems: "center",
    ...Platform.select({
      web: {
        height: moderateScale(250),
        width: moderateScale(400),
        paddingTop: moderateScale(0),
        marginHorizontal: moderateScale(12)
      }
    })
  },
  centerLine: {
    height: moderateScale(10),
    width: moderateScale(250),
    borderBottomColor: Constants.Colors.Gray,
    borderBottomWidth: 1
  },
  closeImage: {
    height: moderateScale(20),
    width: moderateScale(20)
  },
  closeButton: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10),
    ...Platform.select({
      web: {
        top: moderateScale(1),
        right: moderateScale(0)
      }
    })
  },
  schedularName: {
    fontSize: moderateScale(20),
    color: Constants.Colors.Black,
    ...Platform.select({
      web: {
        fontSize: moderateScale(16)
      }
    })
  },

  BoldText: {
    fontSize: moderateScale(20),
    paddingBottom: moderateScale(5),
    paddingTop: moderateScale(15),
    color: Constants.Colors.Black,
    ...Platform.select({
      web: {
        fontSize: moderateScale(16),
        paddingBottom: moderateScale(0),
        paddingTop: moderateScale(0)
      }
    })
  },
  schedularFullName: {
    color: Constants.Colors.Black
  },
  smallOne: {
    fontSize: moderateScale(15),
    paddingBottom: moderateScale(5),
    ...Platform.select({
      web: {
        fontSize: moderateScale(13),
        paddingBottom: moderateScale(0)
      }
    })
  },
  commonFontColor: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Regular,
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: moderateScale(5)
  },
  commonFontColorBold: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Bold
  },
  paddingTop: {
    paddingTop: moderateScale(20),
    ...Platform.select({
      web: {
        paddingTop: moderateScale(10)
      }
    })
  },
  noScheduleFoundText: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(20),
    ...Platform.select({
      web: {
        fontSize: moderateScale(15)
      }
    })
  }
});
