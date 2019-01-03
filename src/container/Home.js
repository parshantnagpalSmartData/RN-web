import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../actions";
import Constants from "../constants";
import { moderateScale } from "../helpers/ResponsiveFonts";
import Header from "../components/common/Header";
import MySchedule from "../components/MySchedule";
import Avtar from "../components/common/Avatar";
import CustomModal from "../components/customModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.props.appAction.fetchMySchedules(this.props.user.token);
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  renderPatients = ({ item, index }) => {
    return <MySchedule item={item} index={index} />;
  };
  closeModal() {
    this.setState({ isVisible: false });
  }

  render() {
    let patitents = [
        {
          _id: 1,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 2,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 3,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 4,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 5,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 6,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 7,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 8,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 9,
          name: "Suraj Sanwal",
          from: "9 am",
          to: "11 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        },
        {
          _id: 10,
          name: "Suraj Sanwal",
          from: "12 am",
          to: "13 pm",
          type: "scheduled",
          date: "9",
          day: "Tue"
        }
      ],
      { isVisible } = this.state,
      { Close, UserImage } = Constants.Images;
    return (
      <View style={Styles.containner}>
        <Header title={"My Schedule"} onDrawerPress={this.onDrawerPress} />
        <FlatList
          data={patitents}
          keyExtractor={item => item._id.toString()}
          renderItem={this.renderPatients}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            ...Platform.select({
              web: {
                overflow: "hidden"
                //width: Constants.BaseStyle.DEVICE_WIDTH
              }
            })
          }}
          contentContainerStyle={{
            ...Platform.select({
              web: {
                // backgroundColor : 'red'
                //   justifyContent: "center",
              }
            })
          }}
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
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
