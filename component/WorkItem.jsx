import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const WorkItem = ({ onAddItem }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [dropmodalVisible, setdropModalVisible] = useState(false);

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

  const DropdownMenu = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={() => { /* Yeni grup işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Kart Grupları</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Yeni topluluk işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Tüm Kartlar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Yeni topluluk işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Grammer Notlarım</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Yeni topluluk işlemleri... */ onClose(); }}>
          <Text style={styles.dropdownItem}>Günlük Yazılarım</Text>
        </TouchableOpacity>
      </View>
    );
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
          <Ionicons name="play" size={24} color="orange" />
          <Text style={styles.addItemText}>Alıştırma Yap</Text>
        </View>
      </TouchableOpacity>

      <DropdownMenu
        isVisible={dropmodalVisible}
        onClose={() => setdropModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
});
 

export default WorkItem;
