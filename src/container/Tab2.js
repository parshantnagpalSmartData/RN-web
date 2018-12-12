import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'

import { goToAuth, goHome } from '../config/navigation'

export default class Tab2 extends React.Component {
  
  componentWillUnmount(){
    console.log('unmount')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tab 2</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
