import React from "react";
import { Image, TouchableHighlight } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Swipeout from "react-native-swipeout";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import Constants from "../../../constants";
import MessageComponent from "../MessageComponent";

const MessageItem = ({ onDeletePress, index, item, onMessagePress }) => {
  return (
    <Swipeout
      autoClose="true"
      key={index}
      right={[
        {
          component: (
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={Constants.Colors.ButtonGradients}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: moderateScale(60)
              }}
            >
              <Image
                source={Constants.Images.Delete}
                style={{
                  height: moderateScale(27),
                  width: moderateScale(17)
                }}
              />
            </LinearGradient>
          ),
          onPress: () => onDeletePress(item)
        }
      ]}
      sensitivity={50}
      // scroll={data => {
      //   enableScrollingFunction(data);
      // }}
      /*  eslint-disable-next-line */
      // onOpen={(sectionID, rowId, direction) => {
      //   onOpen(direction, item);
      // }}
    >
      <TouchableHighlight
        underlayColor="rgba(192,192,192,1,0.6)"
        onPress={() => onMessagePress()}
      >
        <MessageComponent
          MessageSubject={item.MessageSubject}
          SenderFirstName={item.Sender_FirstName}
          SenderLastName={item.Sender_LastName}
          MessageDate={item.MessageDate}
        />
      </TouchableHighlight>
    </Swipeout>
  );
};

export default MessageItem;
