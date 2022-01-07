import React, { PureComponent } from 'react'
import { ActivityIndicator, View } from 'react-native'

class LoadMoreList extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <ActivityIndicator color="red" size="large"/>
            </View>
        )
    }
}

export default LoadMoreList