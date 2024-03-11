import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, ScrollView, TouchableOpacity ,StyleSheet} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';


const PlayScreen = ({ navigation }) => {
    

    return (
        <ScrollView
        style={{
            flex: 1,
        }} >
       <TouchableOpacity style={styles.cardContainer}  onPress={() => navigation.navigate('Basit Kartlar')} >
    <View style={styles.card}>
        <Text style={styles.cardTitle}>Basic Review</Text>
        <Ionicons name="play-circle" size={24} color="orange" style={styles.playIcon} />
   
    </View>
</TouchableOpacity>

<TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('Çoktan seçmeli')}>
    <View style={styles.card}>
        <Text style={styles.cardTitle}>Multiple Answers</Text>
        <Ionicons name="play-circle" size={24} color="orange" style={styles.playIcon} />
   
    </View>
</TouchableOpacity>
<TouchableOpacity style={styles.cardContainer}  onPress={() => navigation.navigate('Kart Eşleştirme')}>
    <View style={styles.card}>
        <Text style={styles.cardTitle}>Match Carts</Text>
        <Ionicons name="play-circle" size={24} color="orange" style={styles.playIcon} />
   
    </View>
</TouchableOpacity>
<TouchableOpacity style={styles.cardContainer} >
    <View style={styles.card}>
        <Text style={styles.cardTitle}>Writing Review</Text>
        <Ionicons name="play-circle" size={24} color="orange" style={styles.playIcon} />
   
    </View>
</TouchableOpacity>

<TouchableOpacity style={styles.cardContainer} >
    <View style={styles.card}>
        <Text style={styles.cardTitle}>Audio Player</Text>
        <Ionicons name="play-circle" size={24} color="orange" style={styles.playIcon} />
   
    </View>
</TouchableOpacity>
        </ScrollView>);
};
const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    playIcon: {
        marginLeft: 'auto', // Sağa hizalanmış oynatma simgesi
    },
    // Diğer stiller
});


export default PlayScreen;
