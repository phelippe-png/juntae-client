import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack, Tabs, useNavigation, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useRef } from "react";
import ParallaxView from "@/components/ParallaxView";
import { HelloWave } from "@/components/HelloWave";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { DateTimePickerApp } from "@/components/ThemedDateTimePicker";
import moment from "moment";

export default function Register({navigation}) {
  const dataInicioAtual = useRef(moment().format('DD/MM/YYYY'))

  return (
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
          <ThemedText style={styles.title}>Crie sua conta</ThemedText>
        </ThemedView>

        <ThemedView style={{flex: 1, alignItems: 'center', justifyContent: "center", backgroundColor: 'transparent'}}>
          <ScrollView style={{width: '100%'}}>
            <ThemedView style={{alignItems: 'center', backgroundColor: 'transparent'}}>
              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Nome</ThemedText>
                </ThemedView>
                <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" />
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>E-mail</ThemedText>
                </ThemedView>
                <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" />
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Senha</ThemedText>
                </ThemedView>
                <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" />
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Data de nascimento</ThemedText>
                </ThemedView>

                <DateTimePickerApp style={styles.datePicker} styleText={{fontFamily: 'GilroyMedium'}} lightColor="white" darkColor="#222223" refDate={dataInicioAtual} />
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Telefone</ThemedText>
                </ThemedView>
                <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" />
              </ThemedView>

              <ThemedButton style={styles.loginButton} lightColor="#0e9da3" darkColor="#1D3D47">
                <ThemedText style={styles.textButtons}>Cadastrar</ThemedText>
              </ThemedButton>
            </ThemedView>
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.textFooterRegister}>
          <ThemedText style={{fontFamily: 'GilroySemiBold'}}>Já possui uma conta?</ThemedText>
          <ThemedButton style={{backgroundColor: 'transparent'}} onPress={() => { navigation.navigate('Login') }}>
            <ThemedText style={{fontFamily: 'GilroySemiBold'}} lightColor="#0e9da3" darkColor="#1D3D47"> Faça o login</ThemedText>
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    </ParallaxView>
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
    flex: 0.15, 
    backgroundColor: 'transparent', 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'GilroyBold',
    fontSize: 37,
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
    fontSize: 17,
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
    margin: 5
  },

  inputLabelContainer: {
    width: '75%',
    backgroundColor: 'transparent',
  },

  label: {
    fontFamily: 'GilroySemiBold'
  },

  textFooterRegister: {
    flex: 0.13, 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row', 
    backgroundColor: 'transparent'
  },

  datePicker: {
    height: 43,
    width: '75%',
    fontSize: 17,
    borderRadius: 12,
    elevation: 1,
    fontFamily: 'GilroyMedium',
    paddingLeft: 9,
    paddingRight: 9,
    justifyContent: 'center'
  }
})