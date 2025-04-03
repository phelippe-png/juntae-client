import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack, Tabs, useNavigation, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import ParallaxView from "@/components/ParallaxView";
import { HelloWave } from "@/components/HelloWave";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import http from "../api/http";
import { useGlobal } from "../GlobalProvider";
import Menu from "../source/menu";
import { appModal } from "../components/modal";

export default function Login({navigation}) {
  const { user, setUser, saveData, getData } = useGlobal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { openModal } = appModal()

  const executeLogin = () => {
    http().post('/api/v1/auth/sign-in', {
      email: email,
      password: password
    }).then((response) => {
      saveData('user', JSON.stringify(
        {
          id: response.data?.id,
          name: response.data?.name,
          email: response.data?.email,
          token: response.data?.token,
        }
      ))

      setUser({
        id: response.data?.id,
        name: response.data?.name,
        email: response.data?.email,
        token: response.data?.token,
      })

      navigation.navigate('Menu')
    }).catch((error) => {
      openModal({
        text: error.response.data?.detail != undefined ? error.response.data?.detail : 'Erro ao conectar no servidor!',
        type: 'warning'
      })
    })
  }

  return (
    <>
      <ParallaxView
        headerBackgroundColor={{ light: '#0e9da3', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/login-img.png')}
            style={styles.loginLogo}
          />
        }
      >
        <ThemedView style={{flex: 1}} lightColor="#fafafa">
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title}>Login</ThemedText>
          </ThemedView>

          <ThemedView style={{flex: 1, alignItems: 'center', backgroundColor: 'transparent'}}>
            <ThemedView style={styles.inputContainer}>
              <ThemedView style={styles.inputLabelContainer}>
                <ThemedText style={styles.label}>E-mail</ThemedText>
              </ThemedView>
              <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" autoCapitalize='none' onChange={(e) => { setEmail(e.nativeEvent.text) }} />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <ThemedView style={styles.inputLabelContainer}>
                <ThemedText style={styles.label}>Senha</ThemedText>
              </ThemedView>
              <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" autoCapitalize='none' onChange={(e) => { setPassword(e.nativeEvent.text) }} />
            </ThemedView>

            <ThemedButton style={styles.loginButton} lightColor="#0e9da3" darkColor="#1D3D47" onPress={executeLogin}>
              <ThemedText style={styles.textButtons}>Entrar</ThemedText>
            </ThemedButton>
          </ThemedView>

          <ThemedView style={styles.textFooterRegister}>
            <ThemedText style={{fontFamily: 'GilroySemiBold'}}>Não possui uma conta?</ThemedText>
            <ThemedButton style={{backgroundColor: 'transparent'}} onPress={() => { navigation.navigate('Register') }}>
              <ThemedText style={{fontFamily: 'GilroySemiBold'}} lightColor="#0e9da3" darkColor="#1D3D47"> Cadastre-se</ThemedText>
            </ThemedButton>
          </ThemedView>
        </ThemedView>
      </ParallaxView>
    </>
  );
}

const styles = StyleSheet.create({
  loginLogo: {
    height: 300,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'relative',
  },

  titleContainer: {
    flex: 0.4, 
    backgroundColor: 'transparent', 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'GilroyBold',
    fontSize: 45,
    lineHeight: 45
  },

  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 22,
    borderRadius: 12,
    width: '75%',
    height: 43,
    fontFamily: 'Gilroy'
  },

  textButtons: {
    fontFamily: 'GilroyBold',
    fontSize: 18
  },

  input: {
    height: 43,
    width: '75%',
    borderRadius: 12,
    elevation: 5,
    fontFamily: 'GilroyMedium',
    paddingLeft: 9,
    paddingRight: 9
  },

  inputContainer: {
    backgroundColor: 'transparent',
    width: '100%', 
    alignItems: 'center',
    margin: 7
  },

  inputLabelContainer: {
    width: '75%',
    backgroundColor: 'transparent',
  },

  label: {
    fontFamily: 'GilroySemiBold'
  },

  textFooterRegister: {
    flex: 0.20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row', 
    backgroundColor: 'transparent'
  }
})