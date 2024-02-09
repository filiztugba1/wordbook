import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import logo from '../assets/icon.png';
import ChatsScreen from './ChatsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import DailyScreen from './DailyScreen';

const Tab = createBottomTabNavigator();

const WordBook = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    }

    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(prevItems => prevItems.filter(id => id !== itemId));
        } else {
            setSelectedItems(prevItems => [...prevItems, itemId]);
        }
    };

    const handleItemLongPress = (itemId) => {
        setIsMultiSelectMode(true);
        handleSelectItem(itemId);
    };

    const handleItemPress = (itemId) => {
        if (isMultiSelectMode) {
            handleSelectItem(itemId);
        }
    };

    const handleDeleteSelectedItems = () => {
        setIsMultiSelectMode(false);
        setSelectedItems([]);
    };

    const DropdownMenu = ({ isVisible, onClose }) => {
        if (!isVisible) return null;

        return (
            <View style={styles.dropdown}>
                <TouchableOpacity onPress={() => onClose()}>
                    <Text style={styles.dropdownItem}>Kart Grupları</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClose()}>
                    <Text style={styles.dropdownItem}>Tüm Kartlar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClose()}>
                    <Text style={styles.dropdownItem}>Grammer Notlarım</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClose()}>
                    <Text style={styles.dropdownItem}>Günlük Yazılarım</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const ChatsStackNavigator = ({ type }) => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Chats"
                    component={type === 'kartlar' ? ChatsScreen : (type === 'durum' ? ProfileScreen : DailyScreen)}
                    options={({ navigation }) => ({
                        headerTitle: () => (
                            <View><Text style={styles.logo}>WORDBOOK</Text></View>
                        ),
                        headerTintColor: '#fff',
                        headerStyle: {
                            backgroundColor: '#0077B6',
                        },
                        headerRight: () => (
                            <>
                                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                    {isMultiSelectMode ? <TouchableOpacity onPress={handleDeleteSelectedItems}>
                                        <Ionicons name="md-trash" size={24} color="#fff" />
                                    </TouchableOpacity> :
                                        <TouchableOpacity onPress={handleModalVisible}>
                                            <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                                        </TouchableOpacity>
                                    }
                                </View>
                                <DropdownMenu
                                    isVisible={modalVisible}
                                    onClose={() => setModalVisible(false)}
                                />
                            </>
                        ),
                    })}
                />
            </Stack.Navigator>
        );
    };

    return (
        <Tab.Navigator
            initialRouteName="Kartlar"
            tabBarOptions={{
                activeTintColor: '#0077B6',
                style: {
                    backgroundColor: '#0077B6'
                },
                labelStyle: {
                    fontSize: 12,
                },
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Kartlar') {
                        iconName = focused ? 'ios-images' : 'ios-images-outline';
                    } else if (route.name === 'Profil') {
                        iconName = focused ? 'ios-person' : 'ios-person-outline';
                    } else if (route.name === 'Günlük Yaz') {
                        iconName = focused ? 'ios-book' : 'ios-book-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen
                name="Kartlar"
                component={ChatsStackNavigator}
                initialParams={{ type: 'kartlar' }}
            />
            <Tab.Screen
                name="Profil"
                component={ChatsStackNavigator}
                initialParams={{ type: 'durum' }}
            />
            <Tab.Screen
                name="Günlük Yaz"
                component={ChatsStackNavigator}
                initialParams={{ type: 'günlükyaz' }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        top: 40,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
        padding: 5,
    },
    dropdownItem: {
        padding: 10,
    },
    logo: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    }
});

export default WordBook;
