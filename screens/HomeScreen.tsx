import React, {useCallback, useEffect, useState} from 'react';
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
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import {weatherImages} from '../constants';
import * as Progress from 'react-native-progress';
import {getData, storeData} from '../utils/asyncStorage';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSearch = (value: string) => {
    //Fetch Location
    if (value.length > 2) {
      fetchLocations({cityName: value})
        .then((data: any) => {
          setLocations(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const handleLocation = (location: any) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: location.name,
      days: '8',
    })
      .then(data => {
        setWeatherForecast(data);
        setLoading(false);
        storeData('city', location.name);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Islamabad';

    if (myCity) cityName = myCity;

    fetchWeatherForecast({
      cityName: 'New York',
      days: '8',
    })
      .then(weatherData => {
        setWeatherForecast(weatherData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const {current, location}: any = weatherForecast;

  return (
    <View style={{display: 'flex', flex: 1, position: 'relative'}}>
      <StatusBar barStyle={'light-content'} />
      <Image
        blurRadius={70}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        source={require('../assets/images/bg.jpg')}
      />

      {loading ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Progress.CircleSnail thickness={10} size={140} color={'#FFFFFF'} />
        </View>
      ) : (
        <SafeAreaView style={{display: 'flex', flex: 1}}>
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
                  position: 'absolute',
                  width: '100%',
                  backgroundColor: '#D1D5DB',
                  marginTop: 64,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}>
                {locations.map((loc: any, index) => {
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
                        {loc?.name}, {loc?.country}
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
              justifyContent: 'space-evenly',
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
              {location?.name},
              <Text
                style={{
                  color: '#E0E0E0',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 500,
                }}>
                {' '}
                {location?.country}
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
                //@ts-ignore
                source={weatherImages[current?.condition?.text]}
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
                {current?.temp_c}&#176;
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 16,
                  letterSpacing: 1,
                }}>
                {current?.condition.text}
              </Text>
            </View>

            {/* other stats */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 16,
              }}>
              {/*  */}
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
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
                  style={{
                    color: 'white',
                    fontWeight: 'semibold',
                    fontSize: 16,
                  }}>
                  {current?.wind_kph}km
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
                  style={{
                    color: 'white',
                    fontWeight: 'semibold',
                    fontSize: 16,
                  }}>
                  {current?.humidity}%
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
                  style={{
                    color: 'white',
                    fontWeight: 'semibold',
                    fontSize: 16,
                  }}>
                  {
                    //@ts-ignore
                    weatherForecast?.forecast.forecastday[0]?.astro?.sunrise
                  }
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
              {
                //@ts-ignore
                weatherForecast?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date);
                  let options = {weekday: 'long'};
                  //@ts-ignore
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName = dayName.split(',')[0];

                  return index !== 0 ? (
                    <View
                      key={index}
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
                        //@ts-ignore
                        source={weatherImages[item?.day?.condition?.text]}
                        style={{
                          width: 48,
                          height: 48,
                        }}
                      />
                      <Text style={{color: 'white'}}>{dayName}</Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'semibold',
                        }}>
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {item?.day?.condition?.text}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  );
                })
              }
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
