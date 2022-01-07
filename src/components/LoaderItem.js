import React, { PureComponent } from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'

class LoaderItem extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { numberOfColumns } = this.props;
        return (
            <View style={[styles.containter, { flex: 1 / numberOfColumns }]}>
                <ImageBackground style={styles.image}/>
            </View>
        )
    }
}

export default LoaderItem

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