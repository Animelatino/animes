import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import StoreProvider, { useDispatch } from './src/store/StoreProvider';
import { api } from './src/db/api';
import { types } from './src/store/StoreReducer';
import Loader from './src/components/Loader';
import Loading from './src/utils/Loading';

const MyAppWithProviders = () => {
    const [fetching, setFetching] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        async function GetDataServer() {
            try {
                const configJson = await api.get('config?v=3.1.1');
                dispatch({ type: types.updateConfig, data: configJson.data });
                setFetching(false);
            } catch {}
        }
        GetDataServer();
        return () => {
            setFetching(true);
        };
    }, []);

    return <AppNavigation />;
};

function App() {
    const [loaded] = useFonts({
        Black: require('./assets/fonts/Black.ttf'),
        Bold: require('./assets/fonts/Bold.ttf'),
        Cube: require('./assets/fonts/Cube.ttf'),
        ExtraBold: require('./assets/fonts/ExtraBold.ttf'),
        ExtraLight: require('./assets/fonts/ExtraLight.ttf'),
        Heavy: require('./assets/fonts/Heavy.ttf'),
        Light: require('./assets/fonts/Light.ttf'),
        Medium: require('./assets/fonts/Medium.ttf'),
        Outline: require('./assets/fonts/Outline.ttf'),
        Neon: require('./assets/fonts/Neon.ttf'),
        Regular: require('./assets/fonts/Regular.ttf'),
        RoundedBold: require('./assets/fonts/Rounded-Bold.ttf'),
        RoundedExtraBold: require('./assets/fonts/Rounded-ExtraBold.ttf'),
        RoundedMedium: require('./assets/fonts/Rounded-Medium.ttf'),
        Shadow: require('./assets/fonts/Shadow.ttf'),
        Thin: require('./assets/fonts/Thin.ttf'),
        SemiBold: require('./assets/fonts/SemiBold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <StoreProvider>
            <StatusBar hidden={true} />
            <MyAppWithProviders />
        </StoreProvider>
    );
}

export default App;
