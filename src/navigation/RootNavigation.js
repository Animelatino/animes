import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icons from 'react-native-vector-icons';

import Home from '../screens/Home';
import Busqueda from '../screens/Busqueda';
import Directorio from '../screens/Directorio';
import Perfil from '../screens/Perfil';
import AuthenticateUser from '../utils/AuthenticateUser';
import { useStore } from '../store/StoreProvider';

const Tab = createBottomTabNavigator();

export default () => {
    const { config } = useStore();
    const { colors, space, fontSizes } = useTheme();
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Inicio') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Directorio') {
                            iconName = focused ? 'flash' : 'flash-outline';
                        } else if (route.name === 'Busqueda') {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (route.name === 'Perfil') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return (
                            <Icons.Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor: colors.white,
                    inactiveTintColor: colors.gray,
                    style: {
                        height: 65,
                        backgroundColor: colors.navigation,
                        borderTopWidth: 0,
                    },
                    tabStyle: {
                        paddingTop: space.xxs,
                        paddingBottom: space.xs,
                    },
                    labelStyle: {
                        fontFamily: 'SemiBold',
                        fontSize: fontSizes.body3,
                    },
                }}
            >
                <Tab.Screen name="Inicio" component={Home} />
                <Tab.Screen name="Busqueda" component={Busqueda} />
                <Tab.Screen name="Directorio" component={Directorio} />
                {config?.perfil && (
                    <Tab.Screen name="Perfil" component={Perfil} />
                )}
            </Tab.Navigator>
            <AuthenticateUser />
        </>
    );
};
