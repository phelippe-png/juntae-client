import { ThemedView } from "@/components/ThemedView"
import { useGlobal } from "../GlobalProvider"
import { ThemedText } from "@/components/ThemedText"
import { Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewProps } from "react-native"
import { ThemedButton } from "@/components/ThemedButton"
import { useThemeColor } from "@/hooks/useThemeColor"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome6, Ionicons, Octicons } from "@expo/vector-icons"

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
  type ModalProps = {
    text?: string;
    type?: 'success' | 'warning' | 'error' | 'information' | 'question';
    onClickOk?: () => {}
  }

  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const textModal = useRef('')
  const typeModal = useRef('')
  const onClickOkModal = useRef(() => {})

  const backgroundColor = useThemeColor({}, 'background')
  const color = useThemeColor({light: 'black', dark: 'white'}, 'text')
  
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(300)).current

  useEffect(() => {
    if (visible) {
      setShowModal(true)

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 200,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {setShowModal(false)});
    }
  }, [visible]);

  const openModal = ({text, type, onClickOk = () => {}}: ModalProps) => {
    textModal.current = text
    typeModal.current = type
    onClickOkModal.current = () => {
      onClickOk()
      closeModal()
    }

    setVisible(true)
  }

  const closeModal = () => setVisible(false)

  const getTypeModal = ({type}: ModalProps) => {
    return (
      <>
        {type == 'warning' && <Ionicons name="warning" color={'orange'} size={100} />}
        {type == 'error' && <FontAwesome5 name="times-circle" color={'red'} size={90} style={{margin: 7}} />}
        {type == 'information' && <Ionicons name="information-circle-outline" color={'#336af0'} size={100} />}
        {type == 'success' && <Ionicons name="checkmark-circle-outline" color={'green'} size={100} />}
        {type == 'question' && <AntDesign name="questioncircleo" color={'orange'} size={90} style={{margin: 7}} />}
      </>
    )
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {
        showModal &&
          <Animated.View style={[styles.container, {opacity}]} >
            <Animated.View style={[styles.modal, {backgroundColor, transform: [{ translateY }]}]}>
              <TouchableOpacity style={styles.exitButton} onPress={closeModal}>
                <FontAwesome6 name="xmark" size={25} color={color} />
              </TouchableOpacity>

              <View style={{flex: 1, alignItems: 'center'}}>
                {getTypeModal({type: typeModal.current})}
                <ThemedText style={styles.text}>{textModal.current}</ThemedText>
              </View>

              {
                ['success', 'warning', 'error', 'information'].includes(typeModal.current) && (
                  <View style={styles.containerOkButton}>
                    <ThemedButton style={styles.buttons} lightColor="#0e9da3" darkColor="#1D3D47" onPress={onClickOkModal.current}>
                      <ThemedText style={styles.textButton}>Ok</ThemedText>
                    </ThemedButton>
                  </View>
                )
              }

              {/* {
                typeModal.current == 'question' && (
                  <View style={styles.containerOkButton}>
                    <ThemedButton style={[styles.buttons, {width: 100}]} lightColor="#0e9da3" darkColor="#1D3D47" onPress={onClickOkModal.current}>
                      <ThemedText style={styles.textButton}>Cancelar</ThemedText>
                    </ThemedButton>

                    <ThemedButton style={[styles.buttons, {width: 70}]} lightColor="#0e9da3" darkColor="#1D3D47" onPress={onClickOkModal.current}>
                      <ThemedText style={styles.textButton}>Sim</ThemedText>
                    </ThemedButton>

                    <ThemedButton style={[styles.buttons, {width: 70}]} lightColor="#0e9da3" darkColor="#1D3D47" onPress={onClickOkModal.current}>
                      <ThemedText style={styles.textButton}>Não</ThemedText>
                    </ThemedButton>
                  </View>
                )
              } */}
            </Animated.View>
          </Animated.View>

          // <TouchableWithoutFeedback onPress={onClose}>
          //  <View style={{ width: '100%', height: '100%', position: 'absolute' }} />
          //</TouchableWithoutFeedback>
      }
    </ModalContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },

  modal: {
    width: '70%',
    height: 300,
    borderRadius: 21,
    padding: 10,
    alignItems: 'center'
  },

  text: {
    fontFamily: 'GilroySemiBold',
    fontSize: 18,
    textAlign: 'center'
  },

  exitButton: {
    width: '97%',
    height: 52,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  containerOkButton: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  buttons: {
    width: '50%',
    height: 35,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textButton: {
    fontFamily: 'GilroyBold'
  }
})

export const appModal = () => useContext(ModalContext)