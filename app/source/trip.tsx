import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { ThemedView } from "@/components/ThemedView"
import { useGlobal } from "../GlobalProvider"
import { ThemedText } from "@/components/ThemedText"
import { Alert, Button, PermissionsAndroid, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native"
import { ThemedButton } from "@/components/ThemedButton"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useEffect, useRef, useState } from "react"
import { darkMapStyle, lightMapStyle } from "../components/mapsStyles"
import MapViewDirections from "react-native-maps-directions"
import Geolocation from "react-native-geolocation-service";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';

const TripCreate = ({navigation}) => {
  const background = useThemeColor({light: '#fafafa'}, 'background')
  const backgroundSeparator = useThemeColor({light: '#ccc', dark: '#fafafa'}, 'background')
  const backgroundInput = useThemeColor({light: 'white', dark: '#222223'}, 'background')
  const color = useThemeColor({light: 'black', dark: 'white'}, 'text')

  const { user, setUser } = useGlobal()
  const [forceUpdate, setForceUpdate] = useState(false)

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const searchInput = useRef()
  const selectionStatus = useRef('origin')
  const mapRef = useRef(null);

  const inputStyle = {
    container: { 
      position: "absolute",
      width: "90%",
      alignSelf: "center",
      top: 75,
      alignItems: 'flex-end'
    },
    textInputContainer: {
      backgroundColor: "transparent",
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    textInput: {
      height: 45,
      borderRadius: 10,
      fontSize: 16,
      backgroundColor: backgroundInput,
      color: color,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      fontFamily: 'GilroySemiBold',
      paddingRight: 40
    },
    listView: {
      backgroundColor: backgroundInput,
      borderRadius: 10,
      marginTop: 5,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    row: {
      padding: 10,
      height: 45,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: backgroundInput,
    },
    separator: {
      height: 0.5,
      backgroundColor: backgroundSeparator,
    },
    description: {
      fontSize: 14,
      color: color,
      fontFamily: 'GilroySemiBold'
    },
    poweredContainer: {
      display: 'none'
    }
  }

  const selectionMarker = (event, state) => {
    state({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude
    })

    // searchInput.current.setValue('sdubhjfiujsdghfb')
  }

  const handleLocationSelect = (data, details) => {
    if (details) {
      mapRef.current.animateToRegion({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      selectionStatus.current == 'origin' ?
        setOrigin({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        })
      : 
        setDestination({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        })
    }
  }

  const clearInput = () => {
    searchInput.current.clear()
    selectionStatus.current == 'origin' ? setOrigin(null) : setDestination(null)
  }

  return (
    <ThemedView style={styles.container} lightColor="#fafafa">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={useColorScheme() == 'light' ? lightMapStyle : darkMapStyle}
        showsUserLocation
        initialRegion={{
          latitude: origin ? origin.latitude : -23.55052,
          longitude: origin ? origin.longitude : -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => {selectionMarker(e, selectionStatus.current == 'origin' ? setOrigin : setDestination)}}

        region={{
          latitude: origin ? origin.latitude : -23.55052,
          longitude: origin ? origin.longitude : -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {
          origin && <Marker coordinate={origin} title="Origem"/>
        }
        {
          destination && <Marker coordinate={destination} title="Destino" pinColor="red" />
        }

        {(origin && destination) &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="yellow"
            mode="DRIVING"
            onReady={(e) => {console.log(e.legs[0].end_address)}}
          />
        }
      </MapView>

      <View style={[styles.containerQuestion, {backgroundColor: background}]}>
        <View style={{width: '90%', height: 67, justifyContent: 'flex-end'}}>
          <ThemedText style={{fontFamily: 'GilroyBold', fontSize: 23}}>{selectionStatus.current == 'origin' ? 'Qual o local de partida?' : 'Qual o local de chegada?'}</ThemedText>
        </View>

        <GooglePlacesAutocomplete
          ref={searchInput}
          placeholder={selectionStatus.current == 'origin' ? 'Informe o endereço de origem' : 'Informe o endereço de destino'}
          onPress={handleLocationSelect}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "pt-BR",
          }}
          fetchDetails={true}
          textInputProps={{placeholderTextColor: color}}
          styles={inputStyle}
        />

        <View style={styles.containerCleanButton}>
          <TouchableOpacity style={styles.cleanButton} onPress={clearInput}>
            <FontAwesome5 name='times' color={color} size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerNextButton}>
        {
          (selectionStatus.current == 'origin' && origin || selectionStatus.current == 'destination') && (
            <ThemedButton style={styles.nextBackButton} lightColor="#0e9da3" darkColor="#204d5c" onPress={() => { searchInput.current.clear(); selectionStatus.current = 'destination'; setForceUpdate(!forceUpdate) }}>
              <Ionicons name='arrow-forward' size={27} color={color} />
            </ThemedButton>
          )
        }
      </View>

      <View style={styles.containerBackButton}>
        {
          selectionStatus.current == 'destination' && (
            <ThemedButton style={styles.nextBackButton} lightColor="#0e9da3" darkColor="#204d5c" onPress={() => { searchInput.current.clear(); selectionStatus.current = 'origin'; setDestination(null) }}>
              <Ionicons name='arrow-back' size={27} color={color} />
            </ThemedButton>
          )
        }
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  containerQuestion: {
    width: '100%',
    alignItems: 'center',
    height: 137,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  map: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },

  containerNextButton: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 15
  },

  containerBackButton: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    marginRight: 15
  },

  nextBackButton: {
    width: 55,
    height: 55,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },

  containerCleanButton: {
    flex: 0.9,
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // paddingRight: 13
  },

  cleanButton: {
    width: 41, 
    height: 41, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

export default TripCreate