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

const speak = (text) => {
    Speech.speak(text);
};

const MultipleAnswer = ({ item, onItemLongPress, onItemPress, selectedItems = null, type = 0, handlePrevCard = null, handleTick = null, handleNextCard = null, chats = null }) => {
    const adverbs = item.means.filter(x => x.type === 'zf.');
    const nouns = item.means.filter(x => x.type === 'i.');
    const adjectives = item.means.filter(x => x.type === 's.');
    const pronouns = item.means.filter(x => x.type === 'zm.');
    const verbs = item.means.filter(x => x.type === 'f.');

    // Rasgele seçilen bir kelimenin Türkçe anlamını bulma fonksiyonu
    const getRandomMeaning = () => {
        const randomIndex = Math.floor(Math.random() * chats.length);
        if (chats[randomIndex].en === item.en) {
            getRandomMeaning();
        }
        return chats[randomIndex].means.map(mean => mean.mean).join(', '); // Burada sadece ilk anlamı alıyoruz, dilerseniz farklı bir anlamı da seçebilirsiniz.
    };

    // Rasgele şıkları oluşturma
    const generateRandomOptions = () => {
        const correctMeaning = item.means.map(mean => mean.mean).join(', '); // Doğru cevap
        const min = 0;
        const max = 5; // Bu değer max değerine dahil olmayacak, yani 4'e kadar olan sayıları içerecek.

        const randomNumber = Math.floor(Math.random() * (max - min) + min);

        const options = [
            { option: 'A', meaning: randomNumber == 0 ? correctMeaning : getRandomMeaning() }, // Doğru cevap
            { option: 'B', meaning: randomNumber == 1 ? correctMeaning : getRandomMeaning() }, // Rasgele seçilen bir anlam
            { option: 'C', meaning: randomNumber == 2 ? correctMeaning : getRandomMeaning() }, // Rasgele seçilen bir anlam
            { option: 'D', meaning: randomNumber == 3 ? correctMeaning : getRandomMeaning() }, // Rasgele seçilen bir anlam
            { option: 'E', meaning: randomNumber == 4 ? correctMeaning : getRandomMeaning() }, // Rasgele seçilen bir anlam
            // Daha fazla şık ekleyebilirsiniz
        ];

        // Şıkları karıştırma
        return options;
    };

    const randomOptions = generateRandomOptions();

    return (
        <>
            <View
                style={[
                    styles.listItem,
                    {
                        marginVertical: 5,
                        marginHorizontal: 10,
                        backgroundColor: selectedItems != null && selectedItems.includes(item.id) ? '#ddd' : '#fff',
                        width: '95%'
                    },
                ]}
            >
                {type === 1 ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
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
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                left: 0,
                                right: 0,
                                zIndex: 2,
                                borderColor: '#e0e0e0',
                                backgroundColor: 'green',
                                borderWidth: 1,
                                padding: 5,
                                borderRadius: 5,
                                color: 'white'
                            }}>
                                <Icon name="check" size={25} color="white" />
                                <Text size={30} color="green" />Öğrendim<Text />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleNextCard}>
                            <Icon name="caret-right" size={30} color="gray" />
                        </TouchableOpacity>
                    </View>
                ) : ''}
                {item.image != '' ? <Image source={{ uri: item.image }} style={styles.avatar} /> :
                    <View style={styles.avatar}>
                        <View style={styles.imagePlaceholder}>
                            <Icon name="image" size={50} color="#888" />
                            <Text>Resim Yok</Text>
                        </View>
                    </View>}
                {type === 1 ? (
                    <View style={styles.wordCard}>
                        <>
                            <View style={styles.wordDetails}>
                                <Text style={[styles.wordText, { fontSize: 25 }]}>{item.en}</Text>
                            </View>
                            <Ionicons name="volume-high" size={24} color="#888" style={styles.soundIcon} onPress={() => speak(item.en)} /> </>
                    </View>
                ) : ''}

                <View style={styles.listItemContent}>

                    <View style={styles.chatInfo}>
                        {type === 0 ? <View style={styles.wordCard}>
                            <>
                                <View style={styles.wordDetails}>
                                    <Text style={styles.wordText}>{item.en}</Text>
                                </View>
                                <Ionicons name="volume-high" size={24} color="#888" style={styles.soundIcon} onPress={() => speak(item.en)} /> </>
                        </View> : ''}
                        <View style={[styles.wordCard, { marginTop: 4, textAlign: "center" }]}>
                            <View >
                                <Text style={{ textAlign: "left", marginTop: 4, marginBottom: 4, marginLeft: 10 }}>Anlamı aşağıdakilerden hangisidir</Text>
                            </View>
                        </View>
                    </View>

                </View>
                {randomOptions.map((option, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                        <Text style={{ marginRight: 8, fontWeight: 'bold' }}>{option.option}:</Text>
                        <Text>{option.meaning}</Text>
                    </View>
                ))}
            </View>
        </>
    );
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
const handleAddItem = (newItem) => {
    // Yeni öğeyi mevcut listeye ekleyin
    setChats((prevChats) => [...prevChats, newItem]);
};


