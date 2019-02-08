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

import * as appAction from "../../../actions";
import Header from "../../../components/Common/Header";
import Constants from "../../../constants";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import { timeSince } from "../../../helpers/common";
import RightComponent from "../../../components/Common/RightComponent";
import Compose from "../Compose";
import CustomModal from "../../../components/CustomModal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DivContainer from "../../../components/Common/DivContainer";
// import AuthButton from "../../components/Common/AuthButton";
class MessageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composeModal: false,
      message: "",
      subject: "",
      MessageGroupID: null,
      ParentMessageID: null,
      recipientNameError: "",
      subjectError: "",
      messageError: ""
    };
  }
  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };

  onRightPress = message => {
    this.setState({
      composeModal: true,
      subject: "Re:" + message.MessageSubject,
      ParentMessageID: message.MessageID,
      MessageGroupID: this.getRecipientsIndex(message.Recipient_GroupName)
    });
  };

  onComposeModalClose = () => {
    this.setState({ composeModal: false });
  };

  onChangeRecipient = recipient => {
    this.setState({ MessageGroupID: recipient, recipientNameError: "" });
  };

  onChangeSubject = subject => {
    this.setState({ subject, subjectError: "" });
  };

  onChangeMessage = message => {
    this.setState({ message, messageError: "" });
  };

  getRecipientsIndex = user => {
    let {
      messages: { recipients }
    } = this.props;
    let index = _.findIndex(recipients, item => item.name === user);
    if (index !== -1) {
      return recipients[index].value;
    }
  };

  getRecipientsLabel = user => {
    let {
      messages: { recipients }
    } = this.props;
    let index = _.findIndex(recipients, item => item.value === user);
    if (index !== -1) {
      return recipients[index].label;
    }
  };

  onComposePress = () => {
    let { MessageGroupID, subject, message } = this.state;
    let { appAction } = this.props;
    if (MessageGroupID === null || MessageGroupID === undefined) {
      this.setState({
        recipientNameError: Constants.Strings.Common.EmptyRecipient
      });
      return;
    } else if (_.isEmpty(subject.trim())) {
      this.setState({
        subjectError: Constants.Strings.Common.EmptySubject
      });
      return;
    } else if (_.isEmpty(message.trim())) {
      this.setState({
        messageError: Constants.Strings.Common.EmptyMessage
      });
      return;
    } else {
      let obj = {
        MessageSubject: subject,
        MessageBody: message,
        ParentMessageID: null,
        MessageGroupID: MessageGroupID
      };
      appAction.composeMessage(obj, null);
      this.onComposeModalClose();
    }
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
    let {
      subject,
      MessageGroupID,
      recipientNameError,
      subjectError,
      messageError
    } = this.state;
    let currentTab = tab === "inbox" ? inbox : tab === "sent" ? sent : trash;
    let index = _.findIndex(
      currentTab,
      message => message.MessageID === activeMessage
    );
    let message = currentTab[index];
    if (index !== -1) {
      return (
        <View style={Styles.container}>
          {Platform.OS !== "web" ||
          (Platform.OS == "web" && Constants.BaseStyle.DEVICE_WIDTH < 772) ? (
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
                    resizeMode={"contain"}
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
                        onClose={() => {}}
                        onChange={event => {
                          this.props.onClose(event.target.value, message);
                        }}
                      >
                        <MenuItem value={"delete"}>Delete</MenuItem>
                        <MenuItem value={"reply"}>Reply </MenuItem>
                      </Select>
                    </DivContainer>
                  ) : (
                    <View style={Styles.userView}>
                      <Text
                        style={[
                          Styles.timeLine,
                          { paddingLeft: moderateScale(10) }
                        ]}
                      >
                        {this.getUserEmail(message.Recipient_GroupName)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </DivContainer>
            <DivContainer className="divWrapper" styleApp={{ flex: 1 }}>
              <View style={Styles.userInfo}>
                {Platform.OS === "web" ? (
                  <View style={Styles.MessageSubject}>
                    <DivContainer className={"msgSubject"}>
                      <Text style={Styles.userName}>
                        {message && message.MessageSubject}
                      </Text>
                    </DivContainer>
                    <Text style={Styles.timeLine}>
                      {timeSince(message && message.MessageDate)}
                    </Text>
                  </View>
                ) : null}
                {Platform.OS !== "web" ? (
                  <ScrollView
                    contentContainerStyle={[
                      Styles.messageBody,
                      { paddingVertical: 0, paddingLeft: moderateScale(65) }
                    ]}
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
                {/* {Platform.OS === "web" ? (
                  <DivContainer
                    styleApp={Styles.divStyle}
                    styleWeb={Styles.divStyle}
                    className={"ButtonContainer"}
                  >
                    <AuthButton
                      buttonStyle={Styles.buttonStyle}
                      onPress={() => { }}
                      gradientStyle={Styles.gradientStyle}
                      buttonName={"Reply"}
                    />
                    <AuthButton
                      buttonStyle={Styles.buttonStyle}
                      gradientStyle={Styles.gradientStyle}
                      onPress={() => { }}
                      buttonName={"Delete"}
                    />
                  </DivContainer>
                ) : null} */}
              </View>
            </DivContainer>
          </View>

          <CustomModal
            isVisible={this.state.composeModal}
            onBackdropPress={this.onComposeModalClose}
            style={{ margin: 0 }}
            customStyles={{}}
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
              recipientNameError={recipientNameError}
              subjectError={subjectError}
              messageError={messageError}
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
  conCatContaner: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.7
  },
  messageView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  header: {
    flexDirection: "row",
    padding: moderateScale(10),
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
    width: moderateScale(60),
    borderRadius: moderateScale(100)
  },
  UserImg: { height: moderateScale(50), width: moderateScale(50) },
  userInfo: { padding: moderateScale(5), flex: 1 },
  userNameView: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-between",

    ...Platform.select({
      web: {
        marginHorizontal: moderateScale(10),
        alignItems: "center"
      },
      ios: {
        flexDirection: "column"
      },
      android: {
        flexDirection: "column"
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
    color: Constants.Colors.Primary,
    ...Platform.select({
      ios: {
        paddingLeft: moderateScale(10)
      },
      android: {
        paddingLeft: moderateScale(10)
      }
    })
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
  },
  divStyle: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: moderateScale(5),
    flexDirection: "row"
  },
  buttonStyle: {
    minWidth: moderateScale(100),
    margin: moderateScale(10)
  },
  gradientStyle: {
    padding: moderateScale(5)
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
