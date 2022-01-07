import React, { PureComponent, createRef, useEffect } from 'react';
import Loader from '../../components/Loader';
import { _generateVideos } from '../../functions/generate';
import Controls from './Controls';
import NativeVideo from './NativeVideo';
import { WebView } from 'react-native-webview';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import Ads from './Ads';

export default (props) => {
    const navigation = useNavigation();
    async function backAction() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
        );
        navigation.goBack();
    }

    useEffect(() => {
        activateKeepAwake();
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => {
            backHandler.remove();
            deactivateKeepAwake();
        };
    }, []);
    return <Index {...props} navigation={navigation} />;
};

class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.videoRef = createRef();
        this.state = {
            videoData: {},
            resizeMode: 'contain',
        };
    }

    componentDidMount = async () => {
        this.loadVideo();
    };

    loadVideo = async () => {
        try {
            const { item } = this.props.route.params;
            if (item.server.type == 1) {
                this.setState({
                    iframe: item.server.embed
                        ? item.server.embed.replace('{id}', item.code)
                        : item.code,
                });
            } else {
                const videos = await _generateVideos(item);
                console.log(videos[0].file);
                if (videos) {
                    this.videoRef.current.loadAsync(
                        {
                            uri: videos[0].file,
                        },
                        (initialStatus = {
                            shouldPlay: true,
                            positionMillis: 0,
                        }),
                        (downloadFirst = true)
                    );
                } else {
                }
            }
        } catch (error) {}
    };

    onLoad = (data) => {
        this.setState({
            videoData: data,
            loadVideo: true,
        });
    };

    onPlaybackStatusUpdate = (data) => {
        if (this.videoRef.current)
            this.setState({
                videoData: data,
            });
    };

    onError = (error) => {};

    componentWillUnmount = () => {
        this.videoRef.current = null;
    };

    onChangeMode = (resizeMode) => {
        this.setState({
            resizeMode: resizeMode,
        });
    };

    render() {
        const { videoData, loadVideo, loadIframe, iframe, resizeMode } =
            this.state;
        const { episode } = this.props.route.params;
        if (iframe) {
            const html = `
                <html>
                <head></head>
                <body style="margin: 0; padding: 0">
                    <iframe scrolling="no" allowfullscreen style="width: 100%; height: 100%; border: 0" sandbox="allow-scripts allow-same-origin allow-forms" src="${iframe}" allow="fullscreen" style="display: initial;"></iframe>
                </body>
                </html>
            `;
            return (
                <>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html }}
                        onLoadEnd={() => this.setState({ loadIframe: true })}
                    />
                    {loadIframe && <Ads />}
                </>
            );
        } else
            return (
                <>
                    <NativeVideo
                        resizeMode={resizeMode}
                        videoRef={this.videoRef}
                        onLoad={this.onLoad}
                        onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
                        onError={this.onError}
                    />

                    {loadVideo ? (
                        <>
                            <Controls
                                videoRef={this.videoRef}
                                videoData={videoData}
                                {...this.props}
                                resizeMode={resizeMode}
                                onChangeMode={this.onChangeMode}
                                episode={episode}
                            />
                        </>
                    ) : (
                        <Loader absolute={true} />
                    )}
                </>
            );
    }
}