const MatchCarts = ({ cards, onGameComplete }) => {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [shuffledCardstr, setShuffledCardstr] = useState([]);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [isMatched, setIsMatched] = useState(Array(cards.length).fill(false));
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    // Kartları karıştır
    const shuffled = shuffleArray(cards);
    setShuffledCards(shuffled);
    const shuffledtr = shuffleArray(cards);
    setShuffledCardstr(shuffledtr);
    // Eşleşme durumlarını sıfırla
    setSelectedCardIndices([]);
    setIsMatched(Array(shuffled.length).fill(false));
  }, [cards]);
  

  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (card) => {
    if (!isMatched[card]) {
        selectedCardIndices[0]=card;
        console.log(selectedCardIndices);

      setSelectedCardIndices([...selectedCardIndices]);

      if(selectedCardIndices[1]!==undefined)
      {
        selectReset();
      }
    }
    setTimeout(() => {
        newCarts();
      }, 1000);
    
  };

  const handleCardClickTr = (card) => {
    if (!isMatched[card]) {
        selectedCardIndices[1]=card;
        console.log(selectedCardIndices);
        setSelectedCardIndices([...selectedCardIndices]);
        if(selectedCardIndices[0]!==undefined)
        {
                selectReset();
        }
    }

    setTimeout(() => {
        newCarts();
      }, 1000);
  };

  const newCarts=()=>{
    if(shuffledCards.filter(x=>x.status===true).length===shuffledCards.length)
    {
        // Kartları karıştır
        for(let i=0;i<cards.length;i++)
        {
            cards[i].status=null;
        }
        const shuffled = shuffleArray(cards);
        setShuffledCards(shuffled);
        const shuffledtr = shuffleArray(cards);
        setShuffledCardstr(shuffledtr);
        // Eşleşme durumlarını sıfırla
        setSelectedCardIndices([]);
        setIsMatched(Array(shuffled.length).fill(false));
        
    console.log('shuffledCards',shuffledCards);
    }
        
  }

  const selectReset=()=>{
    setBlink(true);
    setTimeout(() => {
        if (selectedCardIndices.length === 2) {
            // Eğer iki kart seçili ise kontrol et ve sıfırla
            
             const [index1, index2] = selectedCardIndices;
             console.log(index1);
             console.log(index2);
            if (index1=== index2) {
              let idx1=shuffledCards.findIndex(k=>k===index1);
              shuffledCards[idx1].status=true;
              setShuffledCards(shuffledCards);
              let idx2=shuffledCardstr.findIndex(k=>k===index1);
              shuffledCardstr[idx2].status=true;
              setShuffledCardstr(shuffledCardstr);
              // Eğer seçilen kartlar aynı çiftin kartları ise işlemleri yap
            }
            else{
                let idx1=shuffledCards.findIndex(k=>k===index1);
                shuffledCards[idx1].status=false;
                setShuffledCards(shuffledCards);
                let idx2=shuffledCardstr.findIndex(k=>k===index1);
                shuffledCardstr[idx2].status=false;
                setShuffledCardstr(shuffledCardstr);
                // Eğer seçilen kartlar aynı çiftin kartları ise işlemleri yap
            }
            console.log(shuffledCardstr);
            setSelectedCardIndices([]);
      
          //   if(shuffled!==undefined && shuffled.filter(x=>x.status===true).length===shuffled.length)
          //   {
          //     for(let i=0;i<shuffled.length;i++)
          //     {
          //         shuffled[i].status=false;
          //     }
          //     setShuffledCards(shuffled);
      
          //     for(let i=0;i<shuffledtr.length;i++)
          //     {
          //         shuffledtr[i].status=false;
          //     }
          //     setShuffledCardstr(shuffledtr);
      
          //   }
      
      
          }
           setBlink(false);
      }, 1000);
    
  }


 

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
    {/* Sol taraftaki kartlar (shuffledCards) */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {shuffledCards.map((card, index) => (
        <div
          key={index}
          className={`card ${isMatched[index] ? 'matched' : ''} ${blink && card.status === false ? 'blink-red' : ''}`}
          style={{
            width: '120px',
            height: '50px',
            border: `1px solid ${selectedCardIndices[0]===card ? '#ababab' : '#ddd'}`, // Seçili kartın sınır rengini değiştir
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom:4,
            cursor: isMatched[index] ? 'not-allowed' : 'pointer',
            backgroundColor: isMatched[index] ? '#aaffaa' : '#fff',
          }}
          onClick={() => handleCardClick(card)}
        >
          <div style={{ textAlign: 'center' }}>{card.status===true ? '✔️' : card.en }</div>
        </div>
      ))}
    </div>
  
    {/* Sağ taraftaki kartlar (shuffledCardstr) */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {shuffledCardstr.map((card, index) => (
        <div
          key={index}
          style={{
            width: '120px',
            height: '50px',
            border: `1px solid ${selectedCardIndices[1]===card ? '#ababab' : '#ddd'}`, // Seçili kartın sınır rengini değiştir
            marginLeft: '5px', // Boşluk eklemek için
            padding: '10px',
            display: 'flex',
            marginBottom:4,
            justifyContent: 'center',
            alignItems: 'center',
            cursor: isMatched[index] ? 'not-allowed' : 'pointer',
            backgroundColor: isMatched[index] ? '#aaffaa' : '#fff',
          }}
          onClick={() => handleCardClickTr(card)}
        >
          <div style={{ textAlign: 'center' }}>{card.status===true ? '✔️' : card.means[0].mean}</div>
        </div>
      ))}
    </div>
  </div>
  
  
  
  

  );
  
};



  
  
