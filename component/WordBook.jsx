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
const WordBook = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const Tab = createBottomTabNavigator();


    const ChatsStack = createStackNavigator();


    const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleModalVisible = () => {
        setModalVisible(modalVisible?false:true)
    }

    const SohbetScreen = () => {
        return <ChatsScreen onItemLongPress={handleItemLongPress}
            onItemPress={handleItemPress}
            isMultiSelectMode={isMultiSelectMode}
            selectedItems={selectedItems}
        />;
    }

    const DurumScreen = () => {
        const user = {
            username: 'johndoe',
            bio: 'Software Engineer | React Native Developer',
            avatar: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg',
            backgroundImage:'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        };
        return <ProfileScreen user={user} onItemLongPress={handleItemLongPress}
        onItemPress={handleItemPress}
        isMultiSelectMode={isMultiSelectMode}
        selectedItems={selectedItems}
    />;
    }

    const AramalarScreen = () => {
        const user = {
            username: 'johndoe',
            bio: 'Software Engineer | React Native Developer',
            avatar: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg',
            backgroundImage:'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        };
        return <DailyScreen user={user} onItemLongPress={handleItemLongPress}
        onItemPress={handleItemPress}
        isMultiSelectMode={isMultiSelectMode}
        selectedItems={selectedItems}
    />;
    }


    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(prevItems => prevItems.filter(id => id !== itemId));
        } else {
            setSelectedItems(prevItems => [...prevItems, itemId]);
        }
    };

    const handleItemLongPress = (itemId) => {
        console.log(itemId);
        setIsMultiSelectMode(true);
        handleSelectItem(itemId);
    };

    const handleItemPress = (itemId) => {
        if (isMultiSelectMode) {
            handleSelectItem(itemId);
        }
    };

    const handleDeleteSelectedItems = () => {
        // selectedItems dizisini kullanarak öğeleri silin
        // Daha sonra çoklu seçim modunu kapatalım ve seçili öğeleri sıfırlayalım
        setIsMultiSelectMode(false);
        setSelectedItems([]);
    };

    const ChatsStackNavigator = ({type}) => {


        return (
            <ChatsStack.Navigator>
                <ChatsStack.Screen
                    name="WORDBOOK - WORDS"
                    component={type==='kartlar'?SohbetScreen:(type==='durum'?DurumScreen:AramalarScreen)}
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
                                   {isMultiSelectMode?<TouchableOpacity onPress={handleDeleteSelectedItems}>
                                            <Ionicons name="md-trash" size={24} color="#fff" />
                                    </TouchableOpacity>:
                                    <>
                                 

                                    <TouchableOpacity
                                        onPress={handleModalVisible}
                                    >
                                        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                                    </TouchableOpacity>
                                    </>
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

            </ChatsStack.Navigator>
        );
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



    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Chats"
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
                    children={() => <ChatsStackNavigator type="kartlar" />}
                    options={{ headerShown: false }}
                />

                <Tab.Screen
                    name="Profil"
                    children={() => <ChatsStackNavigator type="durum" />}
                    options={{ headerShown: false }}
                />
                 <Tab.Screen
                    name="Günlük Yaz"
                    children={() => <ChatsStackNavigator type="günlükyaz" />}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        top: 40, // header'ın yüksekliğini geçmesi için bu değeri ayarlayabilirsiniz.
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
