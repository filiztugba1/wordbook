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
const MatchCartScreen = ({ onItemLongPress, onItemPress, isMultiSelectMode, selectedItems, type = 0 }) => {
    

    

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
  
    return (   <ScrollView
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
      </ScrollView> );
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

export default MatchCartScreen;
