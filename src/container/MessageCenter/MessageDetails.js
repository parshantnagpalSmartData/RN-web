import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DivContainer from "../../components/Common/DivContainer";

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
        ParentMessageID: message.MessageID,
        MessageGroupID: this.getRecipientsIndex(message.Recipient_GroupName)
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

  getRecipientsIndex = user => {
    let {
      messages: { recipients }
    } = this.props;
    let index = _.findIndex(recipients, item => item.name === user);
    if (index !== -1) {
      return recipients[index].index;
    }
  };

  getRecipientsLabel = user => {
    let {
      messages: { recipients }
    } = this.props;
    let index = _.findIndex(recipients, item => item.name === user);
    if (index !== -1) {
      return recipients[index].label;
    }
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

  getUserEmail = user => {
    let {
      messages: { recipients }
    } = this.props;
    let index = _.findIndex(recipients, item => item.name === user);
    if (index !== -1) {
      return recipients[index].email;
    }
  };
  render() {
    let {
      messages: { activeMessage, inbox, trash, sent, tab, recipients },
      user
    } = this.props;
    let { subject, MessageGroupID } = this.state;
    let currentTab = tab === "inbox" ? inbox : tab === "sent" ? sent : trash;
    let index = _.findIndex(
      currentTab,
      message => message.MessageID === activeMessage
    );
    let message = currentTab[index];
    if (index !== -1) {
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
          <View style={Styles.messageView}>
            <DivContainer
              className={"messageDetailTop"}
              styleApp={
                {
                  // justifyContent:"center",
                  // alignItem:'center'
                }
              }
              styleWeb={{}}
            >
              <View style={Styles.header}>
                <View style={Styles.UserImage}>
                  <Image
                    source={Constants.Images.UserImage}
                    style={Styles.UserImg}
                  />
                </View>
                <View style={Styles.userNameView}>
                  <View style={Styles.userView}>
                    <DivContainer className={"msgUserName"}>
                      <Text style={Styles.userName}>
                        {message && message.Recipient_GroupName}
                      </Text>
                    </DivContainer>
                    {Platform.OS !== "web" ? (
                      <Text style={Styles.timeLine}>
                        {timeSince(message && message.MessageDate)}
                      </Text>
                    ) : (
                        <Text style={Styles.timeLine}>
                          {this.getUserEmail(message.Recipient_GroupName)}
                        </Text>
                      )}
                  </View>
                  {Platform.OS === "web" ? (
                    <DivContainer className={"msgActions"}>
                      <Select
                        IconComponent={props => (
                          <TouchableOpacity
                            {...props}
                            onPress={this.props.toggleOpen}
                          >
                            <Image
                              source={Constants.Images.Menu}
                              style={{
                                height: moderateScale(20),
                                width: moderateScale(20)
                              }}
                            />
                          </TouchableOpacity>
                        )}
                        styles={{}}
                        value={1}
                        inputProps={{
                          name: "selectOption",
                          id: "selectOption"
                        }}
                        className={"SelectSide"}
                        onClose={() => { }}
                        onChange={event => {
                          this.props.onClose(event.target.value, message);
                        }}
                      >
                        <MenuItem value={"delete"}>Delete</MenuItem>
                        <MenuItem value={"reply"}>Reply </MenuItem>
                      </Select>
                    </DivContainer>
                  ) : null}
                </View>
              </View>
            </DivContainer>
            <View style={Styles.userInfo}>
              {Platform.OS === "web" ? (
                <View style={Styles.MessageSubject}>
                  <Text style={Styles.userName}>
                    {message && message.MessageSubject}
                  </Text>
                  <Text style={Styles.timeLine}>
                    {timeSince(message && message.MessageDate)}
                  </Text>
                </View>
              ) : null}
              {Platform.OS !== "web" ? (

                <ScrollView
                  contentContainerStyle={Styles.messageBody}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={Styles.messageBodyText}>
                    {message && message.MessageBody}
                  </Text>
                </ScrollView>

              ) : (
                  <DivContainer className={"messageTextView"}>
                    <View style={Styles.messageBody}>
                      <Text style={Styles.messageBodyText}>
                        {message && message.MessageBody}
                      </Text>
                    </View>
                  </DivContainer>
                )}
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
              to={MessageGroupID}
              tabLable={"Reply Message"}
              getRecipientsLabel={this.getRecipientsLabel}
            />
          </CustomModal>
        </View>
      );
    }
    return null;
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messageView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  header: {
    flexDirection: "row",
    ...Platform.select({
      web: {
        borderBottomWidth: 1,
        paddingVertical: moderateScale(10),
        borderBottomColor: "rgba(122,122,122,0.5)"
      }
    })
  },
  UserImage: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(100),
    padding: moderateScale(5)
  },
  UserImg: { height: moderateScale(50), width: moderateScale(50) },
  userInfo: { padding: moderateScale(5), flex: 1 },
  userNameView: {
    flex: 1,
    marginHorizontal: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Platform.select({
      web: {
        alignItems: "flex-start"
      }
    })
  },
  userView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    ...Platform.select({
      web: {
        flexDirection: "column"
      }
    })
  },
  MessageSubject: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: moderateScale(10)
  },
  userName: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    color: Constants.Colors.Primary
  },
  timeLine: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(11),
    color: Constants.Colors.Gray
  },
  messageBody: {
    paddingVertical: moderateScale(5),
    flex: 1
  },
  messageBodyText: {
    ...Constants.Fonts.Light,
    fontSize: moderateScale(12),
    color: Constants.Colors.Black,
    textAlign: "justify",
    textAlignVertical: "center"
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
