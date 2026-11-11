import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Cadastro from '../features/auth/screens/Cadastro';
import Entrar from '../features/auth/screens/Entrar';
import Mapa from '../features/map/screens/Mapa';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mapa">
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Entrar" component={Entrar} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
