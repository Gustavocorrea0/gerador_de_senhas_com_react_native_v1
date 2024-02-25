// Imports de navegação
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// Imports de Icones
import { Ionicons } from "@expo/vector-icons"
// Imports de paginas
import { Home } from './pages/home'
import { Passwords } from './pages/passwords'

// Cria botoes de navegação
const  Tab = createBottomTabNavigator()

export function Routes() {
    return(
        // Tab.Navigator = Barra de navegação
        // Tab.Screen = Telas
        // TabBarIcon = manipulção de icones
        // focused = foco na tela
        // size = tamanho do icone
        // color = cor do icone

        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false, // Desativa o nome do icone
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if(focused){
                            return <Ionicons size={size} color={color} name="home"/>
                        }

                        return <Ionicons size={size} color={color} name="home-outline"/>
                    }
                }}
            />

            <Tab.Screen
                name="passwords"
                component={Passwords}
                options={{
                    tabBarShowLabel: false, // Desativa o nome do icone
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if(focused){
                            return <Ionicons size={size} color={color} name="lock-closed"/>
                        }

                        return <Ionicons size={size} color={color} name="lock-closed-outline"/>
                    }
                }}
            />

        </Tab.Navigator>
    )
}
