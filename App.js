import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , ScrollView, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





 const Stack = createStackNavigator();
const App =() => {
  return (
    <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          />

          <Stack.Screen name="History" component={History} />
        
        </Stack.Navigator>
      </NavigationContainer>);

}




const HomeScreen =({navigation,route}) => {
  const [getOriginalPrice, setOriginalPrice] = useState()
  const [getDiscountPercentage, setDiscountPercentage] = useState()
  const [getYouSave, setYouSave] = useState()
  const [getFinalPrice, setFinalPrice] = useState()
  const [getCheck, setCheck] = useState(false)
  const [getNANCheck, setNANCheck] = useState(false)
  const [getList, setList] = useState([])

  useEffect(() => {

    if (route.params?.returnList) {
      setList(route.params.returnList);
      navigation.setParams({ returnList: undefined });

    }
  });


  React.useLayoutEffect(()=>{
    navigation.setOptions({
      title:"Discount App",
      headerTintColor:"#292929",
      headerStyle:{
        backgroundColor:"grey",
       },
      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <TouchableOpacity 
            onPress={()=>NavigationToHistoryScreen()} 
            style={{width:100,height:35 ,backgroundColor:"#ff8600",  borderRadius: 15 , alignItems:"center", justifyContent:"center"}} >
            <Text style={{fontWeight:"bold"}}>View History</Text></TouchableOpacity>
        </View>
      ),
    });
  });

 
  const reset=()=>{
    setOriginalPrice()
    setDiscountPercentage()
    setFinalPrice()
    setYouSave()
    setCheck(false)
  }


  const ADDList = () => {
      if(getCheck==true && getNANCheck==true){
        setList([...getList,
        {key: Math.random().toString(), OriginalPrice: getOriginalPrice, DiscountP: getDiscountPercentage , FP: getFinalPrice }]);
        alert("Saved!")
        reset();
    }
    else if(getNANCheck==false){
      alert("Some of the Inputs are Invalid")
    }
    else{
     
        alert("Problem")
      
    }
  }

  
 const calculate=()=>{

    if( getOriginalPrice==null || getDiscountPercentage==null ){
    
      setCheck(false)
      
    }
     if(getOriginalPrice<=0){
      alert("Price  should be more than 0!!")
      setCheck(false)

    }
    else if(getDiscountPercentage>100){
      alert("Discount is never greater than 100")
      setCheck(false)

    }
    else if(getDiscountPercentage<0){
      alert("Discount is never lesser than 0")
      setCheck(false)

    }
    else if(getOriginalPrice!=null && getDiscountPercentage!=null ){
    const discount=getOriginalPrice-(getOriginalPrice*(getDiscountPercentage/100));
    const saved=(getOriginalPrice-getOriginalPrice-(getOriginalPrice*(getDiscountPercentage/100)))
  
    setFinalPrice((discount).toFixed(2))
    setYouSave(Math.abs(saved).toFixed(2))
    setCheck(true)

  }}


  const NavigationToHistoryScreen =()=>{
    navigation.navigate("History" , {list:getList});
  }

  const settingOriginalPrice=(OriginalPrice)=>{
    if(isNaN(OriginalPrice)){
      setNANCheck(false);
      
    }
    else{
    setOriginalPrice(OriginalPrice);
    setNANCheck(true);
    setFinalPrice();
    setYouSave()
    }
  }
  const settingDiscountP=(DiscountPercentage)=>{
    if(isNaN(DiscountPercentage)){
      setNANCheck(false);
    }
    else{
    setDiscountPercentage(DiscountPercentage);
    setNANCheck(true);
    setFinalPrice();
    setYouSave()

    }
  }
  
  

  return (
    <View style={styles.HomeContainer}>

  <View style={{flexDirection:'row', marginTop:30 }}>
     
    <TextInput 
     value={getOriginalPrice} 
     style={styles.input} 
     placeholder="Original price"  
     placeholderTextColor="grey" 
     keyboardType="number-pad"
     onChangeText={(OriginalPrice)=> settingOriginalPrice(OriginalPrice)}
     onSubmitEditing={()=>calculate()}
     />
    
    <TextInput 
    value={getDiscountPercentage} 
    style={styles.input} 
    placeholder="Discount   %" 
    placeholderTextColor="grey" 
    keyboardType="number-pad"
    onChangeText={(DiscountPercentage)=> settingDiscountP(DiscountPercentage)}
    onSubmitEditing={()=>calculate()}/>

  </View>

  <View style={styles.outputContainer}>
    <TextInput 
    editable={false} 
    placeholderTextColor="#90967C" 
    placeholder="Final  Price" 
    style={styles.output}>{getFinalPrice}
    </TextInput>

    <TextInput 
    editable={false} 
    placeholderTextColor="#90967C" 
    placeholder="You  Save" 
    style={styles.output}>{getYouSave}
    </TextInput>
  </View>



    <CustomButton 
    
    text="Save"
    onPressEvent={ADDList}
    disabled={getOriginalPrice==null || getDiscountPercentage==null || getFinalPrice==null}
    
    
    >

     
    </CustomButton>

</View>
  );
}


