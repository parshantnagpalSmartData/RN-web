/*
Name : Suraj Sanwal 
File Name : login.js
Description : Contains login screen.
Date : 11 Dec 2018
*/

import React, {
    Component
} from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import {
    KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux";

import * as appAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";
import Header from "../../components/common/Header";
import {
    moderateScale
} from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import Regex from "../../helpers/Regex";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "suraj.sanwal@smartdatainc.net",
            password: "welcome123",
            deviceWidth: window.innerWidth
        };
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    updateDimensions() {
        // console.log("change event ", window.innerWidth);
        this.setState({
            deviceWidth: window.innerWidth
        });
    }
    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    submitLogin = _.debounce(() => {
        // console.log(this.props);
        let {
            appAction,
            componentId
        } = this.props;
        let {
            email,
            password
        } = this.state;
        if (_.isEmpty(email.trim())) {
            alert(Constants.Strings.Common.EmptyEmailMsg);
            return;
        }
        if (!Regex.validateEmail(email.trim())) {
            alert(Constants.Strings.Common.ValidEmailAddress);
            return;
        }
        if (_.isEmpty(password.trim())) {
            alert(Constants.Strings.Common.EnterPassword);
            return;
        }
        appAction.signIn({
            username: email,
            password: password
        }, componentId);
    });

    onForgotPassword = () => {
        if (Platform.OS !== "web") {
            this.props.dispatch(
                appAction.pushTParticulatScreen(
                    this.props.componentId,
                    "ForgotPassword"
                )
            );
        } else {
            this.props.dispatch(appAction.pushTParticulatScreen("/ForgotPassword"));

            // this.props.history.push("/about")
        }
    };

    render() {
        let {
            deviceWidth
        } = this.state;
        // console.log("deviceWidthdeviceWidth", this.state.deviceWidth);
        let title = `ACT HOME HEALTH SERVICES, INC.
    NURSE PORTAL`;
        return ( <
            View style = {
                Styles.containner
            } >
            <
            Header title = {
                title
            }
            hideBack hideDrawer color = "#9999D6"
            headerText = {
                {
                    color: "#fff"
                }
            }
            /> <
            KeyboardAwareScrollView scrollEnabled = {
                false
            }
            contentContainerStyle = {
                {
                    alignItems: "center"
                }
            } >
            <
            View style = {
                {
                    height: Platform.OS === "web" ?
                        Constants.BaseStyle.DEVICE_HEIGHT * 0.85 :
                        Constants.BaseStyle.DEVICE_HEIGHT * 0.9,
                    width: Platform.OS === "web" ?
                        deviceWidth / 2 :
                        Constants.BaseStyle.DEVICE_WIDTH,
                    justifyContent: Platform.OS === "web" ? "space-evenly" : "space-between",
                    overflow: "hidden"
                }
            } >
            <
            View style = {
                Styles.FloatingInputContainer
            } >
            <
            FloatingInput label = {
                "Username"
            }
            onChangeText = {
                email => {
                    this.setState({
                        email
                    });
                }
            }
            value = {
                this.state.email
            }
            keyboardType = {
                "email-address"
            }
            returnKeyType = {
                "next"
            }
            autoCapitalize = {
                "none"
            }
            ref = {
                ref => (this.email = ref)
            }
            onSubmitEditing = {
                () => {
                    this.focusNext("password");
                }
            }
            /> <
            FloatingInput label = {
                "Password"
            }
            onChangeText = {
                password => {
                    this.setState({
                        password
                    });
                }
            }
            value = {
                this.state.password
            }
            returnKey = "done"
            onSubmitEditing = {
                () => {
                    this.onLoginPress();
                }
            }
            autoCapitalize = {
                "none"
            }
            secureTextEntry ref = {
                ref => (this.password = ref)
            }
            /> <
            /View> <
            View style = {
                {
                    justifyContent: "center",
                    alignItems: "center"
                }
            } >
            <
            Text onPress = {
                this.onForgotPassword
            } > Forgot Password < /Text> <
            /View> <
            View style = {
                {
                    flex: 0.25
                }
            } >
            <
            AuthButton buttonName = {
                "Login"
            }
            gradientColors = {
                ["#9999D6", "#9999D6"]
            }
            textStyle = {
                {
                    color: "#fff"
                }
            }
            // buttonStyle={Styles.buttonStyle}
            gradientStyle = {
                Styles.gradientStyle
            }
            onPress = {
                this.submitLogin
            }
            buttonStyle = {
                {
                    flex: 1
                }
            }
            /> <
            /View> <
            /View> <
            /KeyboardAwareScrollView> <
            /View>
        );
    }
}

const Styles = StyleSheet.create({
    containner: {
        flex: 1,
        justifyContent: "center"
    },
    FloatingInputContainer: {
        paddingVertical: moderateScale(40),
        paddingHorizontal: moderateScale(25),
        justifyContent: "flex-start"
    },
    buttonStyle: {
        borderWidth: 0.4,
        borderColor: Constants.Colors.placehoder
    },
    gradientStyle: {
        borderRadius: 0
    }
});

const mapStateToProps = state => ({
    user: state.user,
    app: state.app
});
const mapDispatchToProps = dispatch => ({
    appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);