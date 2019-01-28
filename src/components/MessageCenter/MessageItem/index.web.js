import React from "react";
import { TouchableOpacity } from "react-native";
import MessageComponent from "../MessageComponent";

const MessageItem = ({ item, onPress, onPressIsChecked }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MessageComponent
        isChecked={item.isChecked}
        onPressIsChecked={onPressIsChecked}
        MessageSubject={item.MessageSubject}
        SenderFirstName={item.Sender_FirstName}
        SenderLastName={item.Sender_LastName}
      />
    </TouchableOpacity>
  );
};

export default MessageItem;
