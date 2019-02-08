/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the My Profile component
Date : 13 december 2018
*/

import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import MessageComponent from "../../components/MessageCenter";

import Constants from "../../constants";
import RightComponent from "../../components/Common/RightComponent";
import MessageDetails from "./MessageDetails";
import CustomModal from "../../components/CustomModal";
import Compose from "./Compose";
import Filter from "../../Components/Common/DropDownWeb";
import RenderSelect from "../../components/Common/DropDownWithImage";
import SearchBar from "../../components/Common/SearchBarMessageCenter";
import MessageCounter from "../../components/MessageCenter/MessageCounter";

const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)"
  }
};

const SelectData = [
    { key: "Inbox", value: "inbox" },
    { key: "Sent", value: "sent" },
    { key: "Trash", value: "trash" }
  ],
  selectDataId = {
    name: "folder",
    id: "folder-name"
  },
  sortByDataId = {
    name: "sortby",
    id: "sort-by"
  },
  sortData = [
    { key: "Sort", value: "sortby" },
    { key: "Name", value: "name" },
    { key: "Date", value: "date" }
  ];

class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "inbox",
      filter: "sortby",
      data: [],
      composeModal: false,
      message: "",
      subject: "",
      MessageGroupID: null,
      open: false,
      ParentMessageID: null,
      tabLabel: "Compose Message",
      searchText: ""
    };
    this.toggleChecked = this.toggleChecked.bind(this);
    this.detailPageOpen = this.detailPageOpen.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getTabRelatedMessages();
    this.props.appAction.getRecipients();
  }

  /**
   * On searching the searchText text value is set
   */
  onSearch(value) {
    this.setState({ searchText: value });
  }

  updateSelectedMessage = () => {
    let { appAction, messages } = this.props;
    let { inbox, trash, sent } = messages;
    let { tab } = this.state;
    let selectedMessage =
      tab === "index"
        ? inbox && inbox.length && inbox[0].MessageID
        : tab === "sent"
        ? sent && sent.length && sent[0].MessageID
        : trash && trash.length && trash[0].MessageID;
    appAction.updateWebSelectedMessage(selectedMessage);
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

  handleChange = folder => {
    this.setState({ tab: folder }, () => this.getTabRelatedMessages());
  };

  handleSortChange = filter => {
    this.setState({ filter });
  };
  /*
   *get all messages
   */
  getTabRelatedMessages = () => {
    let { appAction } = this.props;
    let { tab } = this.state;
    appAction.getMessages(tab, () => {
      /**
       * adding the ischecked attribute in data array
       */
      // data = data.map(item => {
      //   return { ...item, isChecked: false };
      // });
      // this.setState(
      //   {
      //     data
      //   },
      //   () => this.updateSelectedMessage()
      // );
    });
  };

  toggleChecked(index) {
    let { data } = this.state;
    data[index].isChecked = !data[index].isChecked;
    this.setState({ data });
  }
  onRightPress = () => {
    this.setState({ composeModal: true });
  };

  onMessagePress = message => {
    let { appAction, componentId } = this.props;
    appAction.setActiveMessage(message.MessageID, componentId, message.IsRead);
  };

  onComposeModalClose = () => {
    this.setState({
      composeModal: false,
      subject: "",
      ParentMessageID: null,
      tabLabel: "Compose Message",
      MessageGroupID: null,
      recipientNameError: "",
      subjectError: "",
      messageError: ""
    });
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
      appAction.composeMessage(obj);
      this.onComposeModalClose();
    }
  };

  detailPageOpen(message) {
    let { appAction, componentId } = this.props;
    if (Constants.BaseStyle.DEVICE_WIDTH > 772) {
      this.onMessagePress(message);
    } else {
      appAction.setActiveMessage(
        message.MessageID,
        componentId,
        message.IsRead
      );
    }
  }

  menuOption = (value, message) => {
    this.setState({ open: false });
    if (value === "reply") {
      this.replyMessage(message);
    } else {
      this.onDeletePress(message);
    }
  };
  onDeletePress = message => {
    let { tab } = this.state;
    let { appAction } = this.props;
    if (tab !== "trash") {
      appAction.deleteMessage(
        message.MessageID,
        tab,
        () => {}
        // this.getTabRelatedMessages()
      );
    }
  };
  replyMessage = message => {
    this.setState(
      {
        composeModal: true,
        subject: "Re:" + message.MessageSubject,
        ParentMessageID: message.MessageID,
        tabLabel: "Reply Message",
        MessageGroupID: this.getRecipientsIndex(message.Recipient_GroupName)
      },
      () => {
        this.props.appAction.getRecipients();
      }
    );
  };
  render() {
    let {
        app,
        user,
        messages: { recipients, inbox, sent, trash }
      } = this.props,
      data,
      {
        MessageGroupID,
        subject,
        tabLabel,
        filter,
        tab,
        recipientNameError,
        subjectError,
        messageError,
        searchText
      } = this.state;
    if (tab == "inbox") {
      data = inbox;
    } else if (tab == "sent") {
      data = sent;
    } else {
      data = trash;
    }

    if (searchText) {
      let SearchText = searchText.toLowerCase();
      data = data.filter(element => {
        if (
          element.MessageBody.toLowerCase().includes(SearchText) ||
          element.Recipient_GroupName.toLowerCase().includes(SearchText) ||
          element.MessageSubject.toLowerCase().includes(SearchText)
        ) {
          return element;
        }
      });
    }

    if (filter === "name") {
      data = data.sort(function(a, b) {
        //compare two values
        if (
          a.Recipient_GroupName.toLowerCase() <
          b.Recipient_GroupName.toLowerCase()
        )
          return -1;
        if (
          a.Recipient_GroupName.toLowerCase() >
          b.Recipient_GroupName.toLowerCase()
        )
          return 1;
        return 0;
      });
    } else if (filter === "date") {
      data = data.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.MessageDate) - new Date(a.MessageDate);
      });
    }

    return (
      <View style={Styles.containner}>
        <Header title={"Message center"} onDrawerPress={this.onDrawerPress} />
        <div className={"messageTopBar d-sm-flex align-items-center"}>
          <div className={"messageTitle"}>
            <RenderSelect
              value={this.state.tab}
              handleChange={this.handleChange}
              selectData={SelectData}
              selectDataId={selectDataId}
            />
          </div>
          <div className="messageSearch">
            <SearchBar searchText={searchText} onSearch={this.onSearch} />
          </div>
          <div className={"composeEmail d-sm-flex align-items-center ml-auto"}>
            <TouchableOpacity onPress={() => this.onRightPress()}>
              <RightComponent
                icon={
                  Constants.BaseStyle.DEVICE_WIDTH > 767
                    ? Constants.Images.ComposeBlack
                    : Constants.Images.Compose
                }
              />
              <Text>Compose</Text>
            </TouchableOpacity>
          </div>
        </div>

        <div className={"messageInbox d-flex"}>
          <div className={"messageListSection"}>
            <div className={"messageFilter"}>
              <Filter
                value={filter}
                handleChange={this.handleSortChange}
                selectDataId={sortByDataId}
                selectData={sortData}
              />
            </div>
            <div className={"msgListWidget"}>
              <MessageComponent
                tabLabel="Inbox"
                tab="inbox"
                data={data}
                onDeletePress={this.onDeletePress}
                refresh={app.refreshLoader}
                onRefresh={this.getTabRelatedMessages}
                onPress={this.detailPageOpen}
                onMessagePress={this.onMessagePress}
              />
            </div>
          </div>
          <div className={"messageDetailsSection d-xs-none"}>
            <div className={"messageCounter"}>
              <MessageCounter />
            </div>
            <div className={"msgDetailsSection"}>
              <MessageDetails
                open={this.state.open}
                toggleOpen={() => {
                  this.setState({ open: !this.state.open });
                }}
                onClose={this.menuOption}
              />
            </div>
          </div>
        </div>

        <CustomModal
          isVisible={this.state.composeModal}
          onBackdropPress={this.onComposeModalClose}
          // style={{ margin: 0 }}
          className={"ModalCompose"}
          overlayClassName={"OverlayCopmose"}
          customStyles={customStyles}
        >
          <Compose
            to={MessageGroupID}
            user={user}
            onClose={this.onComposeModalClose}
            recipients={recipients}
            onChangeRecipient={this.onChangeRecipient}
            onChangeMessage={this.onChangeMessage}
            onChangeSubject={this.onChangeSubject}
            onComposePress={this.onComposePress}
            subject={subject}
            tabLable={tabLabel}
            recipientNameError={recipientNameError}
            subjectError={subjectError}
            messageError={messageError}
          />
        </CustomModal>
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
