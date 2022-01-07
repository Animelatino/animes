import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import TouchableButton from '../../components/TouchableButton';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from './Modal';

export default (props) => {
    const { episodeData, setModalVisible } = props;
    const { colors, space, radio } = useTheme();
    const navigation = useNavigation();

    const onPressPlayer = (player) => {
        setModalVisible(false);
        if (player?.server?.status == 0) {
            navigation.navigate('Player', {
                item: player,
                title: episodeData?.anime?.name,
                number: episodeData?.number,
            });
        }
    };

    return (
        <Modal {...props}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.containerScroll}
            >
                <View style={styles.innerContent}>
                    <View style={styles.content}>
                        {episodeData
                            ? episodeData?.players?.map((players, idx) =>
                                  players?.map((player, idx) => (
                                      <TouchableButton
                                          bgContainer={false}
                                          useForeground={true}
                                          riple={true}
                                          style={{
                                              borderRadius: radio.sm,
                                              padding: space.xl,
                                              backgroundColor:
                                                  colors.primary900,
                                          }}
                                          key={idx}
                                          onPress={() => onPressPlayer(player)}
                                      >
                                          <View style={styles.itemPlayer}>
                                              <View>
                                                  <Text
                                                      style={[
                                                          styles.serverNameText,
                                                          {
                                                              color: colors.white,
                                                          },
                                                      ]}
                                                  >
                                                      {player?.server.title}
                                                  </Text>
                                                  <Text
                                                      style={[
                                                          styles.langText,
                                                          {
                                                              color: colors.gray,
                                                          },
                                                      ]}
                                                  >
                                                      {`Idioma: ${
                                                          player?.languaje == 0
                                                              ? 'Subtitulado'
                                                              : 'Español Latino'
                                                      }`}
                                                  </Text>
                                              </View>
                                              <View>
                                                  <View
                                                      style={{
                                                          alignItems: 'center',
                                                          justifyContent:
                                                              'center',
                                                          width: 40,
                                                          height: 40,
                                                          borderRadius: 20,
                                                          backgroundColor:
                                                              player?.server
                                                                  .status == 1
                                                                  ? colors.primary700
                                                                  : 'green',
                                                      }}
                                                  >
                                                      <Text
                                                          style={[
                                                              styles.textStatus,
                                                              {
                                                                  color: colors.white,
                                                              },
                                                          ]}
                                                      >
                                                          {player?.server
                                                              .status == 1
                                                              ? 'OFF'
                                                              : 'ON'}
                                                      </Text>
                                                  </View>
                                              </View>
                                          </View>
                                      </TouchableButton>
                                  ))
                              )
                            : null}
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerScroll: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    innerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        minHeight: 300,
    },
    itemPlayer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0,
    },
    serverNameText: {
        fontFamily: 'ExtraBold',
        fontSize: 16,
    },
    langText: {
        fontSize: 12,
        fontFamily: 'Regular',
        marginTop: 5,
    },
    textStatus: {
        fontFamily: 'Medium',
        fontSize: 12,
    },
});
