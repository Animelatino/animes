import React, { PureComponent } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class Item extends PureComponent {
    constructor(props) {
        super(props);
    }

    getColorRandom = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        color += 95;
        return color;
    };

    render() {
        const { onPress } = this.props;
        return (
            <TouchableNativeFeedback
                onPress={() => (onPress ? onPress() : null)}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    colors={[this.getColorRandom(), this.getColorRandom()]}
                    style={styles.containter}
                >
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.subTitle}>{this.props.subtitle}</Text>
                </LinearGradient>
            </TouchableNativeFeedback>
        );
    }
}

export default Item;

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        textTransform: 'capitalize',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bold',
    },
    subTitle: {
        textAlign: 'center',
        color: '#ccc',
        fontFamily: 'Medium',
    },
});
