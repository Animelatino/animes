import React from 'react';
import { Dimensions, FlatList as FlatListNative } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { animeListColumns } from '../functions/helpers';

function ListItems(props) {
    const { space } = useTheme();
    return (
        <FlatListNative
            {...props}
            contentContainerStyle={{
                paddingVertical: space.xxs,
            }}
            columnWrapperStyle={{ marginVertical: space.xs }}
            numColumns={animeListColumns(Dimensions.get('screen').width)}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={10}
            windowSize={10}
            onEndReachedThreshold={0.5}
        />
    );
}

export default ListItems;
