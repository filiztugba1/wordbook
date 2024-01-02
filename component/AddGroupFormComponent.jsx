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
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import * as XLSX from "xlsx";
import { Ionicons } from '@expo/vector-icons';
const AddItemForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    en: '',
    zf: '',
    image: null, // Resmi null olarak başlatın
    example1: '',
    example2: '',
    type: '',
  });

  const [formDataMean, setformDataMean] = useState({ mean: '', type: '' });
  const [formDataMeans, setformDataMeans] = useState([]);
  const [formDataExp, setformDataExp] = useState({ name: '' });
  const [formDataExps, setformDataExps] = useState([]);


  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleformDataMeans = (name, value) => {
    setformDataMean((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleformDataExp = (name, value) => {
    setformDataExp((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExps = (name, value) => {
    // Eklemeye çalıştığınız veri zaten var mı kontrol et
    const isExpExists = formDataExps.some(item => item.name === formDataExp.name);

    if (isExpExists) {
      // Veri zaten var, kullanıcıya uyarı göster
      alert("Bu anlam zaten eklenmiş!");
    } else {
      // Eklenmeye çalışılan veri yoksa, eklemeyi devam ettir
      setformDataExps(prevDataMeans => [...prevDataMeans, formDataExp]);
    }
  };


  const handleAddMeans = () => {
    // Eklemeye çalıştığınız veri zaten var mı kontrol et
    const isMeanExists = formDataMeans.some(item => item.mean === formDataMean.mean && item.type === formDataMean.type);

    if (isMeanExists) {
      // Veri zaten var, kullanıcıya uyarı göster
      alert("Bu anlam zaten eklenmiş!");
    } else {
      // Eklenmeye çalışılan veri yoksa, eklemeyi devam ettir
      setformDataMeans(prevDataMeans => [...prevDataMeans, formDataMean]);
    }
  };
  const handleAddItem = () => {
    // Form verilerini kullanarak yeni bir öğe oluşturun
    const newItem = {
      id: generateUniqueId(), // Bu, benzersiz bir kimlik üretecek bir işlev olmalı
      en: formData.en,
      means: [{ mean: formData.zf, type: 'zf.' }],
      examples: [
        { name: formData.example1 },
        { name: formData.example2 },
      ],
      image: formData.image,
    };

    // onAddItem işlevini çağırarak yeni öğeyi iletilen işlevi çağırın
    onAddItem(newItem);

    // Form verilerini sıfırlayın
    setFormData({
      en: '',
      zf: '',
      image: '',
      example1: '',
      example2: '',
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFormData((prevData) => ({
        ...prevData,
        image: result.uri,
      }));
    }
  };
  const handleRemoveMean = (index) => {
    // Silme işlevini gerçekleştir
    const newMeans = [...formDataMeans];
    newMeans.splice(index, 1);
    setformDataMeans(newMeans);
  };
  const handleRemoveExp = (index) => {
    // Silme işlevini gerçekleştir
    const newExps = [...formDataExps];
    newExps.splice(index, 1);
    setformDataExps(newExps);
  };


  return (

    <View style={[styles.formContainer, { borderColor: '#e9e7e7', borderWidth: 1, borderStyle: 'solid', zIndex: 1 }]}>
      <Text style={styles.label}>Grubu</Text>
      <Picker
        selectedValue={formData.type}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('type', itemValue)}
      >
        <Picker.Item label="Seçiniz" value="" />
        <Picker.Item label="A1" value="0" />
        <Picker.Item label="A2" value="1" />
        <Picker.Item label="B1" value="2" />
        <Picker.Item label="B2" value="3" />
        <Picker.Item label="C1" value="4" />
        <Picker.Item label="C2" value="5" />
        {/* İsteğe bağlı olarak diğer tipleri ekleyebilirsiniz */}
      </Picker>

      <Text style={styles.label}>İngilizce Kelime:</Text>
      <TextInput
        style={styles.input}
        value={formData.en}
        placeholder='İngilizce kelimeyi yazınız'
        onChangeText={(text) => handleInputChange('en', text)}
      />

      <Text style={styles.label}>Anlamları:</Text>
      <View style={styles.means}>
        <Text style={styles.label}>Anlamı</Text>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={formDataMean.mean}
          placeholder='Kelimenin anlamını giriniz'
          onChangeText={(text) => handleformDataMeans('mean', text)}
        />
        <Text style={styles.label}>Tipi</Text>
        <Picker
          selectedValue={formDataMean.type}
          style={styles.picker}
          onValueChange={(itemValue) => handleformDataMeans('type', itemValue)}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="Cümle" value="c." />
          <Picker.Item label="Zarf" value="zf." />
          <Picker.Item label="Zamir" value="zm." />
          <Picker.Item label="Sıfat" value="s." />
          <Picker.Item label="İsim" value="i." />
          <Picker.Item label="Fiil" value="f." />
          {/* İsteğe bağlı olarak diğer tipleri ekleyebilirsiniz */}
        </Picker>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: 'blue', color: 'white' }]} onPress={handleAddMeans}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Ekle</Text>
        </TouchableOpacity>

        {formDataMeans.length > 0 ? (
          <View style={[styles.wordCard, { backgroundColor: '#b4e0ff', borderRadius: 5, marginTop: 4, textAlign: "center" }]}>
            <View>
              <Text style={{ textAlign: "left", marginTop: 4, marginBottom: 4, marginLeft: 10 }}>Eklenenler</Text>
              {formDataMeans.map((m, index) => (
                <View style={[styles.wordMains, { marginTop: 5, marginBottom: 5, marginLeft: 10 }]} key={index}>
                  <FontAwesome name="circle" size={10} color="#000" style={{ marginRight: 5 }} />
                  <Text style={[styles.exampleSentence, { lineHeight: '3px' }]}>{m.mean} <span style={{ backgroundColor: 'orange', color: 'white', paddingLeft: 4, paddingRight: 4, borderRadius: 2, marginBottom: 2 }}>{m.type}</span></Text>
                  <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => handleRemoveMean(index)}>
                    <FontAwesome style={[styles.exampleSentence, { lineHeight: '3px' }]} name="trash" size={15} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ) : <></>}


      </View>

      <Text style={styles.label}>Image URL:</Text>
      <View style={[styles.means, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        {formData.image && <Image source={{ uri: formData.image }} style={{ width: 200, height: 200 }} />}
        <Button title="Resim Ekle" onPress={pickImage} />
      </View>

      <Text style={styles.label}>Örnek Çümleler:</Text>
      <View style={styles.means}>
        <Text style={styles.label}>Çümle</Text>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={formData.formDataExp}
          onChangeText={(text) => handleformDataExp('name', text)}
        />
        <TouchableOpacity style={[styles.addButton, { backgroundColor: 'blue', color: 'white' }]} onPress={handleAddExps}>
          <Text style={[styles.buttonText, { color: 'white' }]} >Ekle</Text>
        </TouchableOpacity>

        {formDataExps.length > 0 ? (
          <View style={[styles.wordCard, { backgroundColor: '#b4e0ff', borderRadius: 5, marginTop: 4, textAlign: "center" }]}>
            <View>
              <Text style={{ textAlign: "left", marginTop: 4, marginBottom: 4, marginLeft: 10 }}>Eklenenler</Text>
              {formDataExps.map((m, index) => (
                <View style={[styles.wordMains, { marginTop: 5, marginBottom: 5, marginLeft: 10 }]} key={index}>
                  <FontAwesome name="circle" size={10} color="#000" style={{ marginRight: 5 }} />
                  <Text style={[styles.exampleSentence, { lineHeight: '3px' }]}>{m.name}</Text>
                  <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => handleRemoveExp(index)}>
                    <FontAwesome style={[styles.exampleSentence, { lineHeight: '3px' }]} name="trash" size={15} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ) : <></>}

      </View>

      <TouchableOpacity onPress={handleAddItem} style={[styles.addButton, { backgroundColor: 'blue', color: 'white' }]}>
        <Text style={[styles.buttonText, { color: 'white' }]}>Kelime Kartını Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChatItem = ({ item}) => {
  return (
    <View style={{backgroundColor: '#e9e7e7',marginBottom:4,borderRadius:5}}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, marginHorizontal: 10, backgroundColor: 'white',borderColor: '#e9e7e7',borderWidth: 1,padding:5,borderRadius:5 }}>
    <Text style={{color:'#000'}}>{item.name}</Text>
    <View style={{ flexDirection: 'row' }}>
    <TouchableOpacity onPress={() => handleDelete(item.id)}>
    <Ionicons name="play" size={20} color="orange"  style={{ marginLeft: 10,marginTop:-2 }}/>
      </TouchableOpacity>
    <TouchableOpacity onPress={() => handleEdit(item)}>
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
        item.child.map((value,index) =>
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, marginHorizontal: 10, backgrounDColor: 'white',borderColor: '#e9e7e7',borderWidth: 1,padding:5,borderRadius:5 }}>
            <Text style={{color:'#000'}}>{value.name}</Text>
            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Ionicons name="play" size={20} color="orange" style={{ marginLeft: 10,marginTop:-2}}/>
      </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(item)}>
                <FontAwesome name="edit" size={20} color="blue" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <FontAwesome name="trash" size={20} color="red" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            </View>
            </View>
          )}
          </View>
  );
};
const AddGroupFormComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState({});
    const [items, setItems] = useState([
        {
            id: '2',name:'A1',child:[
                {id: '3',name:'deneme2' },
                {id: '4',name:'deneme3' }
            ]
        },
        {
            id: '5',name:'A2',child:[
                {id: '3',name:'deneme2' },
                {id: '4',name:'deneme3' }
            ]
        },
    
    ]);
  
    const openModal = (value) => {
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
    setInputValue(item.value);
    setSelectedItem(item);
    openModal();
  };

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  

  
    return (
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.listItem}>
        <View style={styles.formContainer}>
          <View style={[styles.tabMenu,{ backgroundBottomColor: 'white',borderBottomColor: '#e9e7e7',borderBottomWidth: 1,paddingBottom:5}]}>
            <Text style={[styles.buttonText]}>Kelime Grup Listesi</Text>
          </View>
          <View style={[styles.tabMenu,{ backgroundColor: '#e9e7e7',borderColor: '#e9e7e7',borderWidth: 1,marginBottom:10,padding:5,borderRadius:5}]}>
            <TouchableOpacity onPress={()=>openModal()}>
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
