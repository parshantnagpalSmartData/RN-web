import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
<<<<<<< HEAD
  Platform
} from 'react-native'
=======
} from 'react-native'
import { goToAuth } from '../config/navigation'
import {Navigation} from 'react-native-navigation';
>>>>>>> 4b59285d9d85002ee093d57d347bbc3c4c5fea33
import {connect} from 'react-redux';
import * as AppAction from '../actions'
 
class Screen2 extends React.Component {
    
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Screen 2'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Screen 2</Text>
        <Button
          onPress={() => {
            // Navigation.pop(this.props.componentId)
<<<<<<< HEAD
            if(Platform.OS !== 'web'){
            this.props.dispatch(AppAction.pop(this.props.componentId,'Screen2'))
            }else{
            this.props.dispatch(AppAction.goBack()) 
            }
            this.props.dispatch(AppAction.logOut());

=======
            this.props.dispatch(AppAction.pop(this.props.componentId,'Screen2'))
>>>>>>> 4b59285d9d85002ee093d57d347bbc3c4c5fea33
          }}
          title="Go Back"
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
export default connect(null,null)(Screen2)