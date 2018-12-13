import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  BackHandler
} from 'react-native'
import { goToAuth } from '../config/navigation'
import {connect} from 'react-redux';
import * as AppAction from '../actions'
import {removeListeners} from '../utilities/listeners';
import { handleBackPress } from '../utilities/BackButtonHandling';
import {Navigation} from 'react-native-navigation';
let removeListener = true;
 class Home extends React.Component {
	/*
		Constructor Function
	*/
	constructor(props) {
		super(props);
    Navigation.events().bindComponent(this);

  }
  componentDidAppear() {
  	// BackHandler.addEventListener('hardwareBackPress', handleBackPress); // Back Button handling
  }
   componentDidDisappear() {
    // BackHandler.removeEventListener('hardwareBackPress', handleBackPress); // Back Button handling
  }
   componentWillUnmount(){
    if(removeListener){
      removeListeners();
    }  
  }
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }

  logout = () => {
    removeListener = false;
    this.props.dispatch(AppAction.logOut());
    goToAuth()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <Button
          onPress={()=>this.logout()}
          title="Sign Out"
        />
        <Button
          onPress={() => {
            // Navigation.push(this.props.componentId, {
            //   component: {
            //     name: 'Screen2',
            //   }
            // });
            this.props.dispatch(AppAction.pushTParticulatScreen(this.props.componentId,'Screen2'))
          }}
          title="View next screen"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default connect(null,null)(Home);