import React, { PureComponent, createRef } from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Vibration,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import * as Icons from 'react-native-vector-icons';
import TouchableButton from '../../components/TouchableButton';
import Slider from '@react-native-community/slider';
import Ads from './Ads';
import { formatTime } from '../../functions/strings';
import * as ScreenOrientation from 'expo-screen-orientation';

export default (props) => {
    const { colors } = useTheme();
    return <Controls {...props} colors={colors} />;
};

class Controls extends PureComponent {
    constructor(props) {
        super(props);
        this.AnimationOverlay = new Animated.Value(0);
        this.TimerHandler = createRef();
        this.state = {
            controlsEnable: false,
        };
    }

    onAnimationRun = () => {
        this.setState(
            {
                controlsEnable: true,
            },
            () => {
                Animated.timing(this.AnimationOverlay, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        );
    };

    onOutAnimationRun = (callback) => {
        Animated.timing(this.AnimationOverlay, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            callback();
        });
    };

    onRefreshTimer = () => {
        clearTimeout(this.TimerHandler.current);
        this.TimerHandler.current = setTimeout(() => {
            if (this.TimerHandler.current) {
                this.onOutAnimationRun(() => {
                    this.setState({
                        controlsEnable: false,
                    });
                });
            }
        }, 5000);
    };

    onPressAnime = async () => {
        // const { episode, navigation, videoRef } = this.props;
        // navigation.pop();
        // await ScreenOrientation.lockAsync(
        //     ScreenOrientation.OrientationLock.PORTRAIT
        // );
        // navigation.push('Anime', { slug: episode?.anime?.slug });
    };

    changeMode = () => {
        const { resizeMode, onChangeMode } = this.props;
        if (resizeMode == 'contain') {
            onChangeMode('stretch');
        } else if (resizeMode == 'stretch') {
            onChangeMode('cover');
        } else {
            onChangeMode('contain');
        }
    };

    toogleControls = () => {
        if (this.state.controlsEnable) {
            this.onOutAnimationRun(() => {
                this.setState({
                    controlsEnable: false,
                });
            });
        } else {
            this.onAnimationRun();
            this.onRefreshTimer();
        }
    };

    onRewind = () => {
        const { videoRef, videoData } = this.props;
        videoRef.current.setPositionAsync(
            videoData?.positionMillis - 10 * 1000
        );
        this.onRefreshTimer();
    };

    onForward = () => {
        const { videoRef, videoData } = this.props;
        videoRef.current.setPositionAsync(
            videoData?.positionMillis + 10 * 1000
        );
        this.onRefreshTimer();
    };

    tooglePlayPause = () => {
        const { videoRef, videoData } = this.props;
        if (videoData.isPlaying) {
            videoRef.current.pauseAsync();
        } else {
            videoRef.current.playAsync();
        }
        Vibration.vibrate(15);
        this.onRefreshTimer();
    };

    onSkipIntro = () => {
        const { videoRef, videoData } = this.props;
        videoRef.current.setPositionAsync(
            videoData?.positionMillis + 85 * 1000
        );
        this.onRefreshTimer();
    };

    onValueChange = (e) => {
        const { videoRef } = this.props;
        videoRef.current.setPositionAsync(e);
        this.onRefreshTimer();
    };

    componentWillUnmount = () => {
        this.TimerHandler.current = null;
    };

    render() {
        const { colors, videoData, episode, navigation } = this.props;
        const { controlsEnable } = this.state;
        return (
            <>
                {!videoData.isPlaying && videoData.isBuffering && (
                    <View
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                zIndex: -1,
                                elevation: 2,
                                marginTop: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <ActivityIndicator
                            color={colors.secondary400}
                            size={48}
                        />
                    </View>
                )}
                <Animated.View
                    style={[
                        styles.container,
                        StyleSheet.absoluteFillObject,
                        { opacity: this.AnimationOverlay },
                    ]}
                >
                    <TouchableWithoutFeedback onPress={this.toogleControls}>
                        <View style={{ flex: 1 }}>
                            {controlsEnable && (
                                <LinearGradient
                                    style={styles.gradientContainter}
                                    colors={[
                                        'black',
                                        'rgba(0,0,0,.4)',
                                        'black',
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.content,
                                            StyleSheet.absoluteFillObject,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.item,
                                                {
                                                    flexDirection: 'row',
                                                    paddingVertical: 10,
                                                },
                                            ]}
                                        >
                                            <View style={styles.titleContainer}>
                                                <Text
                                                    style={[
                                                        styles.title,
                                                        {
                                                            color: colors.white,
                                                            paddingRight: 20,
                                                        },
                                                    ]}
                                                    numberOfLines={1}
                                                    ellipsizeMode={'middle'}
                                                >
                                                    {episode?.anime?.name}{' '}
                                                    Episodio {episode?.number}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.item,
                                                styles.controlsButtons,
                                            ]}
                                        >
                                            <TouchableButton
                                                style={styles.icon}
                                                riple={true}
                                                onPress={this.onRewind}
                                            >
                                                <Icons.MaterialIcons
                                                    name={'fast-rewind'}
                                                    size={48}
                                                    color={colors.white}
                                                />
                                            </TouchableButton>
                                            <TouchableButton
                                                style={[
                                                    styles.icon,
                                                    { padding: 0 },
                                                ]}
                                                riple={true}
                                                onPress={this.tooglePlayPause}
                                            >
                                                <Icons.MaterialIcons
                                                    name={
                                                        videoData?.isPlaying
                                                            ? 'pause-circle-filled'
                                                            : 'play-circle-fill'
                                                    }
                                                    size={96}
                                                    color={colors.white}
                                                />
                                            </TouchableButton>
                                            <TouchableButton
                                                style={styles.icon}
                                                riple={true}
                                                onPress={this.onForward}
                                            >
                                                <Icons.MaterialIcons
                                                    name={'fast-forward'}
                                                    size={48}
                                                    color={colors.white}
                                                />
                                            </TouchableButton>
                                        </View>
                                        <View
                                            style={[
                                                styles.item,
                                                { justifyContent: 'flex-end' },
                                            ]}
                                        >
                                            <View style={styles.buttonsActions}>
                                                <View
                                                    style={
                                                        styles.innerButtonsActions
                                                    }
                                                >
                                                    <TouchableButton
                                                        riple={true}
                                                        style={{
                                                            padding: 5,
                                                            marginRight: 32,
                                                        }}
                                                        onPress={() =>
                                                            this.changeMode()
                                                        }
                                                    >
                                                        <Icons.Ionicons
                                                            name={'expand'}
                                                            size={32}
                                                            color={colors.white}
                                                        />
                                                    </TouchableButton>
                                                    <View
                                                        style={
                                                            styles.actionAnimeContainer
                                                        }
                                                    >
                                                        <TouchableButton
                                                            riple={true}
                                                            style={{
                                                                padding: 5,
                                                            }}
                                                            onPress={() =>
                                                                episode?.anterior
                                                                    ? navigation.navigate(
                                                                          'Player',
                                                                          {
                                                                              slug: episode
                                                                                  ?.anime
                                                                                  ?.slug,
                                                                              number: episode
                                                                                  ?.anterior
                                                                                  ?.number,
                                                                          }
                                                                      )
                                                                    : null
                                                            }
                                                        >
                                                            <Icons.MaterialIcons
                                                                name={
                                                                    'skip-previous'
                                                                }
                                                                size={32}
                                                                color={
                                                                    episode?.anterior
                                                                        ? colors.white
                                                                        : colors.gray
                                                                }
                                                            />
                                                        </TouchableButton>
                                                        <TouchableButton
                                                            style={{
                                                                marginHorizontal: 20,
                                                            }}
                                                            onPress={
                                                                this
                                                                    .onPressAnime
                                                            }
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.epiText,
                                                                    {
                                                                        color: colors.white,
                                                                    },
                                                                ]}
                                                            >
                                                                Episodios
                                                            </Text>
                                                        </TouchableButton>

                                                        <TouchableButton
                                                            riple={true}
                                                            style={{
                                                                padding: 5,
                                                            }}
                                                            onPress={() =>
                                                                episode?.siguiente
                                                                    ? navigation.navigate(
                                                                          'Player',
                                                                          {
                                                                              slug: episode
                                                                                  ?.anime
                                                                                  ?.slug,
                                                                              number: episode
                                                                                  ?.siguiente
                                                                                  ?.number,
                                                                          }
                                                                      )
                                                                    : null
                                                            }
                                                        >
                                                            <Icons.MaterialIcons
                                                                name={
                                                                    'skip-next'
                                                                }
                                                                size={32}
                                                                color={
                                                                    episode?.siguiente
                                                                        ? colors.white
                                                                        : colors.gray
                                                                }
                                                            />
                                                        </TouchableButton>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.innerButtonsActions
                                                    }
                                                >
                                                    <TouchableButton
                                                        riple={true}
                                                        bgContainer={false}
                                                        useForeground={false}
                                                        style={
                                                            styles.skipContainer
                                                        }
                                                        onPress={
                                                            this.onSkipIntro
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.skipText,
                                                                {
                                                                    color: colors.white,
                                                                },
                                                            ]}
                                                        >
                                                            Saltar OP
                                                        </Text>
                                                        <Icons.MaterialIcons
                                                            name={
                                                                'chevron-right'
                                                            }
                                                            size={48}
                                                            color={colors.white}
                                                        />
                                                    </TouchableButton>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.sliderContainer}
                                            >
                                                <Text
                                                    style={[
                                                        styles.time,
                                                        { color: colors.white },
                                                    ]}
                                                >
                                                    {formatTime(
                                                        videoData?.positionMillis
                                                    )}
                                                </Text>
                                                <Slider
                                                    value={
                                                        videoData?.positionMillis
                                                    }
                                                    maximumValue={
                                                        videoData?.durationMillis
                                                    }
                                                    minimumValue={0}
                                                    onValueChange={
                                                        this.onValueChange
                                                    }
                                                    thumbTintColor={
                                                        colors.secondary400
                                                    }
                                                    minimumTrackTintColor={
                                                        colors.secondary400
                                                    }
                                                    maximumTrackTintColor={
                                                        colors.primary400
                                                    }
                                                    thumbTouchSize={{
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                    style={styles.slider}
                                                />
                                                <Text
                                                    style={[
                                                        styles.time,
                                                        {
                                                            color: colors.white,
                                                            textAlign: 'right',
                                                        },
                                                    ]}
                                                >
                                                    {formatTime(
                                                        videoData?.durationMillis
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                {this.props.loadVideo && (
                    <Ads controlsEnable={this.state.controlsEnable} />
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientContainter: {
        flex: 1,
    },
    content: {
        padding: 16,
        zIndex: 1,
    },
    item: {
        flex: 1,
        marginVertical: 1,
    },
    controlsButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        padding: 24,
        marginHorizontal: 24,
    },
    titleContainer: {
        width: '75%',
        paddingRight: 16,
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Bold',
    },
    buttonsActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerButtonsActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionAnimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    epiText: {
        fontFamily: 'Medium',
        fontSize: 16,
    },
    skipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
    },
    skipText: {
        fontFamily: 'Regular',
        fontSize: 18,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    slider: {
        flex: 1,
        marginHorizontal: 16,
    },
    time: {
        fontFamily: 'Medium',
        width: 50,
    },
});
