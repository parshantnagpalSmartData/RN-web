/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the message center component
Date : 13 december 2018
*/
import React, { Component } from "React";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { bindActionCreators } from "redux";
import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import CustomTabBar from "../../components/Common/CustomTabBar";
import MessageComponent from "../../components/MessageCenter";
class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "inbox",
      enableParentScrolling: true
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
    if (Platform.OS == "ios") {
      this.scrollView.scrollView.setNativeProps({ scrollEnabled: data }); //eslint-disable-line
    } else if (Platform.OS == "android") {
      if (data) {
        setTimeout(() => {
          context.setState({ enableParentScrolling: data });
        }, 2000);
      } else {
        context.setState({ enableParentScrolling: data });
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

  onOpen = (direction, item) => {
    let { tab } = this.state;
    let { appAction } = this.props;
    if (direction === "right" && (tab === "index" || tab === "sent")) {
      appAction.deleteMessage(item.MessageID, () =>
        this.getTabRelatedMessages()
      );
    }
  };

  render() {
    let { enableParentScrolling } = this.state;
    let { messages } = this.props;
    let { inbox, sent, trash } = messages;
    return (
      <View style={Styles.container}>
        <Header title={"Message Center"} onDrawerPress={this.onDrawerPress} />
        <ScrollableTabView
          initialPage={0}
          tabBarPosition={"top"}
          renderTabBar={() => <CustomTabBar style={this.props.style} />}
          onChangeTab={tab => {
            this.updateTabIndex(tab.ref.props.tab);
          }}
          ref={ref => (this.scrollView = ref)}
          locked={!enableParentScrolling}
        >
          <MessageComponent
            tabLabel="Inbox"
            tab="inbox"
            data={inbox}
            enableScrollingFunction={data => {
              this.enableScrollingFunction(data);
            }}
            onOpen={this.onOpen}
          />
          <MessageComponent
            tabLabel="Sent"
            tab="sent"
            data={sent}
            enableScrollingFunction={data => {
              this.enableScrollingFunction(data);
            }}
            onOpen={this.onOpen}
          />
          <MessageComponent
            tabLabel="Trash"
            tab="trash"
            data={trash}
            enableScrollingFunction={data => {
              this.enableScrollingFunction(data);
            }}
            onOpen={this.onOpen}
          />
        </ScrollableTabView>
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
  messages: state.messages
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageCenter);
