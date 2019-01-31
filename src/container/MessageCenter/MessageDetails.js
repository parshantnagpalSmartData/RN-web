import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import { timeSince } from "../../helpers/common";
import RightComponent from "../../components/Common/RightComponent";
import Compose from "./Compose.js";
import CustomModal from "../../components/CustomModal";

class MessageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composeModal: false,
      message: "",
      subject: "",
      MessageGroupID: null,
      ParentMessageID: null
    };
  }
  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };

  onRightPress = message => {
    this.setState(
      {
        composeModal: true,
        subject: "Re:" + message.MessageSubject,
        ParentMessageID: message.MessageID
      },
      () => {
        this.props.appAction.getRecipients();
      }
    );
  };

  onComposeModalClose = () => {
    this.setState({ composeModal: false });
  };

  onChangeRecipient = recipient => {
    this.setState({ MessageGroupID: recipient });
  };

  onChangeSubject = subject => {
    this.setState({ subject });
  };

  onChangeMessage = message => {
    this.setState({ message });
  };

  onComposePress = () => {
    let { MessageGroupID, subject, message, ParentMessageID } = this.state;
    let obj = {
      MessageSubject: subject,
      MessageBody: message,
      ParentMessageID,
      MessageGroupID
    };
    this.props.appAction.composeMessage(obj);
    this.onComposeModalClose();
  };

  render() {
    let {
      messages: { activeMessage, inbox, trash, sent, tab, recipients },
      user
    } = this.props;
    let { subject, to } = this.state;
    let currentTab = tab === "inbox" ? inbox : tab === "sent" ? sent : trash;
    let index = _.findIndex(
      currentTab,
      message => message.MessageID === activeMessage
    );
    let message = currentTab[index];
    return (
      <View style={Styles.container}>
        {Platform.OS !== "web" ? (
          <Header
            title={"Message Details"}
            hideDrawer
            onBackPress={this.onBackPress}
            rightComponent={<RightComponent icon={Constants.Images.Reply} />}
            onRightPress={() => this.onRightPress(message)}
          />
        ) : null}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: moderateScale(50),
              width: moderateScale(50),
              borderRadius: moderateScale(100),
              padding: moderateScale(5)
            }}
          >
            <Image
              source={Constants.Images.UserImage}
              style={{ height: moderateScale(50), width: moderateScale(50) }}
            />
          </View>
          <View style={{ padding: moderateScale(10), flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  ...Constants.Fonts.Regular,
                  fontSize: moderateScale(16),
                  color: Constants.Colors.Primary
                }}
              >{`${message && message.Sender_LastName}, ${message &&
                message.Sender_FirstName}`}</Text>
              <Text
                style={{
                  ...Constants.Fonts.Regular,
                  fontSize: moderateScale(11),
                  color: Constants.Colors.Gray
                }}
              >
                {timeSince(message && message.MessageDate)}
              </Text>
            </View>
            <View style={{ paddingVertical: moderateScale(5) }}>
              <Text
                style={{
                  ...Constants.Fonts.Light,
                  fontSize: moderateScale(12),
                  color: Constants.Colors.Black
                }}
              >
                {message && message.MessageBody}
              </Text>
            </View>
          </View>
        </View>
        <CustomModal
          isVisible={this.state.composeModal}
          onBackdropPress={this.onComposeModalClose}
          style={{ margin: 0 }}
        >
          <Compose
            user={user}
            onClose={this.onComposeModalClose}
            recipients={recipients}
            onChangeRecipient={this.onChangeRecipient}
            onChangeMessage={this.onChangeMessage}
            onChangeSubject={this.onChangeSubject}
            onComposePress={this.onComposePress}
            subject={subject}
            to={to}
            tabLable={"Reply Message"}
          />
        </CustomModal>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  messages: state.messages
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetails);
