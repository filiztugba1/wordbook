import React, { useState,useEffect  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './component/LoginScreen';
import SignUpScreen from './component/SignUpScreen';
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
    localStorage.removeItem('AccessToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      let accesstoken=localStorage.getItem('AccessToken');
      if(accesstoken!==undefined && accesstoken!=='' && accesstoken!==null)
      {
        setIsAuthenticated(true);
      }
    };

    fetchData(); // API isteğini gönder
  }, []); // Boş bağımlılık dizisi, sadece bileşen yüklendiğinde çalışmasını sağlar

  return (
    <NavigationContainer>
      {isAuthenticated ? (<WordBook onLogout={handleLogout} />):

            (<Stack.Navigator headerMode="none">
            {/* isAuthenticated durumuna göre ilgili ekranı göster */}
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen name="SignUp">
                {(props) => <SignUpScreen />}
              </Stack.Screen>
            
          </Stack.Navigator>)
      }

    </NavigationContainer>
  );
}
