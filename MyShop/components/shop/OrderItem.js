import React,{useState} from "react";
import { View,Text,StyleSheet,Button } from "react-native";

import CartItem from './CartItem'
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem=props=>{
    const [showDetails,setShowDetails]=useState(false);

    return (<Card style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button color={Colors.primary} title={showDetails ? 'Hide Details' : "Show Details"} onPress={()=>{
            setShowDetails(prevState=>!prevState)
        }}></Button>

{/* if showDetails true,execute <View> */}
    {showDetails && (
    
        <View style={styles.detailItems}>  
            {props.items.map(cartItem=>
            <CartItem 
                quantity={cartItem.quantity} 
                amount={cartItem.sum} 
                title={cartItem.productTitle}
                key={cartItem.productId}
            ></CartItem>)}

        </View>)}  

    </Card>
)};

const styles=StyleSheet.create({
    orderItem:{
        margin:20,
        padding:10,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginBottom:15
    },
    totalAmount:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    date:{
        fontSize:16,
        fontFamily:'open-sans',
        color:'#888'
    },
    detailItems:{
        width:'100%'
    }
});

export default OrderItem;