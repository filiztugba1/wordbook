import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  FlatList,
  Picker
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import * as XLSX from "xlsx";
import { Ionicons } from '@expo/vector-icons';
import { TextInput, IconButton,Menu } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { wordGroups,meansType } from './apiService';
const AddItemForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    wg_id: 0,
    wg_sub_id: 0,
    w_name: '',
    w_id:0,
    w_mains:[],
    w_image:'',
    examples:[],
    irregular:[],
  });

  const [formDataMean, setformDataMean] = useState({ mean: '', type: '' });
  const [formDataMeans, setformDataMeans] = useState([]);
  const [formDataExp, setformDataExp] = useState({ name: '' });
  const [formDataExps, setformDataExps] = useState([]);
  const [subGroupIsActive, setsubGroupIsActive] = useState(false);

  const [groupData, setgroupData] = React.useState([]);
const [typeData, setmeanTypesData] = React.useState([]);
const [groupSubData, setgroupSubData] = React.useState([]);

useEffect(() => {
  const fetchgroupData = async () => {
      const chats = await wordGroups();
      setgroupData(chats);
  };
  const fetchmeansTypeData = async () => {
    const chats = await meansType();
    setmeanTypesData(chats);
  };
  fetchgroupData(); 
  fetchmeansTypeData(); 
}, []); 


  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name==='wg_id')
    {
      handleInputChange('wg_sub_id',0);
      const mean=groupData.find(x=>x.key===value);
      if(mean.child.length!==0)
      {
        const formattedData = mean.child.map(item => {
          // Her bir öğe için yeni bir nesne oluştur
          return {
            key: item.wg_id.toString(), // Key değeri wg_id'nin bir dize olarak dönüştürülmüş hali
            value: item.wg_name, // Value değeri wg_name'in kendisi
            parent_id:item.wg_parent_id
          };
        });

         setgroupSubData(formattedData);
        setsubGroupIsActive(true);
      }
      else
      {
        setgroupSubData([]);
        setsubGroupIsActive(false);
      }
    }
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
    console.log(formDataMeans);
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
        w_image: result.uri,
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


