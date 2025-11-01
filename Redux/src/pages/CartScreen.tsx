import {
    Alert,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { addToCart, removeFromCart } from '../redux/slice/CartSlice';

const CartScreen = () => {
    const dispatch = useDispatch();
    const { cartData, totalAmount } = useSelector(
        (state: RootState) => state.cart
    );

    const handleCheckout = () => {
        Alert.alert('Order Success', 'Your order has been placed successfully');
    };

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView />
            <View style={styles.container}>
                <FlatList
                    data={cartData}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatlistStyle}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
                    )}
                    renderItem={({ item }) => (
                        <View style={styles.cardBox}>
                            <View style={styles.innerContainer}>
                                <Image
                                    source={{ uri: item.thumbnail || item.images?.[0] }}
                                    style={styles.img}
                                />
                                <View>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.price}>${item.price}</Text>
                                </View>
                            </View>

                            <View style={styles.twoBtn}>
                                <Pressable
                                    style={styles.btnBox}
                                    onPress={() => dispatch(removeFromCart(item))}
                                >
                                    <Text style={styles.btn}>-</Text>
                                </Pressable>

                                <Text style={styles.amount}>{item.quantity}</Text>

                                <Pressable
                                    style={styles.btnBox}
                                    onPress={() => dispatch(addToCart(item))}
                                >
                                    <Text style={styles.btn}>+</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* Footer */}
            <View style={styles.bottom}>
                <Text style={styles.totalAmount}>
                    Total Amount:{'  '}
                    <Text style={styles.totalAmountPrice}>${totalAmount}</Text>
                </Text>

                <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
                    <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    flatlistStyle: {
        flex: 1,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    price: {
        fontSize: 15,
        marginTop: 5,
    },
    cardBox: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
    },
    innerContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    twoBtn: {
        gap: 5,
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnBox: {
        width: 35,
        height: 35,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    btn: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 0.25,
        paddingHorizontal: '5%',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '600',
    },
    totalAmountPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    checkoutBtn: {
        marginTop: 10,
        width: '90%',
        height: 45,
        backgroundColor: 'blue',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'gray',
    },
});
