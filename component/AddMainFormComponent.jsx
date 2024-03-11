import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
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
import { TextInput, IconButton,Menu } from 'react-native-paper';
import { meansTypeList,meansTypeAdd,meansTypeUpdate,meansTypeDelete } from './apiService';
const AddMainFormComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({mt_id:0,mt_name:'',mt_short_name:'',WordMeans:[],Words:[]});
    const [title, setTitle] = useState("");
    const [items, setItems] = useState([]);
    const fetchmeansTypeData = async () => {
        const chats = await meansTypeList();
        setItems(chats);
      };
    useEffect(() => {
        fetchmeansTypeData(); 
      }, []); 

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    

    const openModal = () => {
        setTitle('Tip Ekleme');
        setFormData({mt_id:0,mt_name:"",mt_short_name:"",WordMeans:[],Words:[]});
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = () => {

        if(formData.mt_name=='' || formData.mt_short_name=='')
        {
            alert('Tip adı ve tip kısa adı alanları zorunlu alanlardır lütfen doldurunuz');
            return 0;
        }
        if(formData.mt_id!=='' && +formData.mt_id!==0) //// güncelleme olacak
        {
            const fetchmeansTypeUpdate= async () => {
                await meansTypeUpdate(formData).then((x) => {
                    fetchmeansTypeData(); 
                  }).catch(err => console.log('hata var'));
              };
              fetchmeansTypeUpdate(); 
        }
        else //// ekleme yapılacak
        {
            const fetchmeansTypeAdd= async () => {
                await meansTypeAdd(formData).then((x) => {
                    fetchmeansTypeData(); 
                  }).catch(err => console.log('hata var'));
              };
              fetchmeansTypeAdd(); 
              setFormData({mt_id:0,mt_name:'',mt_short_name:'',WordMeans:[],Words:[]}); //// bu kısım eklede girmeli
            
        }
        closeModal();
    };

    const handleEdit = (item) => {
        setTitle('Tip Güncelleme');
        setFormData({mt_id:item.mt_id,mt_name:item.mt_name,mt_short_name:item.mt_short_name,WordMeans:[],Words:[]});
        setIsModalVisible(true);
    };

   

    const handleDelete = (item) => {
        const fetchmeansTypeDelete= async () => {
            await meansTypeDelete(item.mt_id).then((x) => {
                fetchmeansTypeData(); 
              }).catch(err => console.log('hata var'));
          };
          fetchmeansTypeDelete(); 
          setFormData({mt_id:0,mt_name:'',mt_short_name:'',WordMeans:[],Words:[]}); //// bu kısım eklede girmeli
    };

    const ChatItem = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#e9e7e7', marginBottom: 4, borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, marginHorizontal: 10, backgroundColor: 'white', borderColor: '#e9e7e7', borderWidth: 1, padding: 5, borderRadius: 5 }}>
                    <Text style={{ color: '#000' }}>{item.mt_name} <span style={{ backgroundColor: 'orange', color: 'white', paddingLeft: 4, paddingRight: 4, borderRadius: 2, marginBottom: 2 }}> {item.mt_short_name} </span></Text>
                    
                  
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => handlePlay(item)}>
                            <Ionicons name="play" size={20} color="orange" style={{ marginLeft: 10, marginTop: -2 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEdit(item)}>
                            <FontAwesome name="edit" size={20} color="blue" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item)}>
                            <FontAwesome name="trash" size={20} color="red" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>



                </View>
             
            </View>
        );
    };



    return (
        <ScrollView style={{ flexGrow: 1 }}>
            <View style={styles.listItem}>
                <View style={styles.formContainer}>
                    <View style={[styles.tabMenu, { backgroundBottomColor: 'white', borderBottomColor: '#e9e7e7', borderBottomWidth: 1, paddingBottom: 5 }]}>
                        <Text style={[styles.buttonText]}>Kart Anlam Tipleri</Text>
                    </View>
                    <TouchableOpacity onPress={() => openModal({})}>
                    <View style={[styles.tabMenu, { backgroundColor: '#e9e7e7', borderColor: '#e9e7e7', borderWidth: 1, marginBottom: 10, padding: 5, borderRadius: 5 }]}>
                       
                            <Text style={styles.buttonText}>Tip Ekle</Text>
                        
                    </View>
                    </TouchableOpacity>
                    <FlatList
                        data={items}
                        renderItem={({ item }) => (
                            <ChatItem
                                item={item}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        style={styles.flatList}
                    />
                </View>

                <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <View style={[styles.tabMenu, { backgroundBottomColor: 'white', borderBottomColor: '#e9e7e7', borderBottomWidth: 1, paddingBottom: 5 }]}>
                            <Text style={[styles.buttonText]}><b>{title}</b></Text>
                        </View>

                            <Text style={{marginBottom:'2px'}}><b>Tip Adı</b></Text>
                            <TextInput
                                

                                style={[styles.input, { backgroundColor: 'white' }]}
                                value={formData.mt_name}
                                placeholder='Tipi giriniz'
                                onChangeText={(text) => handleInputChange('mt_name',text)}
                                name='mt_name'

                            />

                            <Text style={{marginBottom:'2px'}}><b>Kısa Kodu</b></Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: 'white' }]}
                                value={formData.mt_short_name}
                                placeholder='Tip kısa kod giriniz'
                                onChangeText={(text) => handleInputChange('mt_short_name',text)}
                                name='mt_short_name'
                            />
                            
                            <View style={styles.tabMenu}>
                                <Button title="Submit" style={{width:'100%'}} onPress={handleSubmit} />
                                <Button title="Close" style={{width:'100%'}} onPress={closeModal} />
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
        fontSize: 18,
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

export default AddMainFormComponent;
