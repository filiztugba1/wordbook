import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './component/LoginScreen';
import WordBook from './component/WordBook';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kullanıcının oturumunu açan fonksiyon
  const handleLogin = () => {
    // Kullanıcının oturumunu açma işlemleri burada gerçekleştirilir
    // Örneğin, kimlik doğrulama, kullanıcı bilgilerini kontrol etme vb.

    // Oturum başarılı ise isAuthenticated değerini true yap
    setIsAuthenticated(true);
  };

  // Kullanıcının oturumunu kapatan fonksiyon
  const handleLogout = () => {
    // Kullanıcının oturumunu kapatma işlemleri burada gerçekleştirilir
    // Örneğin, oturum bilgilerini temizleme, kullanıcıyı çıkış sayfasına yönlendirme vb.

    // Oturum kapatma işlemi yapıldıktan sonra isAuthenticated değerini false yap
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (<WordBook/>):

            (<Stack.Navigator headerMode="none">
            {/* isAuthenticated durumuna göre ilgili ekranı göster */}
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
            
          </Stack.Navigator>)
      }

    </NavigationContainer>
  );
}
