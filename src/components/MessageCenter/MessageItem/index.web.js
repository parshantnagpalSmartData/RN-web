import React from "react";
import { TouchableOpacity } from "react-native";
import MessageComponent from "../MessageComponent";

const MessageItem = ({ item, onPress, onPressIsChecked }) => {
  return (
    <div className={"messageList"}>
      <TouchableOpacity onPress={onPress}>
        <MessageComponent
          isChecked={item.isChecked}
          onPressIsChecked={onPressIsChecked}
          MessageSubject={item.MessageSubject}
          SenderFirstName={item.Sender_FirstName}
          SenderLastName={item.Sender_LastName}
          Recipient_GroupName={item.Recipient_GroupName}
          MessageDate={item.MessageDate}
        />
      </TouchableOpacity>
    </div>
  );
};

export default MessageItem;
