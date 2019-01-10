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
import Header from "../../components/common/Header";
import MySchedule from "../../components/MySchedule";
import Avtar from "../../components/common/Avatar";
import CustomModal from "../../components/customModal";
import Filter from "../../components/MySchedule/Filter";
import MyScheduleList from "../../components/MySchedule/MyScheduleList";
import { googleMapNavigate } from "../../helpers/MapDirections";
import { openLinkingURL } from "../../helpers/Linking";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      page: 1,
      isVisible: false,
      prevDate: moment().format("MM/DD/YYYY"),
      nextDate: moment()
        .add(7, "d")
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
  openTelephone() {
    openLinkingURL("tel", "+919041908803");
  }
  /*
   * Method to open the telephone number
   */
  openEmail() {
    openLinkingURL("email", "nagpal.parshant8@gmail.com");
  }
  /**
   * Method to open the google maps
   *
   */
  openMaps(latitude, longitude) {
    let source = {
      latitude: 30.7046,
      longitude: 76.7179
    };
    let destination = {
      latitude,
      longitude
    };
    googleMapNavigate(source, destination);
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
        {!app.loading && !mySchedules.length ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={Styles.noScheduleFoundText}>No Schedule Found</Text>
          </View>
        ) : (
          <MyScheduleList
            patitents={mySchedules}
            renderItem={this.renderPatients}
            onPatientPress={this.fetchPatientDetails}
            loader={app.refreshLoader}
            onRefresh={this.onRefresh}
            onEndReached={this.onCurrentPageEndReach}
          />
        )}
        <CustomModal
          isVisible={isVisible}
          onBackdropPress={() => this.closeModal()}
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
              {`${patient.Pat_FName} ${patient.Pat_LName}`}
            </Text>
            <Text
              style={[Styles.commonFontColor, Styles.smallOne]}
              onPress={() =>
                this.openMaps(
                  patient.Patient_Latitude,
                  patient.Patient_Longitude
                )
              }
            >
              {`${patient.Patient_Address}, ${patient.Patient_City} ${
                patient.Patient_State
              } ${patient.Patient_Zip}`}
            </Text>
            <View style={Styles.centerLine}>
            </View>
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
              {`${patient.Scheduler_FirstName} ${patient.Scheduler_LastName}`}
            </Text>
            <Text
              style={[Styles.commonFontColorBold, Styles.smallOne]}
              onPress={() => this.openTelephone()}
            >
              P{" "}
              <Text style={Styles.commonFontColor}>: +1(215) 389 -1800 /</Text>
              Ext <Text style={Styles.commonFontColor}> : 411</Text>
            </Text>
            <Text
              style={[Styles.commonFontColor, Styles.smallOne]}
              onPress={() => this.openEmail()}
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
    height:moderateScale(10),
    width : moderateScale(250),
    borderBottomColor : Constants.Colors.Gray,
     borderBottomWidth : 1
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
  
    color: Constants.Colors.Black,
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
    textAlignVertical: "center"
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
