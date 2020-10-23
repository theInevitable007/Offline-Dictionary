import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity, 
  Alert
} from 'react-native';
import { Header } from 'react-native-elements';


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      word: '',
      definition: '',
      wordData: '',
      definitionUrl: '',
      searchDefinitionJSON: '',
      inputDATA: '',
      isSearchPressed: false

    }

  }

  
getWord = (word) => {

  var searchWord = this.state.word.toLowerCase();
  var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchWord+".json"
  var checkErrorIsSearch = false;
  //console.log(url);
  return fetch(url)
  .then((data) => {

    if(data.status === 200) {

    
      return data.json()


    } else {

      alert("'" + this.state.word + "' " + "was not found in the dictionary. Please check your spelling.");
      this.setState({definition: 'Sorry, Word Not Found In Dictionary', word: 'Error'});
      return null

    }

  })
  .then((response) => {
    var responseObject = response
    console.log(responseObject)
   if(responseObject) {

   var definitionDATA = responseObject.definitions[0].description.slice('1', '9999');
    var definitionDATAUpper = responseObject.definitions[0].description.charAt(0).toUpperCase()
    //console.log(definitionDATAUpper)


    var fullDefinitionData = definitionDATAUpper+definitionDATA

    //console.log(fullDefinitionData)

   this.setState({definition: fullDefinitionData})

   }



  })
}
render() {
  return (
    <View style={styles.container}>

          <Header
          backgroundColor={'#b600ff'}
          centerComponent={{
            text: 'Mini Dictionary',
            style: { color: '#ffffff', fontSize: 20 },
          }}
        />

          <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
          
            this.setState({ word: text });
            
          }}
       
         value={this.state.word}
          
        />

          <TouchableOpacity
          style={styles.goButton}
          onPress={this.getWord}>
             <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

        <Text style={{color: 'yellow',fontSize: 30,fontWeight: 'bold',marginLeft: 10,marginTop: 260}}>Word:</Text>
        <Text style={{color: 'black',fontSize: 22,fontWeight: 'bold', marginLeft: 110, marginTop: -35}}>{this.state.word.toLowerCase()}</Text>
        <Text style={{color: 'yellow',fontSize: 30,fontWeight: 'bold', marginLeft: 10,marginTop: 70}}>Definition:</Text>
        <Text style={{color: 'black',fontSize: 22,fontWeight: 'bold', marginLeft: 170, marginTop: -35}}>{this.state.definition}</Text>
   
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 100,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  miniText: {
    color: 'yellow',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 260
  },
  goButton: {
    //width: '12%',
    height: 55,
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    borderRadius: '10%',
    backgroundColor: 'blue',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