const History =({navigation, route}) => {
  const {list} = route.params;
  const [getHistoryList, setHistoryList] = useState([...list]);
  React.useLayoutEffect(()=>{
      navigation.setOptions({
      title:"History",
      headerTitleAlign:"center",
      headerTintColor:"#292929",
      headerStyle:{
        backgroundColor:"grey",
      },
      headerLeft: () => (
        <View style={{ marginLeft:15}}>
          <TouchableOpacity 
            onPress={()=>NavigationToHomeScreen()} 
            style={{width:70,height:30 ,backgroundColor:"#ff8600",  borderRadius: 15 , alignItems:"center", justifyContent:"center"}} >
            <Text style={{fontWeight:"bold"}}>Go back</Text></TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ marginLeft:15}}>
          <TouchableOpacity 
           onPress={()=>cleartAlert()} 
            style={{width:70,height:30 ,backgroundColor:"black",  borderRadius: 15 , alignItems:"center", justifyContent:"center", marginRight:7,}} >
            <Text style={{ letterSpacing:1 , color:"#ffff", fontWeight:"bold"}}>Clear</Text></TouchableOpacity>
        </View>
      ),
    });
  });
  
 
  
 
  const removeItem =(itemKey)=>{
    var rList=getHistoryList.filter(item=> item.key!=itemKey);
    setHistoryList(rList);
  }
  const ClearHistory =()=>{
    
    setHistoryList([]);
  }

  
  const cleartAlert = () =>
    Alert.alert(
      "Are you Sure?",
      "Press OK to delete the entire History",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => ClearHistory() }
      ],
      { cancelable: false }
    );


  const NavigationToHomeScreen=()=>{
    navigation.navigate("Home" , {returnList:getHistoryList});
  }

  return (
    <View style={styles.HistoryContainer}>
      <View style={styles.ColumnsContainer}>
        <Text style={styles.Columns}> Orginal Price  </Text>
        <Text style={styles.Columns}> Discount%  </Text>
        <Text style={styles.Columns}> Final Price </Text>
     </View>
     
     <ScrollView>
        {getHistoryList.map((item, index) =>
          <View key={item.key} style={{flexDirection:"row" , marginRight:3, marginTop:20}} >
            <TouchableOpacity  
            style={styles.Xbtn} onPress={()=>removeItem(item.key)}>
              <Text style={{color:"#ffff", fontSize:18, fontWeight:"bold" }}>X</Text>
            </TouchableOpacity>
            <View style={styles.HistoryItemsContainer}>
            <Text style={styles.HistoryItems1}>{item.OriginalPrice}</Text>
            <Text style={styles.HistoryItems2}>{ item.DiscountP }</Text>
            <Text style={styles.HistoryItems3}>{item.FP}</Text>
            </View>
          </View>)}
          
      </ScrollView>
    

      

  </View>
  )
}


const CustomButton=(props)=>{
  if (props.disabled){
    var btnColor="grey";
  }
  else {
     btnColor= props.color != undefined ? props.color:"#ff8600";
  }
  return(
    <View>
      <TouchableOpacity 
      activeOpacity={0.5}
      onPress={props.onPressEvent}
      disabled={props.disabled}
      style={{...styles.EndBTN, backgroundColor:btnColor}}
      
      >
        <Text style={{fontSize:20 ,fontWeight:"bold", letterSpacing:3}}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}





const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor:"#292929",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  HistoryContainer: {
    flex: 1,
    backgroundColor: "#292929",
    alignItems: 'center',
    
  },
  input:{
    borderWidth:0.9,
    margin:7,
    letterSpacing:1,
    borderRadius:15,
    borderColor:"grey",
    color:"grey",
    height:40,
    width:160,
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold"
   
    
  },
  CalculateBTN:{
    backgroundColor:"#87cefa",
    padding:8,
    width:120,
    textAlign:"center",
    alignItems:"center",
    borderRadius:19,
    marginTop:-29
  

  },
  output:{
    
    fontSize:25,
    fontWeight:"bold",
    margin:20,
    borderBottomWidth:4,
    color:"grey",
    width:200,
    letterSpacing:4,
    
    padding:10,
    borderColor:"grey",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center"

  },
  outputContainer:{
    
   


  },
  EndBTN:{
    backgroundColor:"#ff8600",
    padding:8,
    width:135,
    textAlign:"center",
    alignItems:"center",
    borderRadius:32,
    marginTop:40
  },
  
  
  ColumnsContainer:{
    flexDirection: "row",
    marginTop:20,
    textAlign:"center"

  },
  Columns:{
    width:120,
    fontSize:17,
    fontWeight:"bold",
    textAlign:"center",
    color:"grey"
    

  },
  HistoryItems1:{
    fontSize: 18,  
     color:"grey",
     position:"absolute",
     marginLeft:5,
     left:0,
    fontWeight:"bold"
  },
  HistoryItems2:{
    fontSize: 18,  
    position:"absolute",
     left:130,
    color:"grey",
    fontWeight:"bold"
  },
  HistoryItems3:{
    fontSize: 18,  
position:"absolute",
right:0,
marginRight:5,
    color:"grey",
    fontWeight:"bold"
  },
  HistoryItemsContainer:{
    flexDirection: "row",
    borderColor:"grey",
    borderWidth:2,
    borderRadius:10,
    marginBottom:10,
    height: 30,
    width:310


    
  },
  Xbtn:{
    backgroundColor:"red",
    width:30,
    height:30,
    borderRadius:15,
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center",
    marginRight:10
    


  
  },


});
export default App;;