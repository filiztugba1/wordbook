import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Picker, Button, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // FontAwesome eklenen kütüphanenin ismi
import * as ImagePicker from 'expo-image-picker';
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
                <Text style={[styles.exampleSentence, { lineHeight: '3px' }]}>{m.mean} <span style={{backgroundColor: 'orange',color:'white',paddingLeft:4,paddingRight:4,borderRadius: 2,marginBottom:2}}>{m.type}</span></Text>
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
          style={styles.input}
          value={formData.zf}
          onChangeText={(text) => handleInputChange('zf', text)}
        />
        <TouchableOpacity style={[styles.addButton, { backgroundColor: 'blue', color: 'white' }]}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Ekle</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleAddItem} style={[styles.addButton, { backgroundColor: 'blue', color: 'white' }]}>
        <Text style={[styles.buttonText, { color: 'white' }]}>Kelime Kartını Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const ExcelAddItemForm = ({ onBulkAddItems }) => {
  const handleBulkAddItems = () => {
    // Excel'den veri almak için gerekli işlemleri yapın

    // Örneğin, bir Excel dosyasını okuyup verileri alabilirsiniz
    // ...

    // onBulkAddItems işlevini çağırarak toplu eklenen öğeleri iletilen işleve iletilir
    onBulkAddItems(bulkItems);
  };

  return (
    <View style={styles.formContainer}>
      <TouchableOpacity onPress={handleBulkAddItems} style={styles.addButton}>
        <Text style={styles.buttonText}>Bulk Add Items from Excel</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddItemFormComponent = () => {
  const [activeForm, setActiveForm] = useState('singleItem'); // Varsayılan olarak tek öğe formunu göster

  const handleAddItem = () => {
    // Tek öğe ekleme işlevi
    // ...

    // Daha sonra, formu değiştirin
    setActiveForm('bulkItem');
  };

  const handleBulkAddItems = () => {
    // Toplu öğeleri ekleme işlevi
    // ...

    // Daha sonra, formu değiştirin
    setActiveForm('singleItem');
  };

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <View style={styles.listItem}>
        <View style={styles.formContainer}>
          <View style={styles.tabMenu}>
            <TouchableOpacity onPress={() => setActiveForm('singleItem')} style={[styles.tabButton, activeForm === 'singleItem' && styles.activeTabButton]}>
              <Text style={styles.buttonText}>Kelime Kartı Oluştur</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveForm('bulkItem')} style={[styles.tabButton, activeForm === 'bulkItem' && styles.activeTabButton]}>
              <Text style={styles.buttonText}>Toplu Yükle</Text>
            </TouchableOpacity>
          </View>
          <View>
            {activeForm === 'singleItem' && <AddItemForm onAddItem={handleAddItem} />}
            {activeForm === 'bulkItem' && <ExcelAddItemForm onBulkAddItems={handleBulkAddItems} />}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default AddItemFormComponent;
