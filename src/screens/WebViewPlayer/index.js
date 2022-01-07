import React, { useEffect } from 'react';
import WebView from 'react-native-webview';

import * as ScreenOrientation from 'expo-screen-orientation';

function index({ route }) {
    useEffect(() => {
        async function lndWindow() {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE
            );
        }
        lndWindow();
        return async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
            );
        };
    }, []);

    const { id = 'Dq0zGJetSqo', url } = route.params;

    let iframeUrl;

    if (id) {
        iframeUrl = `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&showinfo=0&controls=0`;
    } else {
        iframeUrl = url;
    }

    return (
        <WebView
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            source={{
                uri: iframeUrl,
            }}
        />
    );
}

export default index;
