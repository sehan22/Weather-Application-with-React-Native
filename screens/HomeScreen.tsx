import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <StatusBar barStyle={'light-content'} />
      <Image
        blurRadius={70}
        style={{position: 'absolute', width: '100%', height: '100%'}}
        source={require('../assets/images/bg.png')}
      />

      <SafeAreaView style={{display: 'flex', flex: 1, padding: 8}}>
        {/* Search Section */}
        <View
          style={{
            height: '7%',
            marginHorizontal: '16px',
            position: 'relative',
            zIndex: 50,
            marginTop: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderRadius: 100,
              backgroundColor: showSearch
                ? 'rgba(255, 255, 255,0.2)'
                : 'transparent',
            }}>
            {showSearch ? (
              <TextInput
                placeholder="Search City"
                placeholderTextColor={'lightgray'}
                style={{
                  paddingLeft: 24,
                  height: 60,
                  flex: 1,
                  color: 'white',
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{
                backgroundColor: 'rgba(255, 255, 255,0.3)',
                borderRadius: 100,
                padding: 12,
                margin: 4,
              }}>
              <MagnifyingGlassIcon size={25} color={'white'} />
            </TouchableOpacity>
          </View>

          {locations.length > 0 && showSearch ? (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                backgroundColor: '#D1D5DB',
                marginTop: '64px',
              }}>
              {locations.map((loc, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopWidth: 0,
                      padding: '12px',
                      paddingHorizontal: '16px',
                      marginBottom: `4px`,
                      borderBottomWidth: 2,
                      borderBottomColor: '#9CA3AF',
                    }}>
                    <Text>London, United Kindom</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
