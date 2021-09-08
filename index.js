/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import Realm from 'realm';

const App2 = () => {
    Realm.copyBundledRealmFiles();
    return (
        <App/>
    );
};

AppRegistry.registerComponent(appName, () => App2);
