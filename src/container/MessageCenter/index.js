/*
FileName: index.js
Author :Suraj Sanwal
Description: Contains the message center component
Date : 13 december 2018
*/
import React, { Component } from "React";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { bindActionCreators } from "redux";
import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import CustomTabBar from "../../components/Common/CustomTabBar";
import SwiperContainer from "../../components/MessageCenter";
import RightComponent from "../../components/Common/RightComponent";
import constants from "../../constants";
import CustomModal from "../../components/CustomModal";
import Compose from "./Compose.js";
import { Dialog } from "../../helpers/common";

class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "inbox",
      enableParentScrolling: true,
      composeModal: false,
      message: "",
      subject: "",
      MessageGroupID: null
    };
  }

  componentDidMount() {
    this.getTabRelatedMessages();
    this.props.appAction.getRecipients();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  getTabRelatedMessages = () => {
    let { appAction } = this.props;
    let { tab } = this.state;
    appAction.getMessages(tab);
  };

  updateTabIndex = tab => {
    this.setState({ tab }, () => this.getTabRelatedMessages());
  };

  onDeletePress = message => {
    let { tab } = this.state;
    let { appAction } = this.props;
    if (tab !== "trash") {
      Dialog("Are you sure want to delete this message?", [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Ok",
          onPress: () => appAction.deleteMessage(message.MessageID, tab, null)
        }
      ]);
    }
  };

  onRightPress = () => {
    this.setState({ composeModal: true });
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
    let { MessageGroupID, subject, message } = this.state;
    let obj = {
      MessageSubject: subject,
      MessageBody: message,
      ParentMessageID: null,
      MessageGroupID: MessageGroupID
    };
    this.props.appAction.composeMessage(obj);
    this.onComposeModalClose();
  };

  onMessagePress = message => {
    let { appAction, componentId } = this.props;
    appAction.setActiveMessage(message.MessageID, componentId);
  };

  render() {
    let { messages, app, user } = this.props;
    let { inbox, sent, trash, recipients } = messages;
    return (
      <View style={Styles.container}>
        <Header
          title={"Message Center"}
          onDrawerPress={this.onDrawerPress}
          rightComponent={<RightComponent icon={constants.Images.Compose} />}
          onRightPress={this.onRightPress}
        />
        <ScrollableTabView
          initialPage={0}
          tabBarPosition={"top"}
          renderTabBar={() => <CustomTabBar style={this.props.style} />}
          onChangeTab={tab => {
            this.updateTabIndex(tab.ref.props.tab);
          }}
          // ref={ref => (this.scrollView = ref)}
          locked={false}
        >
          <SwiperContainer
            tabLabel="Inbox"
            tab="inbox"
            data={inbox}
            onDeletePress={this.onDeletePress}
            refresh={app.refreshLoader}
            onRefresh={this.getTabRelatedMessages}
            onMessagePress={this.onMessagePress}
          />
          <SwiperContainer
            tabLabel="Sent"
            tab="sent"
            data={sent}
            onDeletePress={this.onDeletePress}
            refresh={app.refreshLoader}
            onRefresh={this.getTabRelatedMessages}
            onMessagePress={this.onMessagePress}
          />
          <SwiperContainer
            tabLabel="Trash"
            tab="trash"
            data={trash}
            onDeletePress={this.onDeletePress}
            refresh={app.refreshLoader}
            onRefresh={this.getTabRelatedMessages}
            onMessagePress={this.onMessagePress}
          />
        </ScrollableTabView>
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
            getRecipientsLabel={item => item}
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
  app: state.app,
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
