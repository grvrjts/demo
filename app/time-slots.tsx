import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TimeSlots() {
  const cities = ['Select city', 'Noida', 'Gurugram', 'Kolkata'];
  const dcs = ['Select DC', 'NOIDA-STP', 'GURUGRAM-DC1', 'BBSR-STP2'];
  
  const [selectedDate, setSelectedDate] = useState('Mon 11 May');
  const [selectedCity, setSelectedCity] = useState(cities[1]); // Default to Noida
  const [selectedDC, setSelectedDC] = useState(dcs[1]); // Default to NOIDA-STP
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDCDropdown, setShowDCDropdown] = useState(false);

  // Updated Booking Data with full year
  const bookings = [
    
    {
      id: '2',
      date: '17-Sep-2026', // Fixed the year issue
      cubicle: 'NOSTP 02 16 A 051',
      location: 'Noida, NOSTP, BHUT01, FLOOR-16, A',
      time: '08:00AM - 02:00PM', 
    }

  ];

  const DateCard = ({ day, date }: { day: string, date: string }) => {
    const isSelected = selectedDate === `${day} ${date}`;
    return (
      <TouchableOpacity 
        style={[styles.dateCard, isSelected && styles.selectedDateCard]} 
        onPress={() => setSelectedDate(`${day} ${date}`)}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedText]}>{day}</Text>
        <Text style={[styles.dateText, isSelected && styles.selectedText]}>{date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content} 
        keyboardShouldPersistTaps="handled"
      >
        
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            <TouchableOpacity onPress={() => router.push('/book-seat')}>
              <Text style={styles.linkText}>Click Here</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>     to view the cities/DCs where only full-day seat booking is enabled.</Text>
          </Text>
        </View>

        {/* Booking Updates Section */}
        <Text style={[styles.label, { color: '#000', fontSize: 16, fontWeight: 'bold' }]}>Booking Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookingScroll}>
          {bookings.map((item) => (
            <View key={item.id} style={styles.updateCard}>
              <View style={styles.updateHeader}>
                {/* Fixed truncation by allowing flexible width */}
                <Text style={styles.updateDate} numberOfLines={1}>{item.date}</Text>
                <View style={styles.bookedBadge}>
                  <Text style={styles.bookedBadgeText}>Booked</Text>
                </View>
              </View>
              <Text style={styles.updateCubicle}>{item.cubicle}</Text>
              <Text style={styles.updateLocation}>{item.location}</Text>
              <Text style={styles.updateTime}>{item.time}</Text>
              <TouchableOpacity>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Date Section */}
        <Text style={styles.label}>Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScrollContainer}>
            {/* <DateCard day="Mon" date="11 May" />
            <DateCard day="Tue" date="12 May" />
            <DateCard day="Wed" date="13 May" /> */}
        </ScrollView>

        {/* City Section */}
        <Text style={styles.label}>City</Text>
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowCityDropdown(!showCityDropdown)}>
            <Text style={styles.dropdownText}>{selectedCity}</Text>
            <MaterialCommunityIcons name="menu-down" size={24} color="#999" />
          </TouchableOpacity>
          {showCityDropdown && (
            <View style={styles.dropdownOptions}>
              {cities.map((city) => (
                <TouchableOpacity key={city} style={styles.optionItem} onPress={() => { setSelectedCity(city); setShowCityDropdown(false); }}>
                  <Text style={styles.optionText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Development Center Section */}
        <Text style={styles.label}>Development Center</Text>
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowDCDropdown(!showDCDropdown)}>
            <Text style={styles.dropdownText}>{selectedDC}</Text>
            <MaterialCommunityIcons name="menu-down" size={24} color="#999" />
          </TouchableOpacity>
          {showDCDropdown && (
            <View style={styles.dropdownOptions}>
              {dcs.map((dc) => (
                <TouchableOpacity key={dc} style={styles.optionItem} onPress={() => { setSelectedDC(dc); setShowDCDropdown(false); }}>
                  <Text style={styles.optionText}>{dc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.grayBtn}>
        <Text style={styles.btnText}>Get System Allocated Seat</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  content: { padding: 15 },
  infoBanner: { backgroundColor: '#E3F2FD', padding: 15, borderRadius: 8, marginBottom: 25, elevation:3 },
  infoText: { fontSize: 13, color: '#333', fontWeight: 'bold' },
  linkText: { color: '#6A1B9A', fontWeight: 'bold', textDecorationLine: 'underline' },
  label: { fontSize: 13, color: '#666', marginBottom: 10, marginTop: 15 },
  
  bookingScroll: { marginBottom: 20 },
  updateCard: {
    backgroundColor: '#fff', borderRadius: 10, padding: 15, width: 280, marginRight: 15,
    borderWidth: 1, borderColor: '#eee', elevation: 2
  },
  updateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, minWidth: 0 },
  updateDate: { fontSize: 13, color: '#666', flex: 1, minWidth: 0, marginRight: 5 }, // allow text to shrink and use available row width
  bookedBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  bookedBadgeText: { color: '#4CAF50', fontSize: 11, fontWeight: 'bold' },
  updateCubicle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  updateLocation: { fontSize: 12, color: '#666', marginBottom: 4 },
  updateTime: { fontSize: 12, color: '#333', marginBottom: 15 },
  cancelText: { color: '#6A1B9A', fontWeight: 'bold', fontSize: 14 },

  dateScrollContainer: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 5, gap: 12 },
  dateCard: {
    width: 80, height: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#fff', marginRight: 8, elevation: 5
  },
  selectedDateCard: { backgroundColor: '#F3E5F5', borderColor: '#6A1B9A', borderWidth: 2 },
  dayText: { fontSize: 12, color: '#444' },
  dateText: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  selectedText: { color: '#6A1B9A' },

  dropdownWrapper: { zIndex: 1000, marginBottom: 10 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 },
  dropdownText: { fontSize: 16, color: '#333' },
  dropdownOptions: { position: 'absolute', top: 45, left: 0, right: 0, backgroundColor: '#fff', borderRadius: 4, elevation: 8, zIndex: 2000 },
  optionItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  optionText: { fontSize: 16, color: '#333' },

  grayBtn: { backgroundColor: '#888', padding: 16, borderRadius: 10, alignItems: 'center', margin: 15 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});