import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement , increment
} from '../redux/slice/CounterSlice';
import { RootState } from '../redux/store/store';



const CounterScreen = () => {

    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.value)

    console.log("The value is: ", count);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{count}</Text>
            <TouchableOpacity onPress={() => dispatch(increment())}>
                <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(decrement())}>
                <Text>Minus</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CounterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%',
        gap: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
});