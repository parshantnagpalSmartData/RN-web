import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
var {height, width} = Dimensions.get('window');
import {Navigation} from 'react-native-navigation';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as AppAction from '../actions';

 class SideMenu extends React.Component {
  constructor(props){
    super(props);
    this.hideSideMenu = this.hideSideMenu.bind(this);
    this.setScrenStack = this.setScrenStack.bind(this);
  }
  hideSideMenu() {
    this.props.appAction.mergeOptions(this.props.componentId,false);
    // Navigation.mergeOptions(this.props.componentId, {
    //   sideMenu: {
    //     left: {
    //       visible: false
    //     }
    //   }
    // });
  }

  setScrenStack(screen,visible){
    this.props.appAction.setScrenStack( 'MY_STACK' ,screen , visible);
    this.hideSideMenu();
  }
 


  render() {
    return (
      <View style={styles.container}>
       <View style={[styles.text,styles.marginTop]}>
        <Text style={styles.welcome}>SideMenu</Text>
       </View> 
       <View style={styles.text}>
       <TouchableOpacity onPress={()=>{this.setScrenStack("Home",true)}}><Text style={styles.welcome}>SecondPage</Text></TouchableOpacity>
       </View> 
       <View style={styles.text}>
       <TouchableOpacity onPress={()=>{this.setScrenStack("Loader",false)}}><Text style={styles.welcome}>SecondPage</Text></TouchableOpacity>
       </View> 
       <View style={styles.text}>
       <TouchableOpacity onPress={()=>{this.hideSideMenu()}}><Text style={styles.welcome}>Close</Text></TouchableOpacity>
       </View> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 15
  },
  container: {
    flex: 1
  },
  text : {
    height : height*10/100,
    width : width*80/100,
    justifyContent : 'center',
    alignItems: 'center'
  },
  marginTop : {
    marginTop : height*5/100,
  }
})
const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction : bindActionCreators(AppAction,dispatch)  
})

export default connect(null,mapDispatchToProps)(SideMenu);