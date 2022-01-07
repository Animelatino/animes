import React, { PureComponent } from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { getImage } from '../../functions/urls';

class ItemAnime extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { numberOfColumns, item } = this.props;
        return (
            <View style={[styles.containter, { flex: 1 / numberOfColumns }]}>
                <ImageBackground source={{ uri: getImage('w300', item.poster) }} style={styles.image}/>
            </View>
        )
    }
}

export default ItemAnime

const styles = StyleSheet.create({
    containter: {
        backgroundColor: 'rgb(28,28,28)',
        marginHorizontal: 4,
        marginBottom: 10,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        aspectRatio: 3/4.5
    }
});