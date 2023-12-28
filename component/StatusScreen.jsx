import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Image, Modal } from 'react-native';
import { useSwipeable } from 'react-swipeable';
const durumlar = [
    {
        id: '1', name: 'John Doe', durumlar: [
            { durum: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg', time: '14:45', isDurum: true },
            { durum: 'https://tr.web.img4.acsta.net/r_1280_720/img/34/df/34df55e5bbf5bb4b25434cc7e4034cb1.jpg', time: '14:45', isDurum: false }

        ], time: '15:30', avatar: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },
    {
        id: '2', name: 'John Doe 2', durumlar: [
            { durum: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg', time: '14:45', isDurum: false },
            { durum: 'https://tr.web.img4.acsta.net/r_1280_720/img/34/df/34df55e5bbf5bb4b25434cc7e4034cb1.jpg', time: '14:45', isDurum: false }

        ], time: '15:30', avatar: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },
    {
        id: '2', name: 'John Doe 2', durumlar: [
            { durum: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg', time: '14:45', isDurum: true },
            { durum: 'https://tr.web.img4.acsta.net/r_1280_720/img/34/df/34df55e5bbf5bb4b25434cc7e4034cb1.jpg', time: '14:45', isDurum: true }

        ], time: '15:30', avatar: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg'
    },
];



const ChatItem = ({ item, onItemLongPress, onItemPress, selectedItems,showImages }) => (
    <TouchableOpacity style={[styles.listItem, {
        backgroundColor: selectedItems.includes(item.id) ? '#ddd' : 'transparent',

    }]} onLongPress={() => onItemLongPress(item.id)}
        onPress={() => showImages(item.durumlar)} >
        <Image source={{ uri: item.avatar }} style={[styles.avatar, {
            borderRadius: "100%",
            border: item.durumlar.length !== 0 && item.durumlar.filter(k => k.isDurum === false).length !== 0 ? '3px solid #47b900' : '0px solid #47b900'
        }]} />
        <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
                <Text style={styles.listItemText}>{item.name}</Text>

            </View>
            <Text style={styles.listItemMessage}>{item.time}</Text>
        </View>
    </TouchableOpacity>
);


const StatusModal = ({ isVisible, onClose, images }) => {
    console.log(images);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        console.log(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    const handlers = useSwipeable({
      onSwipedLeft: () => nextImage(),
      onSwipedRight: () => prevImage(),
      preventDefaultTouchmoveEvent: true,
      trackMouse: true // Bu, fareyle de kaydırma yapabilmek için. Mobilde bu özelliği kapatmak isteyebilirsiniz.
    });

    console.log(images[0]==undefined?'':images[0].durum);
    return (
        <Modal
        
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
            style={{ flex: 1, backgroundColor: 'black' }}
        >
             <div {...handlers} style={{ maxWidth: '100%', overflow: 'hidden' }}>
             <img src={images[currentImageIndex]?.durum || ''} alt="Slider" style={{ width: '100%', height: 'auto' }} />
            </div>
            {/* <FlatList
                data={images}
                renderItem={({ item }) => (
                    // <Image source={{ uri: item.durum }} style={{ width: '100%', height: 'auto'  }}  />
                    <img src={item.durum==undefined?'':images[0].durum} alt="Slider" style={{ width: '100%' }} />
                )}
                horizontal={true}
                pagingEnabled={true}
                keyExtractor={(item, index) => 'key_' + index}
                contentContainerStyle={{ flex: 1 }}
            /> */}
            <TouchableOpacity style={{ position: 'absolute', top: 50, left: 20 }} onPress={onClose}>
                <Text style={{ color: 'white', fontSize: 30 }}>X</Text>
            </TouchableOpacity>
        </Modal>
    );
};

const StatusScreen = ({ onItemLongPress, onItemPress, isMultiSelectMode, selectedItems }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);

    const showImages = (images) => {
        setCurrentImages(images);
        setModalVisible(true);
    };
  

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={durumlar}
                renderItem={({ item }) => (
                 
                <ChatItem
                    item={item}
                    onItemLongPress={() => onItemLongPress(item.id)}
                    onItemPress={() => onItemPress(item.id)}
                    selectedItems={selectedItems}
                    showImages={showImages}
                />
                )}
                keyExtractor={item => item.id}
                style={styles.container}
            />
            <StatusModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                images={currentImages}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },

    listItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    listItemText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    listItemMessage: {
        fontSize: 14,
        color: '#888'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    chatInfo: {
        flex: 1
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    time: {
        fontSize: 12,
        color: '#888'
    }
});


export default StatusScreen;
