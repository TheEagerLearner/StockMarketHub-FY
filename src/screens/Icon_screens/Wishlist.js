import React from 'react';
import { View,StyleSheet,Text,FlatList,ToastAndroid,AsyncStorage } from 'react-native';
import WishCard from '../../components/WishCard';
import { auth,database } from '../../features/Firebase/firebase';
import StockApi from '../../features/StockApi/StockApi';


const Wishlist = ({navigation}) => {

    
  const [uid,setUid] = React.useState('');
  const [name,setName] = React.useState('user');
  const [inWish,setInWish] = React.useState(false);
  const [wishlist,setWishlist] = React.useState([]);


  

  const getPred = async (res) => {
    try{
        const newsPred =  (await StockApi.get(`/predict/senti/${res}`)).data.Prediction;
        
        if(newsPred.localeCompare('BUY')){
          return(true);
        }
        else{
          return(false);        
        }

    }
    catch(err){
        console.log(`error at getPred =====> ${err} ${res}`);
        return(false);
    } 
} 

  
        //Retrive Auth Data and search in Realtime db using UID
        const retrieveData = async () => {
          auth.onAuthStateChanged((user) => {
            if (user) {
        
              var uid = user.uid;
              setUid(uid);
              // ...
              const dbRef = database.ref();
              dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                  var user=snapshot.val();
                  console.log(snapshot.val());
                  const wishlist = user.wishlist;
                  setWishlist(wishlist);
                  console.log(wishlist);
                  //console.log(wishlist.includes(res.toUpperCase()));

  
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
            } else {
              // User is signed out
              // ...
              console.log('No user present');
            }
          });
          };

  
          const storeTicker = async (ticker) => {

            try{
        
              await AsyncStorage.setItem(
                'ticker',
                ticker
              );
        
            }
            catch(err){
              console.log(err.title);
              console.log(err.message);
            }
          }

  React.useEffect(()=>{
    retrieveData();
  },[]);

    return(
        <View style={stylesheet.container}>
      <Text style={stylesheet.text}>Wishlist</Text>
            <FlatList 
                style={{
                    width:'100%',
                    marginTop:40
                    
                }}
                data = {wishlist}
                renderItem = {({item})=>{

                    const buy = getPred(item)
                    console.log(buy);

                    return(
                        <WishCard 
                            onPress={()=>{
                                storeTicker(item);
                                console.log(item)
                                navigation.navigate('Home');
                            }}
                            name={item}
                            buy={buy}
                        />
                    );

                }}
            />

        </View>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'

    },
    text: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#1B2430",
      letterSpacing: 2,
      marginLeft: 20,
      marginTop:20
  },
});

export default Wishlist;