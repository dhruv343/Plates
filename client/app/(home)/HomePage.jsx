import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const HomePage = () => {
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      try {
        // Get current location
        let location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;

        // Fetch address from OpenCage
        const apiKey = '8e335b35e9b34da68b22a2d780656cbc';
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const formattedAddress = data.results[0].formatted;
          setAddress(formattedAddress);
        } else {
          setErrorMessage('No address found');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch address');
        console.error(error);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <Text>Current Address: {address}</Text>
      )}
    </View>
  );
};

export default HomePage;
