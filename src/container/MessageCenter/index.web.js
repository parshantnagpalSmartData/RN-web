/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the My Profile component
Date : 13 december 2018
*/

import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import MessageComponent from "../../components/MessageCenter";

class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "inbox",
      data: []
    };
    this.toggleChecked = this.toggleChecked.bind(this);
    this.detailPageOpen = this.detailPageOpen.bind(this);
  }

  componentDidMount() {
    this.getTabRelatedMessages();
  }

  /*
   *get all messages
   */
  getTabRelatedMessages = () => {
    let { appAction } = this.props;
    let { tab } = this.state;
    appAction.getMessages(tab, data => {
      /**
       * adding the ischecked attribute in data array
       */
      data = data.map(item => {
        return { ...item, isChecked: false };
      });
      this.setState({
        data
      });
    });
  };

  toggleChecked(index) {
    let { data } = this.state;
    data[index].isChecked = !data[index].isChecked;
    this.setState({ data });
  }

  detailPageOpen() {}

  render() {
    let { app } = this.props,
      { data } = this.state;
    return (
      <View style={Styles.containner}>
        <Header title={"Message center"} onDrawerPress={this.onDrawerPress} />
        <View style={{ flex: 1.5, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <MessageComponent
              tabLabel="Inbox"
              tab="inbox"
              data={data}
              onDeletePress={this.onDeletePress}
              refresh={app.refreshLoader}
              onRefresh={this.getTabRelatedMessages}
              onPressIsChecked={index => this.toggleChecked(index)}
              onPress={item => this.detailPageOpen(item)}
              // enableScrollingFunction={data => {
              //   this.enableScrollingFunction(data);
              // }}
              // onOpen={this.onOpen}
            />
          </View>
          <View style={{ flex: 2.5, backgroundColor: "red" }} />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
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
)(MessageCenter);
