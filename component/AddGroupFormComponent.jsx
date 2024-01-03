import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Picker,
    Button,
    Image,
    FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const AddGroupFormComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState({});
    const [title, setTitle] = useState("");
    const [isAddOrUpdate, setisAddOrUpdate] = useState(0);
    const [items, setItems] = useState([
        {
            id: '2', name: 'A1', child: [
                { id: '3', name: 'deneme2' },
                { id: '4', name: 'deneme3' }
            ]
        },
        {
            id: '5', name: 'A2', child: [
                { id: '3', name: 'deneme2' },
                { id: '4', name: 'deneme3' }
            ]
        },

    ]);


    const openModal = (value) => {
        if(value=={})
        {
            setTitle('Ana Grup Ekleme');
        }
        else
        {
            setTitle(value.name+' Alt Grup Ekleme');
        }
        
        setisAddOrUpdate(0);
        setSelectValue(value);
        setIsModalVisible(true);
    };
 
    

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = () => {
        if (inputValue.trim() === '') {
            // Handle validation or show an alert
        } else {
            if (selectedItem) {
                // Update existing item
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === selectedItem.id ? { ...item, value: inputValue } : item
                    )
                );
                setSelectedItem(null);
            } else {
                // Add new item
                const newItem = { id: Date.now().toString(), value: inputValue };
                setItems((prevItems) => [...prevItems, newItem]);
            }

            setInputValue('');
            closeModal();
        }
    };

    const handleEdit = (item) => {
        setTitle(item.name+' Güncelleme');
        setisAddOrUpdate(1);

        setSelectValue(item);
        setIsModalVisible(true);
    };

    const handleSubEdit = (item,child) => {
        setTitle(item.name+' > '+child.name+' Güncelleme');
        setisAddOrUpdate(1);

        setSelectValue(child);
        setIsModalVisible(true);
    };

    const handleDelete = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const handleSubDelete = (itemid,subitemid) => {
        setItems((prevItems) => {
            let x=[];
            prevItems.map((item, index) =>{
                let newitem=item;
                if(+item.id===+itemid)
                {
                    newitem.child=item.child.filter(x=>+x.id!==+subitemid);
                }
                x.push(newitem);
            })
            return x;
        });
    };
    const ChatItem = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#e9e7e7', marginBottom: 4, borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, marginHorizontal: 10, backgroundColor: 'white', borderColor: '#e9e7e7', borderWidth: 1, padding: 5, borderRadius: 5 }}>
                    <Text style={{ color: '#000' }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => handlePlay(item)}>
                            <Ionicons name="play" size={20} color="orange" style={{ marginLeft: 10, marginTop: -2 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openModal(item)}>
                            <FontAwesome name="plus" size={20} color="green" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEdit(item)}>
                            <FontAwesome name="edit" size={20} color="blue" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <FontAwesome name="trash" size={20} color="red" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>



                </View>
                {
                    item.child.map((value, index) =>
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, marginHorizontal: 10, backgrounDColor: 'white', borderColor: '#e9e7e7', borderWidth: 1, padding: 5, borderRadius: 5 }}>
                            <Text style={{ color: '#000' }}>{value.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleSubPlay(value.id)}>
                                    <Ionicons name="play" size={20} color="orange" style={{ marginLeft: 10, marginTop: -2 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSubEdit(item,value)}>
                                    <FontAwesome name="edit" size={20} color="blue" style={{ marginLeft: 10 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSubDelete(item.id,value.id)}>
                                    <FontAwesome name="trash" size={20} color="red" style={{ marginLeft: 10 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
            </View>
        );
    };



    return (
        <ScrollView style={{ flexGrow: 1 }}>
            <View style={styles.listItem}>
                <View style={styles.formContainer}>
                    <View style={[styles.tabMenu, { backgroundBottomColor: 'white', borderBottomColor: '#e9e7e7', borderBottomWidth: 1, paddingBottom: 5 }]}>
                        <Text style={[styles.buttonText]}>Kelime Grup Listesi</Text>
                    </View>
                    <View style={[styles.tabMenu, { backgroundColor: '#e9e7e7', borderColor: '#e9e7e7', borderWidth: 1, marginBottom: 10, padding: 5, borderRadius: 5 }]}>
                        <TouchableOpacity onPress={() => openModal({})}>
                            <Text style={styles.buttonText}>Ana Grup Ekleme</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={items}
                        renderItem={({ item }) => (
                            <ChatItem
                                item={item}
                            // onItemLongPress={() => onItemLongPress(item.id)}
                            // onItemPress={() => onItemPress(item.id)}
                            // selectedItems={selectedItems}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        style={styles.flatList}
                    />
                </View>



                {/* Modal */}
                <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        

                        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                       
                        <View style={[styles.tabMenu, { backgroundBottomColor: 'white', borderBottomColor: '#e9e7e7', borderBottomWidth: 1, paddingBottom: 5 }]}>
                            <Text style={[styles.buttonText]}>{title}</Text>
                        </View>

                            <Text>Grup Adı</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8, width: '100%' }}
                                placeholder="Enter a value"
                                value={inputValue}
                                onChangeText={(text) => setInputValue(text)}
                            />
                            <View style={styles.tabMenu}>
                                <Button title="Submit" onPress={handleSubmit} />
                                <Button title="Close" onPress={closeModal} />
                            </View>

                        </View>
                    </View>
                </Modal>


            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    addItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    wordCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wordMains: {
        flexDirection: 'row', // Yazıları yatayda sıralamak için
        flexWrap: 'wrap',
        marginLeft: 10,
    },
    wordMain: {
        marginRight: 5,       // Yazılar arasına boşluk bırakmak için
    },

    fileBorder: {
        borderColor: '#e9e7e7',  // Sağdan, soldan ve üstten border rengi
        borderWidth: 1,        // Sağdan, soldan ve üstten border kalınlığı
        borderStyle: 'solid',  // Sağdan, soldan ve üstten border stil
        padding: 5
    },

    listItem: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    tabMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tabButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        zIndex: 2
    },
    activeTabButton: {
        backgroundColor: 'white',
        borderColor: '#e9e7e7',  // Sağdan, soldan ve üstten border rengi
        borderWidth: 1,        // Sağdan, soldan ve üstten border kalınlığı
        borderStyle: 'solid',  // Sağdan, soldan ve üstten border stil

        marginTop: -1,         // Sağdan, soldan ve üstten border kalınlığı için ayar
        marginRight: -1,       // Sağdan, soldan ve üstten border kalınlığı için ayar
        marginLeft: -1,
        zIndex: 2

    },

    means: {
        padding: 10,
        backgroundColor: '#e9e7e7',
        borderRadius: 10,
        marginBottom: 10,
    },
    formContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    picker: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    flatList: {
        flex: 1,
    },
    listItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 10,
    },
    listItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: 100,
        marginRight: 0,
        borderRadius: 10,
    },
    chatInfo: {
        flex: 1,
    },

});

export default AddGroupFormComponent;
