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
import * as appAction from "../actions";
import Constants from "../constants";
import { moderateScale } from "../helpers/ResponsiveFonts";
import Header from "../components/common/Header";
import MySchedule from "../components/MySchedule";
import Avtar from "../components/common/Avatar";
import CustomModal from "../components/customModal";
import Filter from "../components/MySchedule/Filter";
import MyScheduleList from "../components/MySchedule/MyScheduleList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      prevDate: "12/1/2018",
      nextDate: "12/27/2018"
    };
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    // console.log("componendidmount");
    let { prevDate, nextDate } = this.state;
    this.props.appAction.fetchMySchedules(prevDate, nextDate);
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  patientDetails = () => {
    //  alert(patient);
  };

  fetchPatientDetails = patientId => {
    this.props.appAction.fetchPatientDetails(patientId, this.patientDetails);
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

  render() {
    let { isVisible, nextDate, prevDate } = this.state,
      { mySchedules } = this.props,
      { Close, UserImage } = Constants.Images;

    return (
      <View style={Styles.containner}>
        <Header title={"MY SCHEDULE"} onDrawerPress={this.onDrawerPress} />
        <Filter
          prevDate={moment(new Date(prevDate)).format("ddd DD MMMM")}
          nextDate={moment(new Date(nextDate)).format("DD MMMM YYYY")}
          prevPress={() => {}}
          nextPress={() => {}}
        />
        <MyScheduleList
          patitents={mySchedules}
          renderItem={this.renderPatients}
        />
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
              Jane Doe
            </Text>
            <Text style={[Styles.commonFontColor, Styles.smallOne]}>
              123 Main Rd. Philadephia Pa 19103
            </Text>
            <Text
              style={[
                Styles.commonFontColor,
                Styles.BoldText,
                Styles.paddingTop
              ]}
            >
              Schedular Name{" "}
            </Text>
            <Text style={[Styles.commonFontColorBold, Styles.smallOne]}>
              P{" "}
              <Text style={Styles.commonFontColor}>: +1(215) 389 -1800 /</Text>
              Ext <Text style={Styles.commonFontColor}> : 411</Text>
            </Text>
            <Text style={[Styles.commonFontColor, Styles.smallOne]}>
              actHomeHealth@yopmail.com
            </Text>
          </View>
        </CustomModal>
      </View>
    );
  }
}

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
  smallOne: {
    fontSize: moderateScale(15),
    paddingBottom: moderateScale(5),
    ...Platform.select({
      web: {
        fontSize: moderateScale(13)
      }
    })
  },
  commonFontColor: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Regular
  },
  commonFontColorBold: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Bold
  },
  paddingTop: {
    paddingTop: moderateScale(35)
  }
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  mySchedules: state.schedule.mySchedules
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
