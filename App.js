import { Text, View,Button } from 'react-native'
import React, { Component } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default class App extends Component {
  constructor(props){
    GoogleSignin.configure({
      webClientId: '645571348795-iqjiqkhc4233qs6j4j90vdvmddvo79av.apps.googleusercontent.com',
    });
    super(props);
    this.state={
      additionalUserInfo:''
    }
  }
  Google_sign = async()=>{
     console.log('Google sign  in :-> ')
      // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(googleCredential);
 user_sign_in.then((res) =>{
   
   console.log("Google Login :->" + JSON.stringify( res,null,2))
 }).catch((GoogleLoginError) =>{
   console.log('Google login here  :->' +GoogleLoginError)
 })
}
 sign_out= async() =>{

  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }

 }
  render() {
    const {additionalUserInfo} =this.state;
  
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <Button title=' Google  Login here ' onPress={()=>{this.Google_sign()}}></Button>
        <Button  title=' Google Sign out ' onPress={()=>{this.Google_sign()}}></Button>
 
      </View>
    )
  }
}