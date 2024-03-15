// WordBook.js

import React, { useState ,useEffect} from 'react';
import { NavigationContainer,useNavigation  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import logo from '../assets/icon.png';
import CartsScreen from './CartsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import DailyScreen from './DailyScreen';
import LoginScreen from './LoginScreen';
import AddItemFormComponent from './AddItemFormComponent';
import AddGroupFormComponent from './AddGroupFormComponent';
import AddMainFormComponent from './AddMainFormComponent';
import PlayScreen from './PlayScreen';
import BasicReview from './BasicReview';
import MultipleAnswerScreen from './MultipleAnswerScreen';
import MatchCartScreen from './MatchCartScreen';


const WordBook = ({ onLogout }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const Tab = createBottomTabNavigator();

    const navigation = useNavigation();
    const ChatsStack = createStackNavigator();


    const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleModalVisible = () => {
        setModalVisible(modalVisible?false:true)
    }

    const CartsScreenFun = () => {
        return <CartsScreen onItemLongPress={handleItemLongPress}
            onItemPress={handleItemPress}
            isMultiSelectMode={isMultiSelectMode}
            selectedItems={selectedItems}
        />;
    }

    const BasicReviewFun = () => {
        return <BasicReview onItemLongPress={handleItemLongPress}
            onItemPress={handleItemPress}
            isMultiSelectMode={isMultiSelectMode}
            selectedItems={selectedItems}
        />;
    }
    const PlayScreenFun = () => {
        return <PlayScreen navigation={navigation} />;
    }
    
    const MultipleAnswerScreenFun = () => {
        return <MultipleAnswerScreen onItemLongPress={handleItemLongPress}
            onItemPress={handleItemPress}
            isMultiSelectMode={isMultiSelectMode}
            selectedItems={selectedItems}
        />;
    }
    
    const ProfileScreenFun = () => {
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

    const DailyScreenFun = () => {
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

    const YeniKartScreen = () => {
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

    const option=()=>{
           // Menü açıldığında, dış tıklamaları dinlemek için event listener ekleyin
     

    
       return ({
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
                        onLogout={()=>onLogout()}
                    />
                </>
            ),
        })
    }

    const ChatsStackNavigator = ({type}) => {


        return (
            <ChatsStack.Navigator>
                <ChatsStack.Screen
                    name="WORDBOOK - WORDS"
                    component={type==='kartlar'?CartsScreenFun:(type==='alistirmayap'?PlayScreenFun:(type=='günlükyaz'?DailyScreenFun:''))}
                    options={option}
                />
                 <ChatsStack.Screen
                    name="Profil"
                    component={ProfileScreenFun}
                    options={option}
                />
                 <ChatsStack.Screen
                    name="Günlük Yaz"
                    component={DailyScreenFun}
                    options={option}
                />
                <ChatsStack.Screen
                    name="Yeni Kart Ekle"
                    component={AddItemFormComponent}
                    options={option}
                />
                 <ChatsStack.Screen
                    name="Kart Gruplari"
                    component={AddGroupFormComponent}
                    options={option}
                />
                 <ChatsStack.Screen
                    name="Kart Anlam Tipleri"
                    component={AddMainFormComponent}
                    options={option}
                />
                <ChatsStack.Screen
                    name="Grammer Notlarim"
                    component={YeniKartScreen}
                    options={option}
                />
                <ChatsStack.Screen
                    name="Basit Kartlar"
                    component={BasicReviewFun}
                    options={option}
                />
                 <ChatsStack.Screen
                    name="Çoktan seçmeli"
                    component={MultipleAnswerScreenFun}
                    options={option}
                />
                <ChatsStack.Screen
                    name="Kart Eşleştirme"
                    component={MatchCartScreen}
                    options={option}
                />
                 <ChatsStack.Screen
                    name="Yazarak Çalışma"
                    component={YeniKartScreen}
                    options={option}
                />
                <ChatsStack.Screen
                    name="Dinleyerek Çalışma"
                    component={YeniKartScreen}
                    options={option}
                />


            </ChatsStack.Navigator>
        );
    };
 

    const DropdownMenu = ({ isVisible, onClose,onLogout }) => {
        if (!isVisible) return null;
        return (
            <View style={styles.dropdown}>
                <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
                    <Text style={styles.dropdownItem}>Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Grammar Notlarım')}>
                    <Text style={styles.dropdownItem}>Grammer Notlarım</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Yeni Kart Ekle')}>
                    <Text style={styles.dropdownItem}>Yeni Kart Ekle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Kart Gruplari')}>
                    <Text style={styles.dropdownItem}>Kart Grupları</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Kart Anlam Tipleri')}>
                    <Text style={styles.dropdownItem}>Kart Anlam Tipleri</Text>
                </TouchableOpacity>
              

                <TouchableOpacity onPress={() => onLogout()}>
                    <Text style={styles.dropdownItem}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
        );
    };
  


    return (
        
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
                        } else if (route.name === 'Alıştırma Yap') {
                            iconName = focused ? 'ios-play' : 'ios-play-outline';
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
                

                {/* <Tab.Screen
                    name="Alıştırma Yap"
                    component={PlayScreen}
                    options={() => ({
                        tabBarIcon: ({ color, size }) => (
                          <>
                            <TouchableOpacity
                                onPress={handlePlayModalVisible}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <Ionicons name="ios-play" size={size + 8} color={color} />
                            </TouchableOpacity>
                             <PlayDropdownMenu
                             isVisible={playdropmodalVisible}
                             onClose={() => setplaydropModalVisible(false)}
                         />
                         </>
                        )
                    })}
                /> */}

                <Tab.Screen
                    name="Alıştırma Yap"
                    children={() => <ChatsStackNavigator type="alistirmayap" />}
                    options={{ headerShown: false }}
                />

                 <Tab.Screen
                    name="Günlük Yaz"
                    children={() => <ChatsStackNavigator type="günlükyaz" />}
                    options={{ headerShown: false }}
                />
                
            </Tab.Navigator>

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
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    dropdownContainer: {
        position: 'absolute',
        top: -210, // Butonun altında çıkması için gerekli değeri ayarlayabilirsiniz.
        // left: 'a',
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
        padding: 5,
        zIndex: 10,
        width:'150px'
    },
    dropdownItem: {
        padding: 10,
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd', // veya başka bir arkaplan rengi
        borderRadius: 10,
    },
});



export default WordBook;
