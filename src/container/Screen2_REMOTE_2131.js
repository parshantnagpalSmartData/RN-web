import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { goToAuth } from '../config/navigation'
import {Navigation} from 'react-native-navigation';
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
            this.props.dispatch(AppAction.pop(this.props.componentId,'Screen2'))
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