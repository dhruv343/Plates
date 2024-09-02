import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InputField = ({ icon, placeholder, secureTextEntry, value, onChangeText, onPressIcon }) => (
    <View className="flex-row items-center border-2 border-gray-700 rounded-2xl px-2 py-1">
        <Icon name={icon} size={24} color="gray" className="mr-2" />
        <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            className="flex-1 text-lg font-semibold text-gray-600"
        />
        {onPressIcon && <TouchableOpacity onPress={onPressIcon}><Icon name={icon} size={24} color="gray" /></TouchableOpacity>}
    </View>
);

export default InputField;
