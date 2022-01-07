import { ADMOB_INTERSTITIAL } from '@env';
import { AdMobInterstitial } from 'expo-ads-admob';

export const Interstitial = async () => {
    try {
        await AdMobInterstitial.setAdUnitID(
            __DEV__
                ? 'ca-app-pub-3940256099942544/1033173712'
                : ADMOB_INTERSTITIAL
        );
        await AdMobInterstitial.requestAdAsync({
            servePersonalizedAds: true,
        });
        const res = await AdMobInterstitial.getIsReadyAsync();
        if (res) {
            await AdMobInterstitial.showAdAsync();
        }
    } catch {}
};
