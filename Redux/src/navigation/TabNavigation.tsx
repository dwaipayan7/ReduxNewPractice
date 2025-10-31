
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIconStyle: { display: 'none' },
                tabBarLabelStyle: { fontSize: 18, paddingBottom: 10 },
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigation;