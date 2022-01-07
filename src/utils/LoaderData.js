import React, { PureComponent } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default (props) => {
    const { colors } = useTheme();
    return (
        <LoaderData {...props} colors={colors}/>
    )
}

class LoaderData extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { colors } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.loaderContainer, { backgroundColor: colors.detailed }]}>
                    <ActivityIndicator color={colors.primary} size={48}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        borderRadius: 8
    }
});