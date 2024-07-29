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
import {MapPinIcon} from 'react-native-heroicons/solid';

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
                ? 'rgba(255, 255, 255, 0.2)'
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
                position: 'relative',
                width: '100%',
                backgroundColor: '#D1D5DB',
                marginTop: 8,
                borderRadius: 20,
                overflow: 'hidden',
              }}>
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderTopWidth: 0,
                      padding: 10,
                      paddingHorizontal: 16,
                      marginBottom: 4,
                      borderBottomWidth: showBorder ? 1 : 0,
                      borderBottomColor: 'rgba(0, 0, 0,0.1)',
                    }}>
                    <MapPinIcon size={20} color={'gray'} />
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