import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

function useOrientation() {
    const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));

    useEffect(() => {
        const onChange = (result) => {
            setScreenInfo(result.screen);
        };
        Dimensions.addEventListener('change', onChange);
        return () => Dimensions.removeEventListener('change', onChange);
    }, []);

    return {
        ...screenInfo,
        isPortrait: screenInfo.height > screenInfo.width,
    };
}

export default useOrientation;
