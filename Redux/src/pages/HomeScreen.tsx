import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

import { getAllProducts } from '../redux/slice/ProductSlice';

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

// const data = [
//     {
//         id: 1,
//         title: 'iPhone 9',
//         description: 'An apple mobile which is nothing like apple',
//         price: 549,
//         discountPercentage: 12.96,
//         rating: 4.69,
//         stock: 94,
//         brand: 'Apple',
//         category: 'smartphones',
//         thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
//         images: [
//             'https://i.dummyjson.com/data/products/1/1.jpg',
//             'https://i.dummyjson.com/data/products/1/2.jpg',
//             'https://i.dummyjson.com/data/products/1/3.jpg',
//             'https://i.dummyjson.com/data/products/1/4.jpg',
//             'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
//         ],
//     },
//     {
//         id: 2,
//         title: 'iPhone X',
//         description:
//             'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
//         price: 899,
//         discountPercentage: 17.94,
//         rating: 4.44,
//         stock: 34,
//         brand: 'Apple',
//         category: 'smartphones',
//         thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
//         images: [
//             'https://i.dummyjson.com/data/products/2/1.jpg',
//             'https://i.dummyjson.com/data/products/2/2.jpg',
//             'https://i.dummyjson.com/data/products/2/3.jpg',
//             'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
//         ],
//     },
//     {
//         id: 3,
//         title: 'Samsung Universe 9',
//         description:
//             "Samsung's new variant which goes beyond Galaxy to the Universe",
//         price: 1249,
//         discountPercentage: 15.46,
//         rating: 4.09,
//         stock: 36,
//         brand: 'Samsung',
//         category: 'smartphones',
//         thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
//         images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
//     },
//     {
//         id: 4,
//         title: 'OPPOF19',
//         description: 'OPPO F19 is officially announced on April 2021.',
//         price: 280,
//         discountPercentage: 17.91,
//         rating: 4.3,
//         stock: 123,
//         brand: 'OPPO',
//         category: 'smartphones',
//         thumbnail: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
//         images: [
//             'https://i.dummyjson.com/data/products/4/1.jpg',
//             'https://i.dummyjson.com/data/products/4/2.jpg',
//             'https://i.dummyjson.com/data/products/4/3.jpg',
//             'https://i.dummyjson.com/data/products/4/4.jpg',
//             'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
//         ],
//     },
// ];

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const HomeScreen = () => {

    const { products, isLoading } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<any>();

    const navigation = useNavigation<MainScreenNavigationProp>();

    useEffect(() => {
        dispatch(getAllProducts())
    }, []);

    if (isLoading) {
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size={'large'} color={'blue'} />
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList

                data={products?.products}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('SingleProduct', { item })}

                        style={styles.cardBox}
                        key={item.id}
                    >
                        <Image source={{ uri: item.thumbnail }} style={styles.img} />
                        <View style={styles.footer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>

                    </TouchableOpacity>
                )}

            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        marginTop: 50
    },
    img: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    price: {
        fontSize: 18,
        marginTop: 10,
    },
    cardBox: {
        marginBottom: 30,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
});