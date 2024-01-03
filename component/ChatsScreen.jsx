import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, FlatList, StyleSheet, TouchableOpacity ,Modal} from 'react-native';
import { Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // FontAwesome eklenen kütüphanenin ismi
import AddItemFormComponent from './AddItemFormComponent'; // AddItem component'ının olduğu dosya yolu
import AddGroupFormComponent from './AddGroupFormComponent'; // AddItem component'ının olduğu dosya yolu
// import WorkItem from './WorkItem'; // AddItem component'ının olduğu dosya yolu
import * as Speech from 'expo-speech';


const chats = [
    {
        id: '1', en: 'about', means: [
            { mean: 'hemen hemen', type: 'zf.',id:1 },
            { mean: 'aşağı yukarı', type: 'zf.',id:2 },
            { mean: 'yaklaşık', type: 'zf.',id:3 },
        ],
        examples: [{ name: 'it is about',id:1 }, { name: 'she is about',id:2 }]
        , image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },
    {
        id: '2', en: 'above', means: [
            { mean: 'üzerine', type: 'zf.',id:4 },
            { mean: 'yukarısında', type: 'zf.',id:5 },
            { mean: 'yukarıda', type: 'zf.',id:6 },
        ],
        examples: [{ name: 'it is above',id:3 }, { name: 'she is above',id:4 }]
        , image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },

    {
        id: '3', en: 'action', means: [
            { mean: 'çalışma', type: 'i.',id:7 },
            { mean: 'davranış', type: 'i.',id:8 },
            { mean: 'aksiyon', type: 'i.',id:9 },
        ],
        examples: [{ name: 'it is action',id:5 }, { name: 'she is action',id:6 }]
        , image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },
    {
        id: '4', en: 'above', means: [
            { mean: 'üzerine', type: 'zf.',id:10 },
            { mean: 'yukarısında', type: 'zf.',id:11 },
            { mean: 'yukarıda', type: 'zf.',id:12 },
        ],
        examples: [{ name: 'it is above',id:7 }, { name: 'she is above',id:8 }]
        , image: ''
    },


    // ... Diğer sohbetler
];

const speak = (text) => {
    Speech.speak(text);
  };


const ChatItem = ({ item, onItemLongPress, onItemPress, selectedItems }) => {
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
                backgroundColor: selectedItems.includes(item.id) ? '#ddd' : '#fff',
            },
        ]}
        onLongPress={() => onItemLongPress(item.id)}
        onPress={() => onItemPress(item.id)}
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
                        <>{m.mean}{index < adverbs.length - 1 ? ',' : ''}</>
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
                        <>{m.mean}{index < nouns.length - 1 ? ',' : ''}</>
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
                        <>{m.mean}{index < adjectives.length - 1 ? ',' : ''}</>
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
                        <>{m.mean}{index < pronouns.length - 1 ? ',' : ''}</>
                    )}
                    </Text>
                </View>
            </View>
            :<></>}

            {verbs.length!=0?
            <View style={styles.wordCard}>
                <View style={styles.wordMains}>
                    <Text style={styles.wordMain}>Verb : </Text>
                    <Text style={styles.wordMain} >
                    {verbs.map((m, index) => 
                        <>{m.mean}{index < verbs.length - 1 ? ',' : ''}</>
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
                           <Text>
                           <FontAwesome name="circle" size={10} color="#000" style={{ marginRight: 5 }} /> {/* Nokta ikonu */}
                            <Text style={[styles.exampleSentence,{lineHeight:'2px'}]}>{m.name}</Text>
                           </Text>
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
const handleAddItem = (newItem) => {
    // Yeni öğeyi mevcut listeye ekleyin
    setChats((prevChats) => [...prevChats, newItem]);
};


const ChatsScreen = ({ onItemLongPress, onItemPress, isMultiSelectMode, selectedItems }) => {
    const [dropmodalVisible, setdropModalVisible] = useState(false);
const DropdownMenu = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <View style={styles.dropdownContainer}>
        <>
        <TouchableOpacity onPress={() => { /* Yeni grup işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Basic Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Yeni topluluk işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Multiple Answers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Yeni topluluk işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Match Carts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Yeni topluluk işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Writing Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Yeni topluluk işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Audio Player</Text>
        </TouchableOpacity>
        </>
      </View>
    );
  };
  
const WorkItem = ({ onAddItem }) => {
    const [isModalVisible, setModalVisible] = useState(false);
  
    const handleAddItem = () => {
      // Yeni öğe eklemek için gerekli işlemleri gerçekleştirin.
      // Örnek olarak, bir form gösterip kullanıcının girdiği bilgilerle yeni bir öğe oluşturabilirsiniz.
  
      // Örnek:
      const newItem = {
        id: '3',
        en: 'newWord',
        means: [
          { mean: 'yeni', type: 'zf.' },
          { mean: 'eklenen', type: 'zf.' },
          { mean: 'kelime', type: 'zf.' },
        ],
        examples: [{ name: 'it is new' }, { name: 'she is added' }],
        image: 'https://example.com/newImage.jpg',
      };
  
      onAddItem(newItem);
  
      // İşlem tamamlandığında modal'ı kapatın
      setModalVisible(false);
    };
  
    const handleDropModalVisible = () => {
      setdropModalVisible(!dropmodalVisible);
    };
  

  
    return (
      <>
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            {/* Yeni öğe eklemek için bir form veya bilgi girişi alanları ekleyebilirsiniz. */}
            <Text style={styles.modalTitle}>Yeni Kelime Ekle</Text>
            {/* ... (yeni öğe ekleme formu) */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <FontAwesome name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </Modal>
  
        <TouchableOpacity
          style={styles.addItemButton}
          onPress={handleDropModalVisible}
        >
          <View style={styles.buttonContent}>
            <Text>
            <Ionicons name="play" size={24} color="orange" />
            <Text style={styles.addItemText}>Alıştırma Yap</Text>
            </Text>
          </View>
        </TouchableOpacity>
  
      </>
    );
  };
    
    const [isPageType, setisPageType] = useState(0);
    
    return (
        <View style={styles.container}>
             <DropdownMenu
                isVisible={dropmodalVisible}
                onClose={() => setdropModalVisible(false)}
            />
        <View style={styles.addItemContainer}>
        {isPageType==0?
                <>
                
                <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={() => setisPageType(1)}
                >
                    <View style={styles.buttonContent}>
                        <Text>
                        <Ionicons name="add" size={24} color="green" />
                        <Text style={styles.addItemText}>Yeni Kart Ekle</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            <View style={{zIndex:10}}>
            <WorkItem onAddItem={handleAddItem} />
            </View>
           
            </>:<></>}
        
            {isPageType==1?
                <>
                <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={() => setisPageType(0)}
                >
                    <View style={styles.buttonContent}>
                        <Text>
                        <Ionicons name="list" size={24} color="green" />
                        <Text style={styles.addItemText}>Tüm Kart Listesi</Text>
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={() => setisPageType(2)}
                >
                    <View style={styles.buttonContent}>
                        <Text>
                        <Ionicons name="document" size={24} color="blue" />
                        <Text style={styles.addItemText}>Kart Grupları</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </>:<></>}

            {isPageType==2?
                <>
                <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={() => setisPageType(0)}
                >
                    <View style={styles.buttonContent}>
                        <Text>
                        <Ionicons name="list" size={24} color="green" />
                        <Text style={styles.addItemText}>Tüm Kart Listesi</Text>
                        </Text>
                    </View>
                </TouchableOpacity>

                <>
                <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={() => setisPageType(1)}
                >
                    <View style={styles.buttonContent}>
                        <Text>
                        <Ionicons name="add" size={24} color="green" />
                        <Text style={styles.addItemText}>Yeni Kart Ekle</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </>
            </>:<></>}


        </View>
        {isPageType==1?<AddItemFormComponent/>:<></>}
        {isPageType==2?<AddGroupFormComponent/>:<></>}
        {isPageType==0? <FlatList
            data={chats}
            renderItem={({ item }) => (
                <ChatItem
                    key={item.id}
                    item={item}
                    onItemLongPress={() => onItemLongPress(item.id)}
                    onItemPress={() => onItemPress(item.id)}
                    selectedItems={selectedItems}
                />
            )}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
        />:<></>}
       
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    addItemButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    addItemText: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    addItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    flatList: {
        flex: 1,
        zIndex:4
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

    // Yeni eklenen stiller
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

    wordDetails: {
        flex: 1,
        marginLeft: 10,
    },

    wordText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    soundIcon: {
        marginLeft: 5,
    },
    wordType: {
        fontSize: 14,
        color: '#888',

    },
    exampleSentence: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },

    // ... (diğer stiller)
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 8,
  },
  addItemButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    zIndex: 8,
  },
  addItemText: {
    fontSize: 15,
    fontWeight: 'bold',
    zIndex: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    zIndex: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    zIndex: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
   dropdownContainer: {
    position: 'absolute',
    top: 70, // Butonun altında çıkması için gerekli değeri ayarlayabilirsiniz.
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    padding: 5,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default ChatsScreen;