const [selected, setSelected] = React.useState("");
const [typeselected, settypeSelected] = React.useState("");




  return (
<>

<View style={[styles.formContainer, { borderTopColor: '#e9e7e7', borderTopWidth: 1, borderStyle: 'solid', zIndex: 1,borderRadius:0,padding:10,paddingTop:20 }]}>
      <Text style={[styles.label]}><b>Grubu</b></Text>
   
      <SelectList 
        setSelected={(val) =>  handleInputChange('wg_id', val)} 
        data={groupData} 
        save="key"
        name="wg_id"
        boxStyles={{borderBottomLeftRadius:0,borderBottomRightRadius:0,borderTopLeftRadius:5,borderTopRightRadius:5}}
        dropdownStyles={{borderTopLeftRadius:0,borderTopRightRadius:0,borderBottomLeftRadius:5,borderBottomRightRadius:5}}
    />
        
        {subGroupIsActive?
        <View>
     <Text style={styles.label}><b>Alt Grubu</b></Text>
   
   <SelectList 
     setSelected={(val) =>  handleInputChange('wg_sub_id', val)} 
     data={groupSubData} 
     save="key"
     name="wg_sub_id"
     boxStyles={{borderBottomLeftRadius:0,borderBottomRightRadius:0,borderTopLeftRadius:5,borderTopRightRadius:5}}
     dropdownStyles={{borderTopLeftRadius:0,borderTopRightRadius:0,borderBottomLeftRadius:5,borderBottomRightRadius:5}}
 />
     </View>
     :''}
     

      <Text style={[styles.label,{marginTop:10}]}><b>İngilizce Kelime</b></Text>
 <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={formData.w_name}
          placeholder='İngilizce kelimeyi yazınız'
          onChangeText={(text) => handleInputChange('w_name', text)}
          name='w_name'
        />

      {/* burası arraye atılacak */}
      <Text style={styles.label}><b>Anlamları:</b></Text>
      <View style={styles.means}>
        <Text style={styles.label}>Anlamı</Text>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={formDataMean.mean}
          placeholder='Kelimenin anlamını giriniz'
          onChangeText={(text) => handleformDataMeans('mean', text)}
        />
        <Text style={styles.label}>Tipi</Text>

        <SelectList 
        setSelected={(val) => handleformDataMeans('type', val)} 
        data={typeData} 
        save="key"
        boxStyles={{borderBottomLeftRadius:0,borderBottomRightRadius:0,borderTopLeftRadius:5,borderTopRightRadius:5}}
        dropdownStyles={{borderTopLeftRadius:0,borderTopRightRadius:0,borderBottomLeftRadius:5,borderBottomRightRadius:5}}
    />

        <TouchableOpacity style={[styles.addButton, { backgroundColor: 'blue', color: 'white',marginTop:5 }]} onPress={handleAddMeans}>
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

      <Text style={styles.label}><b>Image URL:</b></Text>
      <View style={[styles.means, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        {formData.w_image && <Image source={{ uri: formData.w_image }} style={{ width: 200, height: 200 }} />}
        <Button title="Resim Ekle" onPress={pickImage} />
      </View>
   
      {/* bu kısım arraye atılacak */}
      <Text style={styles.label}><b>Örnek Çümleler:</b></Text>
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

     
    </View>
     <TouchableOpacity onPress={handleAddItem} style={[styles.addButton, { backgroundColor: 'blue', color: 'white' }]}>
     <Text style={[styles.buttonText, { color: 'white' }]}>Kelime Kartını Ekle</Text>
   </TouchableOpacity></>
  );
};

const ExcelAddItemForm = ({ onBulkAddItems }) => {

  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      // chats = [
      //   {
      //       id: '1', en: 'about', means: [
      //           { mean: 'hemen hemen', type: 'zf.' },
      //           { mean: 'aşağı yukarı', type: 'zf.' },
      //           { mean: 'yaklaşık', type: 'zf.' },
      //       ],
      //       examples: [{ name: 'it is about' }, { name: 'she is about' }]
      //       , image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
      //   },

      const duzenliIfade = /\s*\[.*?\]\s*/g;
      let fullData=[];
      console.log(d);
      d.map((m, index) => {
        let data = m;
        let column = {};
        let trs = [];
        let exps= [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            console.log(`${key}: ${value}`);
            if (key == 'en') {
              column.en = value;
            }
            if (key.includes('tr')) {
              let tr = {};
              if (value.includes('[zf.]')) {
                tr.type = 'zf.';
              }
              if (value.includes('[i.]')) {
                tr.type = 'i.';
              }
              if (value.includes('[s.]')) {
                tr.type = 's.';
              }
              if (value.includes('[c.]')) {
                tr.type = 'c.';
              }
              if (value.includes('[f.]')) {
                tr.type = 'f.';
              }
              if (value.includes('[zm.]')) {
                tr.type = 'zm.';
              }
              tr.mean = value.replace(duzenliIfade, '');
              trs.push(tr);
            }
            if (key.includes('exp')) {
              let exp = {};
              exp.name = value;
              exps.push(value);
            }

          }
        }
        column.means=trs;
        column.examples=exps;
        fullData.push(column);
      }
      )
      console.log(fullData);
       setItems(fullData);
      
    });
  };

  return (
    <View style={[styles.formContainer, { borderTopColor: '#e9e7e7', borderTopWidth: 1, borderStyle: 'solid', zIndex: 1,borderRadius:0,padding:10,paddingTop:20,height:'100%' }]}>
      <input
        style={styles.fileBorder}
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      {/* <View style={styles.container}> */}
        <View style={styles.addItemContainer}>
          {items.length!=0? <FlatList
            data={items}
            renderItem={({ item }) => (
                <ChatItem
                    item={item}
                    // onItemLongPress={() => onItemLongPress(item.id)}
                    // onItemPress={() => onItemPress(item.id)}
                    // selectedItems={selectedItems}
                />
            )}
            keyExtractor={(item) => item.en}
            style={styles.flatList}
        />:<></>}
        {/* </View> */}
        </View>
    </View>
  );
};
const ChatItem = ({ item}) => {
  const adverbs = item.means.filter(x => x.type === 'zf.');
  const nouns = item.means.filter(x => x.type === 'i.');
  const adjectives = item.means.filter(x => x.type === 's.');
  const pronouns = item.means.filter(x => x.type === 'zm.');
  const verbs = item.means.filter(x => x.type === 'f.');

  // ...

  return (
      <TouchableOpacity
      style={[
          styles.listItem,
          {
              marginVertical: 5,
              marginHorizontal: 10,
              // backgroundColor: selectedItems.includes(item.id) ? '#ddd' : '#fff',
          },
      ]}
      // onLongPress={() => onItemLongPress(item.id)}
      // onPress={() => onItemPress(item.id)}
  >
          {item.image!=''?<Image source={{ uri: item.image }} style={styles.avatar} />:<></>}

          <View style={styles.listItemContent}>

          <View style={styles.chatInfo}>
              {/* İngilizce kelime kartı */}
              <View style={styles.wordCard}>
                  <View style={styles.wordDetails}>
                      <Text style={styles.wordText}>{item.en}</Text>
                  </View>
                  <Ionicons name="volume-high" size={24} color="#888" style={styles.soundIcon}  onPress={() => speak(item.en)}/> {/* Ses ikonu */}
              </View>
          {adverbs.length!=0?<View style={styles.wordCard}>
              <View style={styles.wordMains}>
                  <Text style={styles.wordMain}>Adverbs : </Text>
                  <Text style={styles.wordMain}>
                  {adverbs.map((m, index) => 
                      <View key={m.mean}>{m.mean}{index < adverbs.length - 1 ? ',' : ''}</View>
                  )}
                  </Text>
              </View>
          </View>:<></>}
          
          {nouns.length!=0?
          <View style={styles.wordCard}>
              <View style={styles.wordMains}>
                  <Text style={styles.wordMain}>Noun : </Text>
                  <Text style={styles.wordMain}>
                  {nouns.map((m, index) => 
                      <View key={m.mean}>{m.mean}{index < nouns.length - 1 ? ',' : ''}</View>
                  )}
                  </Text>
              </View>
          </View>
          :<></>}

          {adjectives.length!=0?
          <View style={styles.wordCard}>
              <View style={styles.wordMains}>
                  <Text style={styles.wordMain}>Adjective : </Text>
                  <Text style={styles.wordMain}>
                  {adjectives.map((m, index) => 
                      <View key={m.mean}>{m.mean}{index < adjectives.length - 1 ? ',' : ''}</View>
                  )}
                  </Text>
              </View>
          </View>
           :<></>}


          {pronouns.length!=0?
          <View style={styles.wordCard}>
              <View style={styles.wordMains}>
                  <Text style={styles.wordMain}>Pronoun : </Text>
                  <Text style={styles.wordMain}>
                  {pronouns.map((m, index) => 
                      <View key={m.mean}>{m.mean}{index < pronouns.length - 1 ? ',' : ''}</View>
                  )}
                  </Text>
              </View>
          </View>
          :<></>}

          {verbs.length!=0?
          <View style={styles.wordCard}>
              <View style={styles.wordMains}>
                  <Text style={styles.wordMain}>Verb : </Text>
                  <Text style={styles.wordMain}>
                  {verbs.map((m, index) => 
                      <View key={m.mean}>{m.mean}{index < verbs.length - 1 ? ',' : ''}</View>
                  )}
                  </Text>
              </View>
          </View>
          :<></>}

          {item.examples.length!=0?
         <View style={[styles.wordCard, { backgroundColor: '#b4e0ff', borderRadius: 5, marginTop: 4, textAlign: "center" }]}>
              <View >
                  <Text style={{ textAlign: "left",marginTop:4,marginBottom:4,marginLeft:10 }}>Examples :</Text>
                  {item.examples.map((m, index) => (
                      <View style={[styles.wordMains,{marginTop:4,marginBottom:4,marginLeft:10}]} key={index}>
                          <FontAwesome name="circle" size={10} color="#000" style={{ marginRight: 5 }} /> {/* Nokta ikonu */}
                          <Text style={[styles.exampleSentence,{lineHeight:'2px'}]}>{m.name}</Text>
                      </View>
                  ))}
              </View>
          </View>
          :<></>}
          </View>
          </View>
      </TouchableOpacity>
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
      
        <View style={[styles.formContainer, { borderTopColor: '#e9e7e7', borderTopWidth: 1, borderStyle: 'solid', zIndex: 1,borderRadius:0,padding:10,paddingTop:20 }] }>
          <View style={styles.tabMenu}>
            <TouchableOpacity onPress={() => setActiveForm('singleItem')} style={[styles.tabButton, activeForm === 'singleItem' && styles.activeTabButton]}>
              <Text style={styles.buttonText}>Kelime Kartı Oluştur</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveForm('bulkItem')} style={[styles.tabButton, activeForm === 'bulkItem' && styles.activeTabButton]}>
              <Text style={styles.buttonText}>Toplu Yükle</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:'-2px'}}>
            {activeForm === 'singleItem' && <AddItemForm onAddItem={handleAddItem} />}
            {activeForm === 'bulkItem' && <ExcelAddItemForm onBulkAddItems={handleBulkAddItems} />}
          </View>
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
    // padding: 10,
    // borderRadius: 10,
    marginBottom: 10,
    paddingBottom:20
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
    zIndex: 10,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    zIndex: 10,
    paddingBottom:20
  },
  activeTabButton: {
    backgroundColor: 'white',
    borderColor: '#e9e7e7',  // Sağdan, soldan ve üstten border rengi
    borderBottomColor: '#fff',  // Sağdan, soldan ve üstten border rengi
    borderWidth: 1,        // Sağdan, soldan ve üstten border kalınlığı
    borderStyle: 'solid',  // Sağdan, soldan ve üstten border stil
    
    marginTop: -1,         // Sağdan, soldan ve üstten border kalınlığı için ayar
    marginRight: -1,       // Sağdan, soldan ve üstten border kalınlığı için ayar
    marginLeft: -1,
    zIndex: 2,
    paddingBottom:20

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

export default AddItemFormComponent;
