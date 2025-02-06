import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack, Tabs, useNavigation, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useEffect } from "react";
import ParallaxView from "@/components/ParallaxView";
import { HelloWave } from "@/components/HelloWave";
import { ThemedButton } from "@/components/ThemedButton";

export default function Home({navigation}) {
  return (
    <ParallaxView
      headerBackgroundColor={{ light: '#0e9da3', dark: '#1D3D47' }}
    >
      <ThemedView style={{flex: 1, alignItems: 'center'}}>
        <HelloWave></HelloWave>
      </ThemedView>

      <ThemedView style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <ThemedButton style={styles.buttons} lightColor="#0e9da3" darkColor="#1D3D47">
          <ThemedText style={styles.textButtons}>CADASTRE-SE</ThemedText>
        </ThemedButton>

        <ThemedButton style={styles.buttons} onPress={() => { navigation.navigate('Login') }}>
          <ThemedText style={styles.textButtons}>LOGIN</ThemedText>
        </ThemedButton>
      </ThemedView>
    </ParallaxView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    borderRadius: 7,
    width: '70%',
    height: 50,
    fontFamily: 'Gilroy'
  },

  textButtons: {
    fontFamily: 'GilroyBold',
  }
})