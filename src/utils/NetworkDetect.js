import React, { useState, useEffect, useRef, createRef } from "react";
import { Animated, StyleSheet } from "react-native";
import NetInfo from '@react-native-community/netinfo';

export default () => {
    const [isOffline, setOfflineStatus] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    let timeoutMsg = createRef().current;
    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
            if(offline){
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false
                }).start();
                timeoutMsg = setTimeout(() => {
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false
                    }).start();
                }, 4000);
            }
        });
        return () => { 
            removeNetInfoSubscription();
            timeoutMsg = null;
        };
    }, []);
    if(!isOffline)
        return null;
    else
        return (
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <Animated.Text style={styles.offlineText}>No hay conexión de red</Animated.Text>
            </Animated.View>
        )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 80,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(50,50,50,.8)',
        padding: 10,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    offlineText: {
        fontFamily: 'Medium',
        color: 'white',
    }
});