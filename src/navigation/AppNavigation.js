import React, { useRef } from 'react';
import * as Analytics from 'expo-firebase-analytics';
import {
    NavigationContainer,
    DefaultTheme,
    useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useStore } from '../store/StoreProvider';

import RootNavigation from './RootNavigation';

import Animes from '../screens/Animes';
import Generos from '../screens/Generos';
import Anime from '../screens/Anime';
import Episodios from '../screens/Episodios';
import Player from '../screens/Player';
import VideoPlayer from '../screens/VideoPlayer';
import Descargas from '../screens/Descargas';
import WebViewPlayer from '../screens/WebViewPlayer';

import SettingsScreen from '../screens/SettingsScreen';
import TosScreen from '../screens/TosScreen';
import DmcaScreen from '../screens/DmcaScreen';

import NetworkDetect from '../utils/NetworkDetect';
import NewVersion from '../utils/NewVersion';

import WindowDimensions from '../utils/WindowDimensions';

const Stack = createStackNavigator();

export default () => {
    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef();

    const { config } = useStore();

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary50: '#E6E6E6',
            primary100: '#BFBFBF',
            primary200: '#959595',
            primary300: '#6B6B6B',
            primary400: '#4B4B4B',
            primary500: '#2B2B2B',
            primary600: '#262626',
            primary700: '#202020',
            primary800: '#1A1A1A',
            primary900: '#101010',
            secondary50: '#ffe9ef',
            secondary100: '#ffc9d5',
            secondary200: '#f8919d',
            secondary300: '#f26276',
            secondary400: '#ff2d54',
            secondary500: '#ff0038',
            secondary600: '#f70038',
            secondary700: '#e50031',
            secondary800: '#d80029',
            secondary900: '#c9001d',
            white: '#fff',
            gray: '#a0a0a0',
            black: '#000',
            background: '#000000',
            text: '#FFFFFF',
            primary: '#FF2D54',
            card: '#181818',
            border: 'rgb(35, 35, 45)',
            search: 'rgb(27, 27, 27)',
            notification: 'rgb(255, 69, 58)',
            overflow: 'rgb(210, 210, 210)',
            placeholder: 'rgb(46, 46, 46)',
            navigation: '#18191e',
            detailed: 'rgb(26, 26, 26)',
        },
        fontSizes: {
            h0: 55,
            h1: 24,
            h2: 22,
            h3: 20,
            h4: 18,
            h5: 16,
            body1: 15,
            body2: 14,
            body3: 13,
        },
        space: {
            xxs: 4,
            xs: 8,
            sm: 12,
            md: 16,
            lg: 20,
            xl: 24,
            xxl: 32,
        },
        radio: {
            sm: 4,
            md: 8,
            xl: 12,
        },
    };

    return (
        <>
            <NavigationContainer
                theme={MyTheme}
                ref={navigationRef}
                onReady={async () => {
                    routeNameRef.current = navigationRef.getCurrentRoute().name;
                }}
                onStateChange={async () => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName =
                        navigationRef.getCurrentRoute().name;
                    if (previousRouteName !== currentRouteName) {
                        await Analytics.logEvent('screen_view', {
                            screen_name: currentRouteName,
                        });
                    }
                    routeNameRef.current = currentRouteName;
                }}
            >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Tabs" component={RootNavigation} />
                    <Stack.Screen name="Animes" component={Animes} />
                    <Stack.Screen name="Generos" component={Generos} />
                    <Stack.Screen name="Anime" component={Anime} />
                    <Stack.Screen name="Episodios" component={Episodios} />
                    <Stack.Screen name="Player" component={Player} />
                    <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="Tos" component={TosScreen} />
                    <Stack.Screen name="Dmca" component={DmcaScreen} />
                    <Stack.Screen name="Descargas" component={Descargas} />
                    <Stack.Screen
                        name="WebViewPlayer"
                        component={WebViewPlayer}
                    />
                </Stack.Navigator>
                {/* <NetworkDetect /> */}
                {config.updates && <NewVersion />}
                <WindowDimensions />
            </NavigationContainer>
        </>
    );
};
