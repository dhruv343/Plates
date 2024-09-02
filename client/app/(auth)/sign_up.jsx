import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import CountryPicker from 'react-native-country-picker-modal';

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [signupMode, setSignupMode] = useState('email'); // 'email' or 'mobile'
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [countryCode, setCountryCode] = useState('US'); // Default country code

    const handleSignUp = () => {
        let valid = true;
        let errors = {};

        if (signupMode === 'email' && !validateEmail(emailOrMobile)) {
            valid = false;
            errors.emailOrMobile = 'Invalid email format';
        }
        if (signupMode === 'mobile' && !validateMobile(emailOrMobile)) {
            valid = false;
            errors.emailOrMobile = 'Invalid mobile number format';
        }
        if (password !== confirmPassword) {
            valid = false;
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!validatePassword(password)) {
            valid = false;
            errors.password = 'Password is too weak';
        }

        if (!valid) {
            setErrors(errors);
            return;
        }

        // Call your API to handle the sign-up logic
        console.log('Form submitted');
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const validateMobile = (mobile) => {
        const re = /^[0-9]{10}$/; // Basic mobile number validation
        return re.test(mobile);
    };

    const validatePassword = (password) => {
        // Example: Minimum 8 characters, at least one letter and one number
        const re = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };

    const getPasswordStrength = (password) => {
        if (password.length < 6) return 'Weak';
        if (password.length < 12) return 'Moderate';
        return 'Strong';
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
                <View className="flex-1 p-4">
                    <Image source={require('../../assets/logo/logoEng.png')} resizeMode='contain' className="w-3/4 mx-auto border-2" />
                    <Text className="text-3xl font-bold text-center mb-6">Sign Up for Plates</Text>

                    <View className="space-y-6">
                        {/* Switch between Email and Mobile */}
                        <View className="flex-row justify-between">
                            <TouchableOpacity onPress={() => setSignupMode('email')} className={`px-4 py-2 ${signupMode === 'email' ? 'bg-orange-600' : 'bg-gray-200'} rounded-full`}>
                                <Text className={`${signupMode === 'email' ? 'text-white' : 'text-gray-700'}`}>Email</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSignupMode('mobile')} className={`px-4 py-2 ${signupMode === 'mobile' ? 'bg-orange-600' : 'bg-gray-200'} rounded-full`}>
                                <Text className={`${signupMode === 'mobile' ? 'text-white' : 'text-gray-700'}`}>Mobile</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Country Code Input */}
                        {signupMode === 'mobile' && (
                            <View className="flex-row items-center border-2 border-gray-700 rounded-2xl px-2 py-1">
                                <CountryPicker
                                    countryCode={countryCode}
                                    withFlag
                                    withFilter
                                    withCountryNameButton
                                    withAlphaFilter
                                    onSelect={(country) => setCountryCode(country.cca2)}
                                />
                                <Text className="ml-2 text-lg">{countryCode}</Text>
                            </View>
                        )}

                        {/* Email/Mobile Input */}
                        <View className="flex-row items-center border-2 border-gray-700 rounded-2xl px-2 py-2">
                            <Icon name={signupMode === 'email' ? 'email' : 'phone'} size={24} color="gray" className="mr-2" />
                            <TextInput
                                placeholder={signupMode === 'email' ? "Email" : "Mobile Number"}
                                keyboardType={signupMode === 'email' ? 'email-address' : 'phone-pad'}
                                autoCapitalize="none"
                                value={emailOrMobile}
                                onChangeText={setEmailOrMobile}
                                className="flex-1 text-lg font-semibold text-gray-600"
                            />
                        </View>
                        {errors.emailOrMobile && <Text className="text-red-500">{errors.emailOrMobile}</Text>}

                        {/* Password Input */}
                        <View className="flex-row items-center border-2 border-gray-700 rounded-2xl px-2 py-2">
                            <Icon name="lock" size={24} color="gray" className="mr-2" />
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={!passwordVisible}
                                value={password}
                                onChangeText={setPassword}
                                className="flex-1 text-lg font-semibold text-gray-600"
                            />
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                        {
                            password.length > 0 && (
                                <View className="flex-row justify-between items-center mt-1">
                                    <Text className={`text-${getPasswordStrength(password) === 'Weak' ? 'red-500' : getPasswordStrength(password) === 'Moderate' ? 'orange-500' : 'green-500'}`}>
                                        Password Strength: {getPasswordStrength(password)}
                                    </Text>
                                </View>
                            )
                        }

                        {errors.password && <Text className="text-red-500">{errors.password}</Text>}

                        {/* Confirm Password Input */}
                        <View className="flex-row items-center border-2 border-gray-700 rounded-2xl px-2 py-2">
                            <Icon name="lock" size={24} color="gray" className="mr-2" />
                            <TextInput
                                placeholder="Confirm Password"
                                secureTextEntry={!confirmPasswordVisible}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                className="flex-1 text-lg font-semibold text-gray-600"
                            />
                            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <Icon name={confirmPasswordVisible ? "visibility" : "visibility-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && <Text className="text-red-500">{errors.confirmPassword}</Text>}

                        {/* Sign Up Button */}
                        <TouchableOpacity className="w-full mt-6 bg-orange-600 py-3 items-center rounded-2xl" onPress={handleSignUp}>
                            <Text className="text-white font-bold text-xl">Sign Up</Text>
                        </TouchableOpacity>

                        <View className="items-center mt-6">
                            {/* Or sign up with text */}
                            <Text className="text-gray-500 mb-2 font-semibold text-lg">Or sign up with</Text>

                            {/* Social sign-up buttons */}
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

                    {/* Sign-in link */}
                    <View className="items-center mt-6">
                        <Link href={"sign_in"} className='text-center'>
                            <Text className="text-blue-500 text-md">
                                Already have an account? <Text className="font-bold">Sign In</Text>
                            </Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUp;
