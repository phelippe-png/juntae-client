import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { ThemedView } from "@/components/ThemedView"
import { useGlobal } from "../GlobalProvider"
import { ThemedText } from "@/components/ThemedText"
import { Alert, Button, PermissionsAndroid, Platform, StatusBar, StyleSheet, Text, View } from "react-native"
import { ThemedButton } from "@/components/ThemedButton"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useEffect, useState } from "react"
import { darkMapStyle, lightMapStyle } from "../components/mapsStyles"
import MapViewDirections from "react-native-maps-directions"
import Geolocation from "react-native-geolocation-service";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useThemeColor } from '@/hooks/useThemeColor';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TripCreate from './trip';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Menu = ({navigation}) => {
  const background = useThemeColor({light: '#fafafa'}, 'background')
  const color = useThemeColor({light: 'black', dark: 'white'}, 'text')

  useEffect(() => {
    const requestLocationPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            // setOrigin({
            //   latitude: position.coords.latitude,
            //   longitude: position.coords.longitude,
            // });
          },
          (error) => Alert.alert("Erro ao obter localização", error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert("Permissão de localização negada");
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon({ focused, color, size }) {
            let iconName

            if (route.name == 'TripCreate')
              iconName = focused ? 'add-circle' : 'add-circle-outline'

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: background,
            height: 57
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 5,
            fontFamily: 'GilroySemiBold'
          },
        })}
      >
        <Tab.Screen name='TripCreate' component={TripCreate} options={{ title: 'Oferecer', headerShown: false }} />
      </Tab.Navigator>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  }
})

export default Menu