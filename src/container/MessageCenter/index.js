/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the message center component
Date : 13 december 2018
*/
/* eslint-disable */
import React, { Component } from "React";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";

import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";

import { bindActionCreators } from "redux";
import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const rightButtons = [
  {
    component: (
      <View
        style={{
          height: moderateScale(40),
          width: moderateScale(40),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={Constants.Images.Trash}
          style={{
            height: moderateScale(40),
            width: moderateScale(40)
          }}
        />
      </View>
    )
  }
];
const MessageComponent = ({ data, enableScrollingFunction }) => {
  if (data) {
    return data.map(message => {
      return (
        <Swipeout
          right={rightButtons}
          sensitivity={400}
          scroll={data => {
            enableScrollingFunction(data);
          }}
        >
          <View
            style={{
              height: moderateScale(60),
              width: Constants.BaseStyle.DEVICE_WIDTH,
              flexDirection: "row",
              marginVertical: moderateScale(1),
              padding: moderateScale(5),
              backgroundColor: Constants.Colors.White,
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: moderateScale(10)
              }}
            >
              <Image
                style={{
                  height: moderateScale(40),
                  width: moderateScale(40)
                }}
                source={Constants.Images.UserAvatar}
                resizeMode={"contain"}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                padding: moderateScale(5)
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1
                }}
              >
                <Text
                  style={{
                    ...Constants.Fonts.Regular,
                    fontSize: moderateScale(16),
                    color: Constants.Colors.Primary
                  }}
                >
                  {`${message.Sender_LastName} ${message.Sender_FirstName}`}
                </Text>
                <Text
                  style={{
                    ...Constants.Fonts.Regular,
                    fontSize: moderateScale(11),
                    color: Constants.Colors.Black
                  }}
                >
                  4 Mins
                </Text>
              </View>
              <Text
                style={{
                  ...Constants.Fonts.Regular,
                  fontSize: moderateScale(12),
                  color: Constants.Colors.Black
                }}
              >
                {message.MessageSubject}
              </Text>
            </View>
          </View>
        </Swipeout>
      );
    });
  } else {
    return null;
  }
};

class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "inbox"
    };
  }

  componentDidMount() {
    this.getTabRelatedMessages();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };
  enableScrollingFunction = data => {
    let context = this;
    console.log("ref", this.refs);
    if (Platform.OS == "ios") {
      this.refs.scrollView.scrollView.setNativeProps({ scrollEnabled: data });
    } else if (Platform.OS == "android") {
      if (data) {
        setTimeout(() => {
          enableParentScrolling = data;
          context.setState({ enableParentScrolling: data });

          // context.refs.scrollView.setScrollEnabled(data);
          // this.refs.scrollView.scrollView.setNativeProps({
          //   scrollEnabled: data
          // });
        }, 2000);
      } else {
        enableParentScrolling = data;
        context.setState({ enableParentScrolling: data });

        // context.refs.scrollView.setScrollEnabled(data);
        // this.refs.scrollView.scrollView.setNativeProps({
        //   scrollEnabled: false
        // });
      }
    }
  };

  getTabRelatedMessages = () => {
    let { appAction } = this.props;
    let { tab } = this.state;
    appAction.getMessages(tab);
  };

  updateTabIndex = tab => {
    this.setState({ tab }, () => this.getTabRelatedMessages());
  };

  render() {
    let { enableParentScrolling } = this.state;
    let { messages } = this.props;
    console.log("props", this.props);
    let { inbox, sent, trash } = messages;
    return (
      <View style={Styles.containner}>
        <Header title={"Message Center"} onDrawerPress={this.onDrawerPress} />
        <ScrollableTabView
          initialPage={0}
          // renderTabBar={() => <DefaultTabBar />}
          onChangeTab={tab => {
            this.updateTabIndex(tab.ref.props.tab);
          }}
          ref={"scrollView"}
          locked={!enableParentScrolling}
          tabBarActiveTextColor={Constants.Colors.Primary}
          tabBarInactiveTextColor={Constants.Colors.Gray}
          tabBarTextStyle={{
            ...Constants.Fonts.Medium,
            fontSize: moderateScale(12),
            color: Constants.Colors.Primary
          }}
        >
          <MessageComponent
            tabLabel="Inbox"
            tab="index"
            data={inbox}
            enableScrollingFunction={data => {
              this.enableScrollingFunction(data);
            }}
          />
          <MessageComponent
            tabLabel="Sent"
            tab="sent"
            data={sent}
            enableScrollingFunction={data => {
              this.enableScrollingFunction(data);
            }}
          />
          <MessageComponent
            tabLabel="Trash"
            tab="trash"
            data={trash}
            enableScrollingFunction={data => {
              this.enableScrollingFunction(data);
            }}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    justifyContent: "center",
    height: 50
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  backTextWhite: {
    color: "#FFF"
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  controls: {
    alignItems: "center",
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  },
  switch: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    width: 100
  }
});
const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageCenter);
