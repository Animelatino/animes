import React, { useState } from 'react';
import { View, Button, Text, Alert, ToastAndroid } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

function Index() {
    const [uri, setUri] = useState(null);
    const [status, requestPermission] = MediaLibrary.usePermissions();

    async function downloadFile() {
        if (!status.granted) {
            requestPermission();
        }
        try {
            FileSystem.downloadAsync(
                'http://techslides.com/demos/sample-videos/small.mp4',
                FileSystem.documentDirectory + 'small.mp4'
            )
                .then(({ uri }) => {
                    setUri(uri);
                    saveToDownload(uri);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    async function saveToDownload(uri) {
        try {
            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.getAlbumAsync('Download');
            if (album == null) {
                await MediaLibrary.createAlbumAsync('Download', asset, false);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }
        } catch (e) {}
    }

    return (
        <View>
            <Button title="Download" onPress={downloadFile} />
            {uri && (
                <Video
                    style={{ width: 300, height: 300 }}
                    source={{
                        uri: uri,
                    }}
                    useNativeControls
                    resizeMode="contain"
                />
            )}
            <Text>{JSON.stringify(status)}</Text>
            <Text>{uri}</Text>
        </View>
    );
}

export default Index;
