/**
 * @author Suraj Sanwal
 * @name MessageItem.js
 * @description Contains the Message Details for mobile.
 * @date 24 Jan 2019
 */
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Interactable from "react-native-interactable";
import LinearGradient from "react-native-linear-gradient";

import Constants from "../../../constants";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import MessageComponent from "../MessageComponent";

class MessageItem extends React.Component {
  render() {
    let { onDeletePress, index, item, onMessagePress } = this.props;
    return (
      <Interactable.View
        key={index}
        horizontalOnly={true}
        animatedNativeDriver={true}
        ref={ref => (this.animatedViewRef = ref)}
        snapPoints={[
          { x: 0 },
          { x: -(Constants.BaseStyle.DEVICE_WIDTH + 100) }
        ]}
        dragEnabled={true}
        initialPosition={{ x: 0, y: 0 }}
        onSnap={e => {
          const { index } = e.nativeEvent;
          if (index !== 0) {
            onDeletePress(() => {
              this.animatedViewRef.changePosition({ x: 0, y: 0 });
            });
          }
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            underlayColor="rgba(192,192,192,0.6)"
            onPress={() => onMessagePress(item)}
          >
            <MessageComponent
              MessageSubject={item.MessageSubject}
              SenderFirstName={item.Sender_FirstName}
              SenderLastName={item.Sender_LastName}
              MessageDate={item.MessageDate}
              Recipient_GroupName={item.Recipient_GroupName}
              isRead={item.IsRead}
            />
          </TouchableOpacity>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={Constants.Colors.ButtonGradients}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: moderateScale(60),
              width: moderateScale(60)
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
        </View>
      </Interactable.View>
    );
  }
}
export default MessageItem;
