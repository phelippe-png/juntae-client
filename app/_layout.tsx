import './gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import Home from './index';
import Login from './auth/login';
import Register from './auth/register';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Gilroy: require('../assets/fonts/Gilroy-Regular.ttf'),
    GilroyBold: require('../assets/fonts/Gilroy-Bold.ttf'),
    GilroyMedium: require('../assets/fonts/Gilroy-Medium.ttf'),
    GilroySemiBold: require('../assets/fonts/Gilroy-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{
        animation: 'fade_from_bottom'
      }}>
        {/* <Stack.Screen name='Home' component={Home} options={{headerShown: false}}  /> */}
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}