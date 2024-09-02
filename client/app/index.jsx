import { StatusBar } from 'expo-status-bar';
import { Text,TouchableOpacity, View,Image, ScrollView } from 'react-native';
import { Link ,Redirect,router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRefContext } from '@react-navigation/stack';

export default function App() {
  return (
    <SafeAreaView className="h-full">

     <ScrollView contentContainerStyle={{height:'100%'}}>
 
     <View className="items-center w-full h-full top-20 px-4">

     <Image source={require('../assets/logo/logoEng.png')}/>

     {/* <Text className="text-4xl font-extrabold text-center px-4 mt-5 text-gray-800">The Passion is Everything You<Text className="text-orange-400 font-extrabold"> Need</Text></Text>  */}

     <View style={{ padding: 20 }} className="mt-96 w-full">
      <TouchableOpacity onPress={()=>{router.push("sign_in")}} className="bg-orange-600 min-h-[60px] justify-center w-full rounded-3xl items-center" ><Text className="text-2xl text-white">Get started</Text></TouchableOpacity>
     </View>

     </View>

     </ScrollView>
    {/* <StatusBar/> */}
    </SafeAreaView>
  );
}


