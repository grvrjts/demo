import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BookSeat() {
  // Data Arrays
  const dates = [ '20-May-2026', '21-May-2026', '22-May-2026' ];
  const cities = ['BHUBANESWAR', 'Bangalore','CALGARY','COIMBATORE','Chennai','Guwahati','Hartford','Hyderabad','Indianapolis','Indore','Jaipur','Kolkata','Lodz','MELBOURNE','Mangalore','Pune','SINGAPORE','Schiphol-Rijk','TEMPE', 'TRIVANDRUM','Noida', 'Gurugram'];
  const dcs = ['BBSR-STP2', 'BBSR-SEZ1'];
  const buildings = ['B05', 'B06', 'B07', 'B03', 'B11'];
  const floors = ['GROUND', 'FLOOR-1'];
  const wings = ['A'];

  // Selection States
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedDC, setSelectedDC] = useState(dcs[0]);
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const [selectedFloor, setSelectedFloor] = useState(floors[0]);
  const [selectedWing, setSelectedWing] = useState(wings[0]);

  const [allocation, setAllocation] = useState('general');
  const [checked, setChecked] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const SelectBox = ({ label, value, options, onSelect, isOpen, name, flex }: any) => (
    <View style={[{ zIndex: isOpen ? 2000 : 1, marginBottom: 12 }, flex && { flex: 1 }]}>
      <Text style={styles.labelSmall}>{label}</Text>
      <TouchableOpacity 
        style={styles.inputUnderline} 
        onPress={() => toggleDropdown(name)}
      >
        <Text style={styles.inputText}>{value}</Text>
        <MaterialCommunityIcons 
          name={isOpen ? "menu-up" : "menu-down"} 
          size={22} 
          color="#888" 
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownOptions}>
          {options.map((item: string) => (
            <TouchableOpacity 
              key={item} 
              style={styles.optionItem}
              onPress={() => {
                onSelect(item);
                setOpenDropdown(null);
              }}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6A1B9A" translucent={false} />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BOOK SEAT</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            <Text style={[styles.infoText, { fontWeight: 'bold' }]}>Time Slot based seat booking is now live!</Text>{'\n'}
            <TouchableOpacity onPress={() => router.push('/time-slots')}>
              <Text style={styles.linkText}>Click Here</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>     to choose cities/DCs where time slot-based seat booking is enabled.</Text>
          </Text>
        </View>

        {/* Recent Booking Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Recent Booking</Text></View>
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.lastBookedText}>Last booked on: 20-Feb-2026</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.statusBadge}><Text style={styles.statusText}>NOT APPLICABLE</Text></View>
                <MaterialCommunityIcons name="dots-vertical" size={20} color="black" />
              </View>
            </View>
            <Text style={styles.cubicleId}>Cubicle: NOSTP 02 16 A 082</Text>
            <Text style={styles.locationDetail}>Noida, NOIDA-STP, BHUT01, FLOOR-16, A Wing</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionHeader}>Provide your DC and building preferences</Text>

          <SelectBox label="Date" value={selectedDate} options={dates} onSelect={setSelectedDate} isOpen={openDropdown === 'date'} name="date" />
          <SelectBox label="City" value={selectedCity} options={cities} onSelect={setSelectedCity} isOpen={openDropdown === 'city'} name="city" />
          <SelectBox label="DC" value={selectedDC} options={dcs} onSelect={setSelectedDC} isOpen={openDropdown === 'dc'} name="dc" />

          <Text style={styles.labelSmall}>Allocation</Text>
          <View style={styles.radioGroup}>
            {['Account', 'Unit/Subunit', 'General'].map((item) => (
              <View key={item} style={styles.radioOption}>
                <RadioButton
                  value={item.toLowerCase()}
                  status={allocation === item.toLowerCase() ? 'checked' : 'unchecked'}
                  onPress={() => setAllocation(item.toLowerCase())}
                  color="#6A1B9A"
                />
                <Text style={styles.radioLabel}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />
          
          <SelectBox label="Building Number" value={selectedBuilding} options={buildings} onSelect={setSelectedBuilding} isOpen={openDropdown === 'building'} name="building" />

          <View style={styles.row}>
            <SelectBox label="Floor" value={selectedFloor} options={floors} onSelect={setSelectedFloor} isOpen={openDropdown === 'floor'} name="floor" flex />
            <View style={{ width: 15 }} />
            <SelectBox label="Wing" value={selectedWing} options={wings} onSelect={setSelectedWing} isOpen={openDropdown === 'wing'} name="wing" flex />
          </View>

          <View style={styles.seatRow}>
            <Text style={styles.seatLabel}>Available Seats</Text>
            <Text style={styles.seatCount}>64</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} color="#6A1B9A" />
            <Text style={styles.checkboxText}>Are you willing to disclose that you are in office so that colleagues can know for better collaboration. You can change this while booking next time or rebooking.</Text>
          </View>

          <TouchableOpacity style={styles.blackBtn}><Text style={styles.btnText}>CHOOSE SEAT</Text></TouchableOpacity>
          <TouchableOpacity style={styles.blackBtn}><Text style={styles.btnText}>GET SYSTEM ALLOCATED SEAT</Text></TouchableOpacity>
          <TouchableOpacity style={styles.blackBtn}><Text style={styles.btnText}>SEARCH BY CUBICLE ID</Text></TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Bottom Sheet */}
      <View style={[styles.bottomSheet, isExpanded && styles.expandedSheet]}>
        <TouchableOpacity style={styles.footerRow} activeOpacity={0.8} onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.footerBrand}>Data Bits</Text>
          <MaterialCommunityIcons name={isExpanded ? "chevron-down" : "chevron-up"} size={30} color="#6A1B9A" />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.detailTitle}>Quick Links</Text>
            <Text style={styles.detailText}>• Workspace Policies</Text>
            <Text style={styles.detailText}>• Facility Map</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#6A1B9A' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, backgroundColor: '#6A1B9A' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  scrollContainer: { padding: 15, backgroundColor: '#f2f2f2' },
  infoBanner: { backgroundColor: '#E3F2FD', padding: 12, borderRadius: 6, marginBottom: 15, borderWidth: 0, borderColor: '#BBDEFB', elevation:3},
  infoText: { fontSize: 12, color: '#333',  },
  linkText: { color: '#6A1B9A', textDecorationLine: 'underline', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', borderRadius: 8, marginBottom: 15, elevation: 2 },
  cardHeader: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  cardTitle: { fontWeight: 'bold', fontSize: 14 },
  cardContent: { padding: 12 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  lastBookedText: { fontSize: 12, color: '#666', flex: 1 },
  statusBadge: { borderWidth: 1, borderColor: '#D32F2F', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 5 },
  statusText: { color: '#D32F2F', fontSize: 10, fontWeight: 'bold' },
  cubicleId: { fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 4 },
  locationDetail: { fontSize: 11, color: '#777', marginTop: 2 },
  formSection: { backgroundColor: '#fff', padding: 15, borderRadius: 8 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  labelSmall: { fontSize: 11, color: '#999', marginTop: 8 },
  inputUnderline: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 5, alignItems: 'center' },
  inputText: { fontSize: 14, color: '#333' },
  radioGroup: { flexDirection: 'row', marginTop: 10 },
  radioOption: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  radioLabel: { fontSize: 12, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 15 },
  row: { flexDirection: 'row' },
  seatRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  seatLabel: { fontSize: 15, fontWeight: 'bold' },
  seatCount: { fontSize: 24, color: '#388E3C', fontWeight: 'bold' },
  checkboxContainer: { flexDirection: 'row', marginBottom: 20 },
  checkboxText: { flex: 1, fontSize: 16, color: '#666' },
  blackBtn: { backgroundColor: '#1A1A1A', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10, width: '75%', alignSelf: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  dropdownOptions: { position: 'absolute', top: 40, left: 0, right: 0, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#eee', elevation: 5, zIndex: 3000 },
  optionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  optionText: { fontSize: 14, color: '#444' },
  bottomSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 20, paddingVertical: 15, elevation: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.15, shadowRadius: 10 },
  expandedSheet: { height: 250 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerBrand: { color: '#6A1B9A', fontWeight: 'bold', fontSize: 16 },
  expandedContent: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  detailTitle: { fontWeight: 'bold', marginBottom: 10 },
  detailText: { fontSize: 14, color: '#666', marginBottom: 8 }
});