// AppNavigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/LoginPage';
import CounterScreen from '../pages/CounterScreen';
import TabNavigation from './TabNavigation';
import SingleProduct from '../pages/SingleProduct';
import CartScreen from '../pages/CartScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store'; 
import { Product } from '../pages/HomeScreen';

export type RootStackParamList = {
    Login: undefined;
    CounterScreen: undefined;
    MainTabs: undefined;
    SingleProduct: { item: Product };
    Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    // Get user from Redux
    const userData = useSelector((state: RootState) => state.auth.userData);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!userData ? (
                    <>
                        <Stack.Screen name="Login" component={LoginPage} />
                        <Stack.Screen name="CounterScreen" component={CounterScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen  name="MainTabs" component={TabNavigation} />
                        <Stack.Screen name="SingleProduct" component={SingleProduct} />
                        <Stack.Screen name="Cart" component={CartScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;