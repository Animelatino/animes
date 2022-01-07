import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import EpisodeCard from './EpisodeCard';

export default (props) => {
    const { colors } = useTheme();
    return (
        <ListEpisodes {...props} colors={colors}/>
    )
}

class ListEpisodes extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { data, colors, title } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.titleText, { color: colors.text }]} numberOfLines={1}>{title}</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    horizontal={true}
                    renderItem={({item, index}) => <EpisodeCard data={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    titleContainer: {
        paddingHorizontal: 16
    },
    titleText: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontFamily: 'Black'
    },
    listContainer: {
        padding: 16,
        paddingRight: 0
    }
});