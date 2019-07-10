

import React from 'react';
import {  StyleSheet, Text, View, Alert, TouchableOpacity, TouchableHighlight,FlatList, Button, Image,List, ListItem } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    list: [],
    type: Camera.Constants.Type.back,
    modalVisible: false,
    isCameraVisible : false,
    index:null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ 
              hasCameraPermission: status === 'granted',
              isCameraVisible: false
   });
  }

  showCameraView = () => {
    console.log("Clicked...........");
    this.setState({ isCameraVisible: true });

  }



  edit (key)  {
   
    const {list} = this.state;
   
    
    console.log(list[key].uri)
    this.setState({index: key,
      isCameraVisible : true
    });
   

  }



  delete (key)  {
    console.log('Delete Before****',list)
    const {list} = this.state;
    list.splice(key, 1);
    console.log('Delete After****',list)
    this.setState({list, currentIndex: null});

  }

  async capture() {
  
    const {list,index} = this.state;
    const photo = await this.camera.takePictureAsync();
    // console.log('photo uri *********', photo);
    
    if (index === null) {
      console.log('index === null *********', photo);
      list.push(photo)
    }
    
    else{
    console.log('index != null****',list)
    const some_array = [...list]
    some_array[index] = photo
   
    this.setState({
      photo: photo.uri,
      isCameraVisible : false,
      list:some_array,
      Index: null

    })
    }
  }

  

  render() {
    const { hasCameraPermission ,isCameraVisible,list,index} = this.state;
    console.log("Index ",index)
    
    
const data =  this.state.list.map((data,index) => {
  return (
  
  <View  key={index}  >
    <Image
    style={{height:100,width:200, marginBottom : 10, marginTop : 30}} 
  source={{ uri: data.uri}} />
 

 <Button color  ="orange"  title="Edit" onPress={() => this.edit(index)}/>


 <Button color ="#841584"  title="Delete" onPress={() => this.delete(index)}/> 


    </View>
  )
})

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
      
        // :
          <View style={{ flex: 1 ,marginTop : 40}}>

            {!isCameraVisible?<Button onPress={ this.showCameraView} 
            title="Add Item " 
            color="#841584"  /> :null}
   
          {isCameraVisible &&
          <Camera
            ref={ref => {
              this.camera = ref;
            }} 
            style={{ flex: 1 }} 
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'column',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    isCameraVisible : false
                  });
                }}>
                <Image 
                    source={{uri: 'https://image.flaticon.com/icons/png/512/122/122641.png'}}
                    // style={{marginBottom:550,marginLeft:600 ,width: 50, height: 50}}
                    style={{marginRight:50,width: 50, height: 50}}
                     
                />
            
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
               <Image 
                    source={{uri: 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-and-lines-1/2/08-512.png'}}
                    style={{marginRight:300, marginTop:-30, width: 50, height: 50}}
                     
                />
              
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={() => this.capture()}>
                  <Image 
                    source={{uri: 'https://gadgetstouse.com/wp-content/uploads/2015/09/ProCapture-app-logo.png'}}
                    style={{marginRight:130 ,marginTop:285,width: 100, height: 100}}
                     
                />
              </TouchableOpacity>
            </View>
          </Camera>}


         
        
       
        
        <View>{data}
        </View>
        
 
        </View> 
      
      );
    }
    
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff00ff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
