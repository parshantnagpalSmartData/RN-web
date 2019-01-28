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
    }

    render() {
        let { messages, app } = this.props;
        let { inbox } = messages;
        return (
            <View style={Styles.containner}>
                <Header title={"Message center"} onDrawerPress={this.onDrawerPress} />
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
                />{" "}
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
