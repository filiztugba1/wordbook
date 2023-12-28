// AddItem.js

import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
const ExcelAddItem = ({ onAddItem }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleAddItem = () => {
        // Burada yeni bir öğe eklemek için gerekli işlemleri gerçekleştirebilirsiniz.
        // Örneğin, bir form gösterip kullanıcının girdiği bilgilerle yeni bir öğe oluşturabilirsiniz.

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

        // İşlem tamamlandığında modal'ı kapat
        setModalVisible(false);
    };

    return (
        <TouchableOpacity
            style={styles.addItemButton}
            onPress={() => setModalVisible(true)}
        >
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    {/* Yeni öğe eklemek için bir form veya bilgi girişi alanları ekleyebilirsiniz. */}
                    <Text style={styles.modalTitle}>Excel ile Kelime Ekle</Text>
                    {/* ... (yeni öğe ekleme formu) */}
                    <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                        <Text style={styles.addButtonText}>Ekle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <FontAwesome name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </Modal>
            <Ionicons name="file-tray-full" size={24} color="blue" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // ... (diğer stiller)

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
});

export default ExcelAddItem;