const ChatsScreen = ({ onItemLongPress, onItemPress, isMultiSelectMode, selectedItems, type = 0 }) => {

    const [dropmodalVisible, setdropModalVisible] = useState(false);
    const DropdownMenu = ({ isVisible, onClose }) => {
        if (!isVisible) return null;

        return (
            <View style={styles.dropdownContainer}>
                <>
                    <TouchableOpacity onPress={() => handleModalVisible(3)}>
                        <Text style={styles.dropdownItem}>Basic Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleModalVisible(4)}>
                        <Text style={styles.dropdownItem}>Multiple Answers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleModalVisible(5)}>
                        <Text style={styles.dropdownItem}>Match Carts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClose()}>
                        <Text style={styles.dropdownItem}>Writing Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClose()}>
                        <Text style={styles.dropdownItem}>Audio Player</Text>
                    </TouchableOpacity>
                </>
            </View>
        );
    };

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

    const handleModalVisible = (type) => {
        handleDropModalVisible();
        setModalVisible(true);
        setisPageType(type)
    };


    const handleDropModalVisible = () => {
        setdropModalVisible(!dropmodalVisible);
    };


    const WorkItem = ({ onAddItem }) => {
        return (
            <>
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
    return (
        <View style={styles.container}>
            <DropdownMenu
                isVisible={dropmodalVisible}
                onClose={() => setdropModalVisible(false)}
            />



            <View style={styles.addItemContainer}>
                {isPageType === 0 ?
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
                        <View style={{ zIndex: 10 }}>
                            <WorkItem onAddItem={handleAddItem} />
                        </View>

                    </> : <></>}

                {isPageType === 1 ?
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
                    </> : <></>}

                {isPageType === 2 ?
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
                    </> : <></>}

                {isPageType === 3 || isPageType === 4 || isPageType === 5 ?
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
                            onPress={() => setisPageType(1)}
                        >
                            <View style={styles.buttonContent}>
                                <Text>
                                    <Ionicons name="add" size={24} color="green" />
                                    <Text style={styles.addItemText}>Yeni Kart Ekle</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </> : <></>}


            </View>
            {isPageType === 1 ? <AddItemFormComponent /> : <></>}
            {isPageType === 2 ? <AddGroupFormComponent /> : <></>}
            {isPageType === 0 ? <FlatList
                data={chats}
                renderItem={({ item }) => (
                    <ChatItem
                        key={item.id}
                        item={item}
                        onItemLongPress={() => onItemLongPress(item.id)}
                        onItemPress={() => onItemPress(item.id)}
                        selectedItems={selectedItems}
                        type={0}
                    />
                )}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            /> : <></>}

            {isPageType === 3 ? <View
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
            </View> : ''}

            {isPageType === 4 ? <ScrollView
                style={{
                    flex: 1,
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                {...panResponder.panHandlers}
            >
                {/* Diğer içerikler buraya gelecek */}
                <MultipleAnswer
                    key={chats[currentCardIndex].id}
                    item={chats[currentCardIndex]}
                    onItemLongPress={() => onItemLongPress(chats[currentCardIndex])}
                    onItemPress={() => onItemPress(chats[currentCardIndex])}
                    type={1}
                    handlePrevCard={handlePrevCard}
                    handleTick={handleTick}
                    handleNextCard={handleNextCard}
                    chats={chats}
                />

                {/* İlk tablo */}
                <table style={{ borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                        {Array.from({ length: Math.ceil(chats.length / 10) }, (_, groupIndex) => (
                            <tr key={groupIndex}>
                                {chats.slice(groupIndex * 10, (groupIndex + 1) * 10).map((option, index) => (
                                    <td key={index}>
                                        <div style={{
                                            width: '25px',
                                            height: '25px',
                                            border: index + groupIndex * 10 === currentCardIndex ? '1px solid #000' : '1px solid #ddd',
                                            padding: '8px',
                                            background: 'white',
                                            boxSizing: 'border-box',
                                        }}>
                                            {/* İçeriği buraya ekleyin */}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>


            </ScrollView> : ''}
            {isPageType === 5?
             <ScrollView
             style={{
                 flex: 1,
             }}
             contentContainerStyle={{
                 justifyContent: 'center',
                 alignItems: 'center',
             }}
             {...panResponder.panHandlers}
         >
                 <MatchCarts cards={chats} onGameComplete={handleGameComplete} />
             {/* {!gameCompleted ? (
              
             ) : (
               <p>Congratulations! You completed the game.</p>
             )} */}
           </ScrollView>
            :<></>}

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

export default ChatsScreen;
