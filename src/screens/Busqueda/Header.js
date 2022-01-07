import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Touchable from '../../components/Touchable';
function Header(props) {
    const { onChangeText, value, onClear } = props;
    const { colors, space, radio, fontSizes } = useTheme();
    const textInputRef = useRef();

    function clearQuery() {
        onClear();
        textInputRef.current.focus();
    }
    useEffect(() => {
        textInputRef.current.focus();
    }, []);

    return (
        <View
            style={[
                styles.container,
                {
                    marginTop: space.md,
                    padding: space.md,
                    borderColor: colors.card,
                },
            ]}
        >
            <TextInput
                ref={textInputRef}
                autoFocus={true}
                value={value}
                onChangeText={onChangeText}
                placeholder={'Buscar anime o película...'}
                placeholderTextColor={colors.gray}
                style={[
                    styles.inputText,
                    {
                        color: colors.white,
                        marginHorizontal: space.md,
                        fontSize: fontSizes.h3,
                    },
                ]}
            />
            {value?.length > 0 && (
                <View
                    style={{
                        marginHorizontal: space.md,
                        width: 28,
                        aspectRatio: 1 / 1,
                    }}
                >
                    <Touchable riple={false} onPress={clearQuery}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={require('../../../assets/images/cancel.png')}
                        />
                    </Touchable>
                </View>
            )}
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        fontFamily: 'SemiBold',
    },
});
