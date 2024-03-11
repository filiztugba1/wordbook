import React, { useState,useEffect  } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, PanResponder } from 'react-native';
import { Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // FontAwesome eklenen kütüphanenin ismi
import AddItemFormComponent from './AddItemFormComponent'; // AddItem component'ının olduğu dosya yolu
import AddGroupFormComponent from './AddGroupFormComponent'; // AddItem component'ının olduğu dosya yolu
// import WorkItem from './WorkItem'; // AddItem component'ının olduğu dosya yolu
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/FontAwesome';

const chats = [
    {
        id: 13, en: 'about', means: [
            { mean: 'hemen hemen', type: 'zf.', id: 1 },
            { mean: 'aşağı yukarı', type: 'zf.', id: 2 },
            { mean: 'yaklaşık', type: 'zf.', id: 3 },
        ],
        examples: [{ name: 'it is about', id: 1 }, { name: 'she is about', id: 2 }]
        , image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },
    {
        id: 14, en: 'above', means: [
            { mean: 'üzerine', type: 'zf.', id: 4 },
            { mean: 'yukarısında', type: 'zf.', id: 5 },
            { mean: 'yukarıda', type: 'zf.', id: 6 },
        ],
        examples: [{ name: 'it is above', id: 3 }, { name: 'she is above', id: 4 }]
        , image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },

    {
        id: 15, en: 'action', means: [
            { mean: 'çalışma', type: 'i.', id: 7 },
            { mean: 'davranış', type: 'i.', id: 8 },
            { mean: 'aksiyon', type: 'i.', id: 9 },
        ],
        examples: [{ name: 'it is action', id: 5 }, { name: 'she is action', id: 6 }]
        , image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },
    {
        id: 16, en: 'above', means: [
            { mean: 'üzerine', type: 'zf.', id: 10 },
            { mean: 'yukarısında', type: 'zf.', id: 11 },
            { mean: 'yukarıda', type: 'zf.', id: 12 },
        ],
        examples: [{ name: 'it is above', id: 7 }, { name: 'she is above', id: 8 }]
        , image: ''
    },


    // ... Diğer sohbetler
];
const BasicReview = ({ onItemLongPress, onItemPress, isMultiSelectMode, selectedItems, type = 0 }) => {
    

    

    const [isPageType, setisPageType] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);


    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx > 50 && gestureState.vx > 0.5) {
                    // Sağa kaydırma ve hız kontrolü
                    handleNextCard();
                } else if (gestureState.dx < -50 && gestureState.vx < -0.5) {
                    // Sola kaydırma ve hız kontrolü
                    handlePrevCard();
                }
            },
            onPanResponderRelease: () => {
                // Eğer gerekirse, dokunmatikten elini çektiğinizde başka bir şey yapabilirsiniz.
            },
        })
    ).current;
    const handleNextCard = () => {
        if (currentCardIndex < chats.length - 1) {
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
        } else {
            // Eğer son kartsa başa dön
            setCurrentCardIndex(0);
        }
    };


    const handleTick = () => {
        if (currentCardIndex < chats.length - 1) {
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
        } else {
            // Eğer son kartsa başa dön
            setCurrentCardIndex(0);
        }
    };

    const handlePrevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex((prevIndex) => prevIndex - 1);
        } else {
            // Eğer ilk kartsa sona git
            setCurrentCardIndex(chats.length - 1);
        }
    };

    const [gameCompleted, setGameCompleted] = useState(false);

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  const ChatItem = ({ item, onItemLongPress, onItemPress, selectedItems = null, type = 0, handlePrevCard = null, handleTick = null, handleNextCard = null }) => {
    const adverbs = item.means.filter(x => x.type === 'zf.');
    const nouns = item.means.filter(x => x.type === 'i.');
    const adjectives = item.means.filter(x => x.type === 's.');
    const pronouns = item.means.filter(x => x.type === 'zm.');
    const verbs = item.means.filter(x => x.type === 'f.');

    // ...

    return (
        <>

            <TouchableOpacity
                style={[
                    styles.listItem,
                    {
                        marginVertical: 5,
                        marginHorizontal: 10,
                        backgroundColor: selectedItems != null && selectedItems.includes(item.id) ? '#ddd' : '#fff',
                        width: '95%'
                    },
                ]}
                onLongPress={() => onItemLongPress(item.id)}
                onPress={() => onItemPress(item.id)}
            >
                {type === 1 ? <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',  // Yatayda ve dikeyde ortalamak için eklenen stil
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        marginBottom: 5,
                        borderColor: '#e0e0e0',
                        backgroundColor: '#f5f5f5',
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 5
                    }}
                >
                    <TouchableOpacity onPress={handlePrevCard}>
                        <Icon name="caret-left" size={30} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleTick}>
                        <Icon name="check-circle" size={30} color="green" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNextCard}>
                        <Icon name="caret-right" size={30} color="gray" />
                    </TouchableOpacity>
                </View> : ''}

                {
                    type == 1 ? <View style={styles.wordCard}>
                        <>
                            <View style={styles.wordDetails}>
                                <Text style={[styles.wordText, { fontSize: 25 }]}>{item.en}</Text>
                            </View>
                            <Ionicons name="volume-high" size={24} color="#888" style={styles.soundIcon} onPress={() => speak(item.en)} /> </>
                    </View> : ''
                }
                {item.image != '' ? <Image source={{ uri: item.image }} style={styles.avatar} /> :
                    <View style={styles.avatar}>
                        <View style={styles.imagePlaceholder}>
                            <Icon name="image" size={50} color="#888" />
                            <Text>Resim Yok</Text>
                        </View>
                    </View>}

                <View style={styles.listItemContent}>

                    <View style={styles.chatInfo}>
                        {/* İngilizce kelime kartı */}
                        {
                            type == 0 ? <View style={styles.wordCard}>
                                <>
                                    <View style={styles.wordDetails}>
                                        <Text style={styles.wordText}>{item.en}</Text>
                                    </View>
                                    <Ionicons name="volume-high" size={24} color="#888" style={styles.soundIcon} onPress={() => speak(item.en)} /> </>
                            </View>
                                : ''}
                        {adverbs.length != 0 ? <View style={styles.wordCard}>
                            <View style={styles.wordMains}>
                                <Text style={styles.wordMain}>Adverbs : </Text>
                                <Text style={styles.wordMain}>
                                    {adverbs.map((m, index) =>
                                        <span key={m.id}>{m.mean}{index < adverbs.length - 1 ? ',' : ''}</span>
                                    )}
                                </Text>
                            </View>
                        </View> : <></>}

                        {nouns.length != 0 ?
                            <View style={styles.wordCard}>
                                <View style={styles.wordMains}>
                                    <Text style={styles.wordMain}>Noun : </Text>
                                    <Text style={styles.wordMain}>
                                        {nouns.map((m, index) =>
                                            <span key={m.id}>{m.mean}{index < nouns.length - 1 ? ',' : ''}</span>
                                        )}
                                    </Text>
                                </View>
                            </View>
                            : <></>}

                        {adjectives.length != 0 ?
                            <View style={styles.wordCard}>
                                <View style={styles.wordMains}>
                                    <Text style={styles.wordMain}>Adjective : </Text>
                                    <Text style={styles.wordMain}>
                                        {adjectives.map((m, index) =>
                                            <span key={m.id}>{m.mean}{index < adjectives.length - 1 ? ',' : ''}</span>
                                        )}
                                    </Text>
                                </View>
                            </View>
                            : <></>}


                        {pronouns.length != 0 ?
                            <View style={styles.wordCard}>
                                <View style={styles.wordMains}>
                                    <Text style={styles.wordMain}>Pronoun : </Text>
                                    <Text style={styles.wordMain}>
                                        {pronouns.map((m, index) =>
                                            <span key={m.id}>{m.mean}{index < pronouns.length - 1 ? ',' : ''}</span>
                                        )}
                                    </Text>
                                </View>
                            </View>
                            : <></>}

                        {verbs.length != 0 ?
                            <View style={styles.wordCard}>
                                <View style={styles.wordMains}>
                                    <Text style={styles.wordMain}>Verb : </Text>
                                    <Text style={styles.wordMain} >
                                        {verbs.map((m, index) =>
                                            <span key={m.id}>{m.mean}{index < verbs.length - 1 ? ',' : ''}</span>
                                        )}
                                    </Text>
                                </View>
                            </View>
                            : <></>}

                        {item.examples.length != 0 ?
                            <View style={[styles.wordCard, { backgroundColor: '#b4e0ff', borderRadius: 5, marginTop: 4, textAlign: "center" }]}>
                                <View >
                                    <Text style={{ textAlign: "left", marginTop: 4, marginBottom: 4, marginLeft: 10 }}>Examples :</Text>
                                    {item.examples.map((m, index) => (
                                        <View style={[styles.wordMains, { marginTop: 4, marginBottom: 4, marginLeft: 10 }]} key={m.id}>
                                            <Text>
                                                <FontAwesome name="circle" size={10} color="#000" style={{ marginRight: 5 }} /> {/* Nokta ikonu */}
                                                <Text style={[styles.exampleSentence, { lineHeight: '2px' }]}>{m.name}</Text>
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            : <></>}
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};
    return (<View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        {...panResponder.panHandlers}
    >

        <ChatItem
            key={chats[currentCardIndex].id}
            item={chats[currentCardIndex]}
            onItemLongPress={() => onItemLongPress(chats[currentCardIndex])}
            onItemPress={() => onItemPress(chats[currentCardIndex])}
            type={1}
            // selectedItems={selectedItems}
            handlePrevCard={handlePrevCard}
            handleTick={handleTick}
            handleNextCard={handleNextCard}
        />
    </View>);
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
        zIndex: 4
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
        height: 200,
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
        marginTop: 10,
        marginBottom: 10
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
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd', // veya başka bir arkaplan rengi
        borderRadius: 10,
    },
});

export default BasicReview;
