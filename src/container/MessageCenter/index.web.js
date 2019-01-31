/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the My Profile component
Date : 13 december 2018
*/

import React, { Component } from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import MessageComponent from "../../components/MessageCenter";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import InputLabel from "@material-ui/core/InputLabel";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import RightComponent from "../../components/Common/RightComponent";

const RenderSelect = ({ value, handleChange }) => {
  return (
    <div>
      <Image
        source={
          value === "inbox"
            ? Constants.Images.InboxActive
            : value === "sent"
              ? Constants.Images.SentActive
              : Constants.Images.TrashActive
        }
        style={{
          height: moderateScale(20),
          width: moderateScale(20)
        }}
      />
      <Select
        value={value}
        inputProps={{
          name: "folder",
          id: "folder-name"
        }}
        onChange={event => handleChange(event.target.value)}
      >
        <MenuItem value={"inbox"}>Inbox</MenuItem>
        <MenuItem value={"sent"}>Sent</MenuItem>
        <MenuItem value={"trash"}>Trash</MenuItem>
      </Select>
    </div>
  );
};

const SearchBar = () => {
  return (
    <View
      style={{
        backgroundColor: Constants.Colors.Transparent,
        height: moderateScale(40),
        borderColor: Constants.Colors.Gray,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "25%",
        borderRadius: moderateScale(25),
        margin: moderateScale(10)
      }}
    >
      <TextInput
        style={{
          flex: 1,
          outline: "none",
          paddingHorizontal: moderateScale(20)
        }}
      />
      <Image
        source={Constants.Images.Search}
        style={{
          height: moderateScale(30),
          width: moderateScale(30),
          right: moderateScale(5)
        }}
      />
    </View>
  );
};

const Filter = ({ value, handleSortChange }) => {
  return (
    <Select
      value={value}
      inputProps={{
        name: "sortby",
        id: "sort-by"
      }}
      onChange={event => handleSortChange(event.target.value)}
    >
      <MenuItem value={"inbox"}>Name</MenuItem>
      <MenuItem value={"sent"}>Date</MenuItem>
    </Select>
  );
};

const MessageCounter = () => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: moderateScale(10)
    }}
  >
    <Image
      source={Constants.Images.TrashInactive}
      style={{
        height: moderateScale(15),
        width: moderateScale(15),
        right: moderateScale(5)
      }}
    />
    <Text>1-50 of 200</Text>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        left: moderateScale(5)
      }}
    >
      <Image
        source={Constants.Images.Next}
        style={{ height: moderateScale(15), width: moderateScale(15) }}
      />
      <Image
        source={Constants.Images.Previous}
        style={{ height: moderateScale(15), width: moderateScale(15) }}
      />
    </View>
  </View>
);

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

  handleChange = folder => {
    this.setState({ tab: folder }, () => this.getTabRelatedMessages());
  };
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

  detailPageOpen() { }

  render() {
    let { app } = this.props,
      { data } = this.state;
    return (
      <View style={Styles.containner}>
        <Header title={"Message center"} onDrawerPress={this.onDrawerPress} />
        <div className={"messageTopBar d-sm-flex align-items-center"}>
          <div className={"messageTitle"}>
            <RenderSelect
              value={this.state.tab}
              handleChange={this.handleChange}
            />
          </div>
          <div className="messageSearch">
            <SearchBar />
          </div>
          <div className={"composeEmail d-sm-flex align-items-center ml-auto"}>
            <RightComponent icon={Constants.Images.Compose} />
            <Text>Compose</Text>
          </div>
        </div>

        <div className={"messageInbox d-flex"}>

          <div className={"messageListSection"}>
            <div className={"messageFilter"}><Filter value={"Sort By"} /></div>
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
          </div>
          <div className={"messageDetailsSection"}>
            <div className={"messageCounter"}><MessageCounter /></div>
            <div className={"msgDetailsSection"}>sssss</div>
          </div>
        </div>
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
