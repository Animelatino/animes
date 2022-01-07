import React, {
    PureComponent,
    createRef,
    useRef,
    useEffect,
    useState,
} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AdMobInterstitial } from 'expo-ads-admob';
import { useTheme } from '@react-navigation/native';

export default (props) => {
    const [show, setShow] = useState(false);
    const isMountedRef = useRef(true);
    const timerAdsRef = useRef(null);
    const timerShowAdsRef = useRef(null);

    const { colors, space, fontSizes, radio } = useTheme();

    const showAds = async () => {
        try {
            await AdMobInterstitial.setAdUnitID(
                'ca-app-pub-5211659094025398/6445767852'
            );
            await AdMobInterstitial.requestAdAsync({
                servePersonalizedAds: true,
            });
            const adsRespondes = await AdMobInterstitial.getIsReadyAsync();
            if (adsRespondes) {
                setShow(true);
                clearTimeout(timerAdsRef.current);
                timerAdsRef.current = setTimeout(async () => {
                    if (timerAdsRef.current) {
                        await AdMobInterstitial.showAdAsync();
                        setShow(false);
                    }
                }, 5000);
            }
        } catch (error) {
            clearTimeout(timerAdsRef.current);
            timerAdsRef.current = setTimeout(async () => {
                if (timerAdsRef.current) {
                    setShow(false);
                }
            }, 5000);
        }
    };

    const loadAdsMessage = () => {
        if (isMountedRef.current) {
            clearTimeout(timerShowAdsRef.current);
            timerShowAdsRef.current = setTimeout(async () => {
                if (timerShowAdsRef.current) {
                    setShow(true);
                    showAds();
                }
            }, 20000);
        }
    };

    useEffect(() => {
        loadAdsMessage();
        return () => {
            isMountedRef.current = false;
            timerAdsRef.current = null;
            timerShowAdsRef.current = null;
        };
    }, []);

    return show ? (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.primary900 + '60',
                    borderRadius: radio.sm,
                    borderColor: colors.secondary400,
                    paddingHorizontal: space.md,
                    paddingVertical: space.sm,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    { fontSize: fontSizes.h5, color: colors.white },
                ]}
            >
                El anuncio comenzará en breve.
            </Text>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 99,
        top: 35,
        right: 35,
        borderRightWidth: 3,
    },
    text: {
        fontFamily: 'Medium',
    },
});
