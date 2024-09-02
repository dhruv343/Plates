import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link ,router,Redirect} from 'expo-router';

const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginMode, setLoginMode] = useState('email'); // 'email' or 'mobile'

    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full">
                    <Image source={require('../../assets/logo/logoEng.png')} resizeMode='contain' className="w-[300px] h-[200px]" />
                    <Text className="text-3xl font-bold px-7">Log in to Plates</Text>

                    <View className="px-7 mt-10 space-y-7">
                        {/* Switch between Email and Mobile */}
                        <View className="flex-row justify-between items-center">
                            <TouchableOpacity onPress={() => setLoginMode('email')} className={`px-4 py-2 ${loginMode === 'email' ? 'bg-orange-600' : 'bg-gray-200'} rounded-full`}>
                                <Text className={`${loginMode === 'email' ? 'text-white' : 'text-gray-700'}`}>Email</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLoginMode('mobile')} className={`px-4 py-2 ${loginMode === 'mobile' ? 'bg-orange-600' : 'bg-gray-200'} rounded-full`}>
                                <Text className={`${loginMode === 'mobile' ? 'text-white' : 'text-gray-700'}`}>Mobile</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Email/Mobile Input */}
                        <View className="flex-row h-[55px] space-x-2 items-center border-2 border-gray-700 rounded-2xl mt-4 p-2">
                            <Icon name={loginMode === 'email' ? 'email' : 'phone'} size={24} color="gray" className="mr-2" />
                            <TextInput
                                placeholder={loginMode === 'email' ? "Email" : "Mobile Number"}
                                keyboardType={loginMode === 'email' ? 'email-address' : 'phone-pad'}
                                autoCapitalize="none"
                                className="flex-1 text-lg font-semibold text-gray-600"
                            />
                        </View>

                        {/* Password Input */}
                        <View className="flex-row h-[55px] space-x-2 items-center border-2 border-gray-700 rounded-2xl mt-4 p-2">
                            <Icon name="lock" size={24} color="gray" className="mr-2" />
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={!passwordVisible}
                                className="flex-1 text-lg font-semibold text-gray-600"
                            />
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center justify-between w-full mt-4 px-2">
                            {/* Remember Me */}
                            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center">
                                <View style={{
                                    width: 15,
                                    height: 15,
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 8,
                                }} className="rounded-full">
                                    {rememberMe && (
                                        <View style={{
                                            width: 15,
                                            height: 15,
                                            backgroundColor: '#007BFF',
                                        }} className="rounded-full" />
                                    )}
                                </View>
                                <Text className="text-gray-700">Remember Me</Text>
                            </TouchableOpacity>

                            {/* Forgot Password */}
                            <TouchableOpacity>
                                <Link href={"#"}>
                                    <Text className="text-blue-500 cursor-default">Forgot Password?</Text>
                                </Link>
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity onPress={()=>{router.push("HomePage")}} className="w-full mt-6 bg-orange-600 py-3 items-center rounded-2xl">
                            <Text className="text-white font-bold text-xl">Login</Text>
                        </TouchableOpacity>

                        <View className="items-center mt-6">
                            {/* Or sign in with text */}
                            <Text className="text-gray-500 mb-2 font-semibold text-lg">Or sign in with</Text>

                            {/* Social login buttons */}
                            <View className="flex-row space-x-4 items-center">
                                {/* Google Button */}
                                <TouchableOpacity className="p-3 rounded-full shadow-md">
                                    <Image
                                        source={require('../../assets/google.png')}
                                        style={{ width: 30, height: 30 }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>

                                {/* Facebook Button */}
                                <TouchableOpacity className="p-3 rounded-full shadow-md">
                                    <Image
                                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/512px-Facebook_icon.svg.png' }}
                                        style={{ width: 25, height: 25 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Sign-up link */}
                    <Link href={"sign_up"} className='mt-4 text-center'>
                        <Text className="text-blue-500 text-md">
                            Don't have an account? <Text className="font-bold">Sign Up</Text>
                        </Text>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignIn;
