import React, { useEffect } from 'react';
import { useDispatch } from '../store/StoreProvider';
import * as SecureStore from 'expo-secure-store';
import { api } from '../db/api';
import { ToastAndroid } from 'react-native';
import { types } from '../store/StoreReducer';

function AuthenticateUser() {
    const dispatch = useDispatch();

    async function getUser() {
        try {
            let token = await SecureStore.getItemAsync('userToken');
            if (token) {
                const jsonData = await api.get('auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (jsonData.status == 200) {
                    dispatch({ type: types.updateUser, data: jsonData.data });
                    dispatch({ type: types.updateToken, data: token });

                    const favoriteJson = await api.post(
                        `auth/favorite/list`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            params: {
                                user_id: jsonData.data.id,
                            },
                        }
                    );
                    const suscribeJson = await api.post(
                        `auth/suscribe/list`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            params: {
                                user_id: jsonData.data.id,
                            },
                        }
                    );
                    dispatch({
                        type: types.updateFavorite,
                        data: favoriteJson.data,
                    });
                    dispatch({
                        type: types.updateSuscribe,
                        data: suscribeJson.data,
                    });
                }
            }
        } catch (error) {
            if (error.response) {
                await SecureStore.deleteItemAsync('userToken');
            }
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return null;
}

export default AuthenticateUser;
