import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Interactable from "react-native-interactable";
import LinearGradient from "react-native-linear-gradient";

import Constants from "../../../constants";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import MessageComponent from "../MessageComponent";

const MessageItem = ({ onDeletePress, index, item, onMessagePress }) => {
  return (
    <Interactable.View
      key={index}
      horizontalOnly={true}
      animatedNativeDriver={true}
      // boundaries={{ left: -100, right: 100, bounce: 0.5 }}
      snapPoints={[{ x: 0 }, { x: -(Constants.BaseStyle.DEVICE_WIDTH + 100) }]}
      dragEnabled={true}
      initialPosition={{ x: 0, y: 0 }}
      onSnap={e => {
        const { index } = e.nativeEvent;
        if (index !== 0) {
          onDeletePress();
        }
        //
      }}
      // onStop={({ x, y }) => {
      //   console.log("xuuuuuu", x, y);
      // }}
      // snapPoints={[{ y: 0 }]}
      // onSnap={this.onDrawerSnap}
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
        {/* <TouchableOpacity
            style={styles.swipeoutSide}
            onPress={() => {
              alert("11111221");
            }}
          >
            <Text>tert</Text>
          </TouchableOpacity> */}
      </View>
    </Interactable.View>
    // </Swipeout>
  );
};
export default MessageItem;
