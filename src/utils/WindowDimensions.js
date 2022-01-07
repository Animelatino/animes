import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useDispatch } from '../store/StoreProvider';
import { types } from '../store/StoreReducer';

function WindowDimensions() {
    const dispatch = useDispatch();
    useEffect(() => {
        function onOrientationChange(event) {
            dispatch(types.updateOrientation, {
                data: event.orientationInfo.orientation,
            });
        }
        ScreenOrientation.getOrientationAsync().then((orientation) => {
            dispatch({ type: types.updateOrientation, data: orientation });
        });
        ScreenOrientation.addOrientationChangeListener(onOrientationChange);
        return () => {
            ScreenOrientation.removeOrientationChangeListeners();
        };
    }, []);

    return null;
}

export default WindowDimensions;
