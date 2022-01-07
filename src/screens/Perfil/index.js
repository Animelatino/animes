import React from 'react';
import { useStore } from '../../store/StoreProvider';
import Account from './Account';
import Auth from './Auth';

function Index() {
    const { user } = useStore();

    if (!user.id) {
        return <Auth />;
    }

    return <Account user={user} />;
}

export default Index;
