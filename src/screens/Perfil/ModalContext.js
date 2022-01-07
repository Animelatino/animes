import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Modal, StyleSheet, View, Image } from 'react-native';
import Touchable from '../../components/Touchable';

function ModalContext(props) {
    const { visible, setVisible, children } = props;
    const { colors, space } = useTheme();
    useEffect(() => {
        return () => {
            setVisible(false);
        };
    }, []);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        padding: space.sm,
                    }}
                >
                    <View
                        style={{
                            overflow: 'hidden',
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            zIndex: 99,
                        }}
                    >
                        <Touchable
                            riple={false}
                            onPress={() => setVisible(!visible)}
                        >
                            <Image
                                style={{ width: 60, height: 60 }}
                                source={require('../../../assets/images/cancel.png')}
                            />
                        </Touchable>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

export default ModalContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
