import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getImage } from '../functions/urls';

export default (props) => {
    const navigation = useNavigation();
    return <NewAnime {...props} navigation={navigation} />;
};

class NewAnime extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback
                    delayPressIn={60}
                    useForeground={true}
                    background={TouchableNativeFeedback.Ripple('white', false)}
                    onPress={() =>
                        navigation.push('Anime', { slug: data?.slug })
                    }
                >
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: getImage('w154', data?.poster) }}
                        />
                    </View>
                </TouchableNativeFeedback>
                <Text style={styles.animeTitle} numberOfLines={2}>
                    {data?.name}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 16,
        overflow: 'hidden',
        width: 150,
    },
    imageContainer: {
        width: 150,
        height: 200,
        overflow: 'hidden',
        borderRadius: 2,
    },
    image: {
        flex: 1,
    },
    animeTitle: {
        fontFamily: 'Medium',
        color: 'white',
        paddingTop: 10,
        opacity: 0.7,
        textAlign: 'center',
    },
});
