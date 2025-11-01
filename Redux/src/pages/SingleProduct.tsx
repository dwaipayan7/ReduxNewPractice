import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slice/CartSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { RootState } from '../redux/store/store';


type SingleProductNavigationProp = StackNavigationProp<RootStackParamList, 'SingleProduct'>;

const SingleProduct = () => {

    const navigation = useNavigation<SingleProductNavigationProp>();

    const dispatch = useDispatch();

    const {
        params: { item },
    } = useRoute<any>();

    const Product = item;

    const handleAddToCart = () => {
        dispatch(addToCart(Product))
    }

    const { cartData, totalAmount } = useSelector((state: RootState) => state.cart)

    console.log("The cartdata is: ", cartData, "Total Amount is: ", totalAmount);


    return (
        <View style={styles.container}>
            <SafeAreaView />

            <View style={styles.cardBox}>
                <Image source={{ uri: Product.images[0] }} style={styles.img} />
                <View style={styles.textBox}>
                    <Text style={styles.title}>{Product.title}</Text>
                    <Text style={styles.price}>${Product.price}</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.label}>
                        Category: <Text style={styles.value}>{Product.category}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Brand: <Text style={styles.value}>{Product.brand}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Description: <Text style={styles.value}>{Product.description}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Rating: <Text style={styles.value}>{Product.rating}⭐️</Text>
                    </Text>
                    <Text style={styles.label}>
                        Stock: <Text style={styles.value}>{Product.stock}</Text>
                    </Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() =>
                        handleAddToCart()
                    } style={styles.button}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.button}>
                        <Text style={styles.buttonText}>View Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SingleProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
    img: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
    },
    cardBox: {
        marginBottom: 30,
    },
    textBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    body: {
        marginTop: 30,
        gap: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
    },
    footer: {
        marginTop: 50,
        gap: 10,
    },
    button: {
        paddingHorizontal: 20,
        width: '100%',
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});
