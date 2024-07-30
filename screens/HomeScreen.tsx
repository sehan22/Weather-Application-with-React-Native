import React, {useCallback, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleSearch = (value: string) => {
    console.log('value : ', value);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 120), []);

  const handleLocation = (location: any) => {
    console.log('location : ', location);
  };

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
            marginHorizontal: 4,
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
                onChangeText={handleTextDebounce}
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
                    onPress={() => {
                      handleLocation(loc);
                    }}
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderTopWidth: 0,
                      padding: 16,
                      paddingHorizontal: 16,
                      marginBottom: 4,
                      borderBottomWidth: showBorder ? 1 : 0,
                      borderBottomColor: 'rgba(0, 0, 0,0.1)',
                    }}>
                    <MapPinIcon size={20} color={'gray'} />
                    <Text style={{fontSize: 14, marginStart: 8}}>
                      London, United Kindom
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/* forecast section */}
        <View
          style={{
            marginHorizontal: 16,
            display: 'flex',
            justifyContent: 'space-around',
            flex: 1,
            marginBottom: 2,
          }}>
          {/* Location */}
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            London,
            <Text
              style={{
                color: '#E0E0E0',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 500,
              }}>
              {' '}
              United Kingdom
            </Text>
          </Text>
          {/* Weather image */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 208,
                height: 208,
                resizeMode: 'contain',
              }}
              source={require('../assets/images/partlycloudy.png')}
            />
          </View>

          {/* degree celcius */}
          <View style={{paddingVertical: 8}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: 60,
              }}>
              23&#176;
            </Text>

            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                letterSpacing: 1,
              }}>
              Partly Cloudy
            </Text>
          </View>

          {/* other stats */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}>
            {/*  */}
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <Image
                style={{
                  height: 24,
                  width: 24,
                }}
                source={require('../assets/icons/wind.png')}
              />
              <Text
                style={{color: 'white', fontWeight: 'semibold', fontSize: 16}}>
                22km
              </Text>
            </View>

            {/*  */}
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <Image
                style={{
                  height: 24,
                  width: 24,
                }}
                source={require('../assets/icons/drop.png')}
              />
              <Text
                style={{color: 'white', fontWeight: 'semibold', fontSize: 16}}>
                22%
              </Text>
            </View>

            {/*  */}
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <Image
                style={{
                  height: 24,
                  width: 24,
                }}
                source={require('../assets/icons/sun.png')}
              />
              <Text
                style={{color: 'white', fontWeight: 'semibold', fontSize: 16}}>
                6.05AM
              </Text>
            </View>
          </View>
        </View>

        {/* forecast for next days */}
        <View
          style={{
            marginBottom: 8,
            gap: 12,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              marginHorizontal: 20,
              marginTop: 20,
              gap: 8,
            }}>
            <CalendarDaysIcon size={22} color={'white'} />
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}>
              Daily Forecast
            </Text>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 15}}
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 96,
                borderRadius: 24,
                paddingVertical: 12,
                gap: 2,
                marginRight: 16,
                backgroundColor: 'rgba(255, 255, 255,0.15)',
              }}>
              <Image
                source={require('../assets/images/heavyrain.png')}
                style={{
                  width: 48,
                  height: 48,
                }}
              />
              <Text style={{color: 'white'}}>Monday</Text>
              <Text
                style={{color: 'white', fontSize: 20, fontWeight: 'semibold'}}>
                23&#176;
              </Text>
            </View>

            {/*  */}
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 96,
                borderRadius: 24,
                paddingVertical: 12,
                gap: 2,
                marginRight: 16,
                backgroundColor: 'rgba(255, 255, 255,0.15)',
              }}>
              <Image
                source={require('../assets/images/heavyrain.png')}
                style={{
                  width: 48,
                  height: 48,
                }}
              />
              <Text style={{color: 'white'}}>Monday</Text>
              <Text
                style={{color: 'white', fontSize: 20, fontWeight: 'semibold'}}>
                23&#176;
              </Text>
            </View>

            {/*  */}
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 96,
                borderRadius: 24,
                paddingVertical: 12,
                gap: 2,
                marginRight: 16,
                backgroundColor: 'rgba(255, 255, 255,0.15)',
              }}>
              <Image
                source={require('../assets/images/heavyrain.png')}
                style={{
                  width: 48,
                  height: 48,
                }}
              />
              <Text style={{color: 'white'}}>Monday</Text>
              <Text
                style={{color: 'white', fontSize: 20, fontWeight: 'semibold'}}>
                23&#176;
              </Text>
            </View>

            {/*  */}
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 96,
                borderRadius: 24,
                paddingVertical: 12,
                gap: 2,
                marginRight: 16,
                backgroundColor: 'rgba(255, 255, 255,0.15)',
              }}>
              <Image
                source={require('../assets/images/heavyrain.png')}
                style={{
                  width: 48,
                  height: 48,
                }}
              />
              <Text style={{color: 'white'}}>Monday</Text>
              <Text
                style={{color: 'white', fontSize: 20, fontWeight: 'semibold'}}>
                23&#176;
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
