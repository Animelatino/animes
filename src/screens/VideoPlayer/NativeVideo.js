import React, { PureComponent } from 'react';
import { Video } from 'expo-av';

export default (props) => {
    return <NativeVideo {...props} />;
};

class NativeVideo extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            videoRef,
            style,
            resizeMode = 'contain',
            onLoad,
            onPlaybackStatusUpdate,
            onError,
        } = this.props;
        return (
            <Video
                ref={videoRef}
                style={{ flex: 1, ...style, backgroundColor: 'black' }}
                resizeMode={resizeMode}
                onLoad={onLoad}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                onError={onError}
            />
        );
    }
}
