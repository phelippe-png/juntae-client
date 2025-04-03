import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState } from "react"

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
  const [user, setUser] = useState({})

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
      console.log('Dados salvos com sucesso.')
    } catch (error) {
      console.log('Erro ao salvar dados: '+error)
    }
  }

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value
    } catch (error) {
      console.log('Erro ao buscar dados: '+error)
      return null
    }
  }

  return (
    <GlobalContext.Provider value={{ user, setUser, saveData, getData }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)