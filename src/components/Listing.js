import React from 'react';
import { FlatList as FlatListNative } from 'react-native';
import { useTheme } from '@react-navigation/native';

function Listing(props) {
    const { space } = useTheme();
    return (
        <FlatListNative
            contentContainerStyle={{
                paddingLeft: space.md,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            {...props}
            initialNumToRender={4}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={10}
            windowSize={10}
            onEndReachedThreshold={0.5}
        />
    );
}

export default Listing;
