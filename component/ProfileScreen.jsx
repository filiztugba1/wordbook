import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
const ProfileScreen = ({ user, onItemLongPress }) => {
  // Örnek veriler
  const wordData = [
    { date: '2024-02-01', count: 100, correct: 80, incorrect: 20 },
    { date: '2024-02-02', count: 150, correct: 120, incorrect: 30 },
    { date: '2024-02-03', count: 200, correct: 150, incorrect: 50 },
    // ... diğer tarihler ve veriler buraya eklenebilir
  ];

  // Grafik konfigürasyonu
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
  };


 
 
  const pieData = [
    { key: 'correct', value: 80, svg: { fill: '#4CAF50' }, arc: { outerRadius: '110%', cornerRadius: 10 } },
    { key: 'incorrect', value: 20, svg: { fill: '#F44336' }, arc: { outerRadius: '100%', cornerRadius: 10 } },
  ];
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Kapak Fotoğrafı ve Profil Resmi */}
      <View>
        {/* Kapak Fotoğrafı ve Profil Değiştirme İkonu */}
        <View style={{ position: 'relative' }}>
          {/* Kapak Fotoğrafı */}
          <Image
            source={{ uri: user.backgroundImage }}
            style={{ width: '100%', height: 200 }}
          />
          {/* Profil Değiştirme İkonu */}
          <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: 'white', padding: 5, borderRadius: 20 }}>
            <Text style={{ color: 'black' }}>📷</Text>
          </TouchableOpacity>
        </View>
        
        {/* Profil Resmi */}
        <View style={{ alignItems: 'center', marginTop: -80 }}>
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 150, height: 150, borderRadius: 75 ,borderWidth: 5, borderColor: '#ebebeb'}}
          />
          <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: '33%', backgroundColor: 'white', padding: 5, borderRadius: 20 }}>
            <Text style={{ color: 'black' }}>📷</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Diğer İçerikler */}
      <View>
        {/* İsim ve Kelime Sayısı */}
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>{user.username}</Text>
          <Text style={{ color: 'gray', marginBottom: 10 }}>{user.bio}</Text>
          <Text style={{ color: 'gray' }}>Toplam Kelime Sayısı: {user.bio.split(' ').length}</Text>
        </View>

        {/* Profil Düzenleme Butonu */}
        <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#1877f2', padding: 10, borderRadius: 5, marginBottom: 20, marginHorizontal: 20 }}>
          <Text style={{ color: 'white' }}>Profil Düzenle</Text>
        </TouchableOpacity>

        {/* Grafik */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Günlük Kelime Ezberleme İstatistikleri</Text>
          <BarChart
            data={{
              labels: wordData.map(data => data.date),
              datasets: [
                {
                  data: wordData.map(data => data.count),
                },
                {
                  data: wordData.map(data => data.correct),
                },
                {
                  data: wordData.map(data => data.incorrect),
                },
              ],
            }}
            width={350}
            height={220}
            chartConfig={chartConfig}
            style={{ marginBottom: 20 }}
          />
        </View>

         {/* Yuvarlak grafikler */}
         {/* <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Günlük Kelime Ezberleme İstatistikleri</Text>
        <PieChart
          style={{ height: 200 }}
          data={pieData}
          innerRadius="45%"
          outerRadius="70%"
        />
      </View> */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
