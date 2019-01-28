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
import MessageComponent from "../../components/MessageCenter";
import { Dialog } from "../../helpers/common";
import RightComponent from "../../components/Common/RightComponent";
import constants from "../../constants";
import CustomModal from "../../components/CustomModal";
import Compose from "./Compose.js";
class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "inbox",
      enableParentScrolling: true,
      composeModal: false
    };
  }

  componentDidMount() {
    this.getTabRelatedMessages();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };
  // enableScrollingFunction = data => {
  //   let context = this;
  //   if (Platform.OS == "ios") {
  //     this.scrollView.scrollView.setNativeProps({ scrollEnabled: data }); //eslint-disable-line
  //   } else if (Platform.OS == "android") {
  //     if (data) {
  //       setTimeout(() => {
  //         context.setState({ enableParentScrolling: data });
  //       }, 2000);
  //     } else {
  //       context.setState({ enableParentScrolling: data });
  //     }
  //   }
  // };

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
          onPress: () =>
            appAction.deleteMessage(message.MessageID, () =>
              this.getTabRelatedMessages()
            )
        }
      ]);
    }
  };

  onRightPress = () => {
    this.setState({ composeModal: true }, () => {
      this.props.appAction.getRecipients();
    });
  };

  onComposeModalClose = () => {
    this.setState({ composeModal: false });
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
          locked
        >
          <MessageComponent
            tabLabel="Inbox"
            tab="inbox"
            data={inbox}
            onDeletePress={this.onDeletePress}
            refresh={app.refreshLoader}
            onRefresh={this.getTabRelatedMessages}
            // enableScrollingFunction={data => {
            //   this.enableScrollingFunction(data);
            // }}
            // onOpen={this.onOpen}
          />
          <MessageComponent
            tabLabel="Sent"
            tab="sent"
            data={sent}
            onDeletePress={this.onDeletePress}
            refresh={app.refreshLoader}
            onRefresh={this.getTabRelatedMessages}
            // enableScrollingFunction={data => {
            //   this.enableScrollingFunction(data);
            // }}
            // onOpen={this.onOpen}
          />
          <MessageComponent
            tabLabel="Trash"
            tab="trash"
            data={trash}
            onDeletePress={this.onDeletePress}
            refresh={app.refreshLoader}
            onRefresh={this.getTabRelatedMessages}
            // enableScrollingFunction={data => {
            //   this.enableScrollingFunction(data);
            // }}
            // onOpen={this.onOpen}
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
