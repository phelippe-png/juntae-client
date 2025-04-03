import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack, Tabs, useNavigation, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useRef, useState } from "react";
import ParallaxView from "@/components/ParallaxView";
import { HelloWave } from "@/components/HelloWave";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { DateTimePickerApp } from "@/components/ThemedDateTimePicker";
import moment from "moment";
import { appModal } from "../components/modal";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import http from "../api/http";

export default function Register({navigation}) {
  const color = useThemeColor({light: 'black', dark: 'white'}, 'text')

  const name = useRef('')
  const email = useRef('')
  const password = useRef('')
  const birthDate = useRef('')
  const phone = useRef('')
  const {openModal} = appModal()
  const [showHidePassword, setShowHidePassword] = useState(true)

  const registerUser = () => {
    if (name.current.trim() == '' || email.current == '' || password.current == '' || birthDate.current == '' || phone.current == '') {
      openModal({
        text: 'Preencha os campos obrigatórios',
        type: 'warning'
      })

      return null
    }

    if (password.current.length < 8) {
      openModal({
        text: 'A senha deve conter no mínimo 8 caracteres',
        type: 'warning'
      })

      return null
    }

    http().post('/api/v1/users', {
      name: name.current,
      email: email.current,
      password: password.current,
      birthDate: moment(birthDate.current, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      phoneNumber: phone.current
    }).then((response) => {
      openModal({
        text: 'Cadastro efetuado com sucesso',
        type: 'success',
        onClickOk: () => {
          navigation.goBack()
        }
      })
    }).catch((error) => {
      openModal({
        text: error.response.data?.detail != undefined ? error.response.data?.detail : 'Erro ao conectar no servidor!',
        type: 'warning'
      })
    })

    
  }

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
          <ScrollView style={{width: '100%'}} keyboardShouldPersistTaps="always">
            <ThemedView style={{alignItems: 'center', backgroundColor: 'transparent'}}>
              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Nome</ThemedText>
                  <ThemedText style={styles.requiredLabel}> *</ThemedText>
                </ThemedView>
                <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" onChange={(e) => { name.current = e.nativeEvent.text }} />
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>E-mail</ThemedText>
                  <ThemedText style={styles.requiredLabel}> *</ThemedText>
                </ThemedView>
                <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" autoCapitalize='none' onChange={(e) => { email.current = e.nativeEvent.text }} />
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Senha</ThemedText>
                  <ThemedText style={styles.requiredLabel}> *</ThemedText>
                </ThemedView>

                <View style={{width: '75%'}}>
                  <ThemedInput style={[styles.input, {width: '100%', paddingRight: 41}]} lightColor="white" darkColor="#222223" secureTextEntry={showHidePassword} onChange={(e) => { password.current = e.nativeEvent.text }} />
                    
                  <View style={styles.eyeButtonContainer}>
                    <TouchableOpacity onPress={() => { setShowHidePassword(!showHidePassword) }}>
                      <Ionicons name={showHidePassword ? 'eye-outline' : 'eye-off-outline'} color={color} size={25}/>
                    </TouchableOpacity>
                  </View>                    
                </View>
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Data de nascimento</ThemedText>
                  <ThemedText style={styles.requiredLabel}> *</ThemedText>
                </ThemedView>
                <DateTimePickerApp style={styles.datePicker} styleText={{fontFamily: 'GilroyMedium'}} lightColor="white" darkColor="#222223" refDate={birthDate} />
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.inputLabelContainer}>
                  <ThemedText style={styles.label}>Telefone</ThemedText>
                  <ThemedText style={styles.requiredLabel}> *</ThemedText>
                </ThemedView>
                <ThemedInput style={styles.input} lightColor="white" darkColor="#222223" keyboardType="number-pad" onChange={(e) => { phone.current = e.nativeEvent.text }} />
              </ThemedView>

              <ThemedButton style={styles.loginButton} lightColor="#0e9da3" darkColor="#1D3D47" onPress={registerUser}>
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
    flex: 0.17, 
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
    flexDirection: 'row'
  },

  label: {
    fontFamily: 'GilroySemiBold'
  },

  requiredLabel: {
    fontFamily: 'GilroySemiBold',
    color: 'red'
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
  },

  eyeButtonContainer: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    alignItems: 'flex-end', 
    justifyContent: 'center',
    paddingRight: 10
  }
})