import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // FontAwesome ikonları için

const DailyScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState('');
  const [dailyLogs, setDailyLogs] = useState([
    { date: '2024-02-01', log: "Bugün harika bir gün geçirdim! Birkaç arkadaşımla buluştum ve güzel vakit geçirdik.Bugün harika bir gün geçirdim! Birkaç arkadaşımla buluştum ve güzel vakit geçirdik.Bugün harika bir gün geçirdim! Birkaç arkadaşımla buluştum ve güzel vakit geçirdik.Bugün harika bir gün geçirdim! Birkaç arkadaşımla buluştum ve güzel vakit geçirdik.Bugün harika bir gün geçirdim! Birkaç arkadaşımla buluştum ve güzel vakit geçirdik.Bugün harika bir gün geçirdim! Birkaç arkadaşımla buluştum ve güzel vakit geçirdik." },
    { date: '2024-02-02', log: "Ders çalıştım ve birkaç kitap okudum. Akşam yemeği için favori restoranıma gittim." },
    { date: '2024-02-03', log: "Yürüyüş yaptım ve doğayla vakit geçirdim. Akşam film izledim ve dinlendim." }
  ]);
  const [newLog, setNewLog] = useState('');

  const addLog = () => {
    if (newLog.trim() !== '') {
      setDailyLogs([...dailyLogs, { date: new Date().toISOString().slice(0, 10), log: newLog }]);
      setNewLog('');
      setShowModal(false);
    }
  };

  const updateLog = () => {
    // Günlük güncelleme işlemleri burada yapılacak
    console.log('Günlük güncellendi:', selectedLog);
    // Modalı kapat
    setShowModal(false);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ alignItems: 'center', backgroundColor: '#1877f2', padding: 10, borderRadius: 5, marginBottom: 20 }}>
          <View><Text style={{ color: 'white' }}>Günlük Ekle</Text></View>
        </TouchableOpacity>

        {dailyLogs.map((log, index) => (
          <TouchableOpacity key={index} onPress={() => { setSelectedLog(log.log); setShowModal(true); }} style={{ marginBottom: 20, backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
            <View>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{log.date}</Text>
              <Text numberOfLines={3} ellipsizeMode="tail">{log.log.substring(0, 100)}...</Text>
              <FontAwesome name="angle-right" size={24} color="black" style={{ position: 'absolute', top: 10, right: 10 }} />
            </View>
          </TouchableOpacity>
        ))}

        <Modal visible={showModal} animationType="slide" transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '80%', minHeight: '80%' }}>
                <TextInput
                  placeholder="Günlük yazınız..."
                  multiline
                  value={selectedLog}
                  onChangeText={setSelectedLog}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, minHeight: '90%' }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button title="İptal" onPress={() => setShowModal(false)} color="red" />
                  <Button title="Kaydet" onPress={updateLog} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default DailyScreen;
