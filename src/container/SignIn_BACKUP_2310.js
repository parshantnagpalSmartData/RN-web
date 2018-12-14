import React, { Fragment } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
<<<<<<< HEAD
  AsyncStorage,
  Platform
} from 'react-native'
import {removeListeners} from '../utilities/listeners';
//  import { goHome } from '../config/navigation'
 import * as AppAction from '../actions'



=======
  AsyncStorage
} from 'react-native'
import {removeListeners} from '../utilities/listeners';
import { goHome } from '../config/navigation'
import {Navigation} from 'react-native-navigation';

import * as AppAction from '../actions'
>>>>>>> 4b59285d9d85002ee093d57d347bbc3c4c5fea33
let removeListener = true;
class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '', password: ''
    }
    this.signUp = this.signUp.bind(this);
  }

  componentWillUnmount(){
<<<<<<< HEAD
    if(Platform.OS !== 'web'){
=======
>>>>>>> 4b59285d9d85002ee093d57d347bbc3c4c5fea33
    if(removeListener){
      removeListeners();
    }  
  }
<<<<<<< HEAD
  }
=======
>>>>>>> 4b59285d9d85002ee093d57d347bbc3c4c5fea33
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = () => {
    const { username, password } = this.state;
    console.log(this.props,AppAction)
     removeListener = false;
<<<<<<< HEAD
     console.log('Platform.OS',Platform.OS)
     this.props.dispatch(AppAction.login());
     if(Platform.OS !== 'web'){
      this.props.dispatch(AppAction.pushTParticulatScreen(this.props.componentId,'Screen2'));
     }else{
      this.props.dispatch(AppAction.pushTParticulatScreen('/Screen2'));
      
     // this.props.history.push("/about")
     }


   
=======
     this.props.dispatch(AppAction.login());
    goHome();
>>>>>>> 4b59285d9d85002ee093d57d347bbc3c4c5fea33
  }
  signUp(){
    this.props.dispatch(AppAction.pushTParticulatScreen(this.props.componentId,'SignUp'));
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign In'
          onPress={this.signIn}
        />
         <Button
          title='Sign Up'
          onPress={()=>this.signUp()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
<<<<<<< HEAD
    borderRadius: 14,
    ...Platform.select({
      web: {
        outline: "none"
      },
      ios:{

      },
      android:{

      }
    })
=======
    borderRadius: 14
>>>>>>> 4b59285d9d85002ee093d57d347bbc3c4c5fea33
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction : bindActionCreators(AppAction,dispatch)  
})


export default connect(mapStateToProps,null)(SignIn);