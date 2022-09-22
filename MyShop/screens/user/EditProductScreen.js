import React,{useState,useEffect,useCallback} from "react";
import { Text, View, StyleSheet, TextInput, ScrollView,Platform } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from "react-redux";
import HeaderButton from '../../components/UI/HeaderButton';

const EditProductScreen = props => {
    const prodId=props.navigation.getParam('productId')
    const editedProduct=useSelector(state=>state.products.userProducts.find(prod=>prod.id===prodId))

    const [title,setTitle]=useState(editedProduct ? editedProduct.title : "");
    const [imageUrl,setimageUrl]=useState(editedProduct ? editedProduct.imageUrl :"");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState(editedProduct ? editedProduct.description :"");

    const submitHandler=useCallback(()=>{
        console.log("Submitting");
    },[]);

    useEffect(()=>{
        props.navigation.setParams({submit:submitHandler})
    },[submitHandler]);
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text=>setTitle(text)}></TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text=>setimageUrl(text)} ></TextInput>
                </View>
                {/* if edit product,price not show. If add product price will show up */}
                {editedProduct ? null : (<View style={styles.formControl}> 
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text=>setPrice(text)}></TextInput>
                </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text=>setDescription(text)}></TextInput>
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn=navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={() => {
                        submitFn
                    }}
                />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen;