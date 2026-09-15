import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, 
  TouchableOpacity, StatusBar, Dimensions, Platform, UIManager
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'; 

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

export default function Homepage() {
  // 1. STORE CARDS DATA
  const storeCards = [
    {
      id: '1',
      title: 'Upcoming meetings',
      desc: 'No meetings today! Enjoy your cuppa.',
      link: 'View Upcoming Meetings',
      icon: 'calendar-check-outline',
      color: '#6A1B9A',
    },
    {
      id: '2',
      title: 'Share your feedback!',
      desc: "We want to provide you with best mobile experience. Tell us what's working.",
      link: 'Share Feedback',
      icon: 'message-draw',
      color: '#6A1B9A',
    },
  ];

  // 2. SUBSIDIARIES DATA
  const subsidiaries = [
    {
      id: '1',
      name: 'WONGDOODY',
      tagline: 'An Infosys company',
      desc: 'We are a creative technology company that dreams big and finds creative moments in everything we do.',
      logoColor: '#004A8D',
      textColor: '#fff'
    },
    {
      id: '2',
      name: 'Kaleidoscope Innovation',
      tagline: 'an Infosys company',
      desc: 'Research, Design, and Engineering services for Consumer, Industrial, and Medical markets.',
      logoColor: '#F4F6FB',
      textColor: '#333'
    }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <LinearGradient colors={['#004A8D', '#007CC3']} style={styles.heroSection}>
          <View style={styles.topNav}>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png' }} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.heroContent}>
            <Text style={styles.heroSubtitle}>Infosys Sponsors Coupa Inspire 2026</Text>
            <Text style={styles.heroTitle}>AI-First Connected Enterprise</Text>
            <Text style={styles.heroDate}>May 11 - 14 | Las Vegas</Text>
            <TouchableOpacity style={styles.knowMoreBtn}>
              <Text style={styles.knowMoreText}>Know more</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Section: What's in store */}
        <View style={styles.storeSection}>
          <Text style={styles.sectionTitle}>What's in store today?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
            {storeCards.map((card) => (
              <View key={card.id} style={styles.feedbackCard}>
                <Text style={[styles.cardLabel, { color: card.color }]}>{card.title}</Text>
                <View style={styles.meetingContent}>
                   <MaterialCommunityIcons name={card.icon as any}  size={40} color={card.color} />
                   <Text style={styles.cardDesc}>{card.desc}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={[styles.cardLink, { color: card.color }]}>{card.link}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Section: Hybrid Status */}
        <View style={styles.hybridSection}>
          <View style={styles.hybridHeader}>
            <Text style={styles.hybridTitle}>hello <Text style={{ fontWeight: 'bold' }}>HYBRID</Text></Text>
            <TouchableOpacity><Text style={styles.knowMoreLink}>Know more</Text></TouchableOpacity>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartLabel}>Your Working Days Status</Text>
            <View style={styles.chartWrapper}>
                <View style={styles.barChart}>
                    <View style={styles.barGroup}>
                        <View style={styles.barPair}>
                            <View style={styles.barLabelContainer}>
                                <Text style={styles.barVal}>10</Text>
                                <View style={[styles.bar, { height: 70, backgroundColor: '#6A1B9A' }]} />
                            </View>
                            <View style={styles.barLabelContainer}>
                                <Text style={styles.barVal}>12</Text>
                                <View style={[styles.bar, { height: 85, backgroundColor: '#FF8F00' }]} />
                            </View>
                        </View>
                        <Text style={styles.monthText}>APR</Text>
                    </View>
                    <View style={styles.barGroup}>
                        <View style={styles.barPair}>
                            <View style={styles.barLabelContainer}>
                                <Text style={styles.barVal}>1</Text>
                                <View style={[styles.bar, { height: 10, backgroundColor: '#6A1B9A' }]} />
                            </View>
                            <View style={styles.barLabelContainer}>
                                <Text style={styles.barVal}>3</Text>
                                <View style={[styles.bar, { height: 25, backgroundColor: '#FF8F00' }]} />
                            </View>
                        </View>
                        <Text style={styles.monthText}>MAY</Text>
                    </View>
                </View>

                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: '#6A1B9A' }]} />
                        <Text style={styles.legendText}>WFO</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: '#FF8F00' }]} />
                        <Text style={styles.legendText}>WFH</Text>
                    </View>
                </View>
            </View>
            
          </View>
          <View style={styles.actionItem}>
              <MaterialCommunityIcons name="office-building-marker-outline" size={20} color="#6A1B9A" />
              <Text style={styles.actionText} onPress={() => router.push('/book-seat')}>Book/View seat</Text>
            </View>
        </View>

        {/* UPDATED: Infosys Subsidiaries Section */}
        <View style={styles.subsidiarySection}>
          <Text style={styles.sectionTitle}>Infosys Subsidiaries</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.subsidiaryScroll}
          >
            {subsidiaries.map((sub) => (
              <View key={sub.id} style={styles.subCard}>
                <View style={[styles.subLogoHeader, { backgroundColor: sub.logoColor }]}>
                  <Text style={[styles.subName, { color: sub.textColor }]}>{sub.name}</Text>
                  <Text style={[styles.subTagline, { color: sub.textColor }]}>{sub.tagline}</Text>
                </View>
                <View style={styles.subBody}>
                  <Text style={styles.subDesc}>{sub.desc}</Text>
                </View>
                {/* Branding Icon at bottom right */}
                <View style={styles.subFooter}>
                   <MaterialCommunityIcons name="alpha-n-circle" size={24} color="#6A1B9A" />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTab}>
        <MaterialCommunityIcons name="menu" size={26} color="#555" />
        <MaterialCommunityIcons name="magnify" size={26} color="#555" />
        <View style={styles.homeCircle}>
           <MaterialCommunityIcons name="home" size={26} color="#6A1B9A" />
        </View>
        <MaterialCommunityIcons name="view-grid-outline" size={26} color="#555" />
        <MaterialCommunityIcons name="bell-outline" size={26} color="#555" />
              <TouchableOpacity style={styles.profilePlaceholder}>
                  <MaterialCommunityIcons name="account-circle" size={32} color="#6A1B9A" />
              </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB' },
  topNav: { 
    marginBottom: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 10, // Adjusts for status bar height
    flexDirection: 'row',
    alignItems: 'center'
  },
  heroContent: { 
    flex: 1,
    justifyContent: 'center', // Centers the text vertically in the blue section
    paddingBottom: 40 // Pushes content up slightly to accommodate the overlapping peachy section
  },
  heroDate: { 
    color: '#fff', 
    fontSize: 14, 
    marginBottom: 20,
    opacity: 0.9 // Gives it a slightly softer look than the title
  },
  profilePlaceholder: { 
    width: 34, 
    height: 34, 
    borderRadius: 17, 
    backgroundColor: '#fff', // White background circle
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee', // Subtle border to make it pop
    overflow: 'hidden'
  },
  hybridHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12,
    paddingHorizontal: 5 
  },
  // Hero Section
  heroSection: { height: 320, padding: 20, paddingTop: 50 },
  logo: { width: 80, height: 30, tintColor: '#fff' },
  heroSubtitle: { color: '#fff', fontSize: 16 },
  heroTitle: { color: '#FFD700', fontSize: 22, fontWeight: 'bold', marginVertical: 4 },
  knowMoreBtn: { backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginTop: 15 },
  knowMoreText: { color: '#004A8D', fontWeight: 'bold' },

  // Store Section (Peachy background)
  storeSection: { 
    marginTop: -40, 
    backgroundColor: '#FFDAB9', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingVertical: 20 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    paddingHorizontal: 20, 
    color: '#333' 
  },
  knowMoreLink: { 
    color: '#6A1B9A', // Deep purple branding color
    fontSize: 12, 
    fontWeight: '600', 
    textDecorationLine: 'none' // You can change this to 'underline' if you want it to look more like a link
  },
  chartLabel: { 
    fontSize: 13, 
    fontWeight: '700', // Making it bolder to match the UI
    color: '#333', 
    marginBottom: 12,
    paddingHorizontal: 5 // Optional: gives it a little breathing room from the edge
  },
  cardScroll: { paddingLeft: 20 },
  feedbackCard: { 
    backgroundColor: '#fff', 
    width: width * 0.75, 
    padding: 15, 
    borderRadius: 20, 
    marginRight: 15, 
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3 
  },
  cardLabel: { fontWeight: 'bold', marginBottom: 10, fontSize: 13 },
  meetingContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  cardDesc: { 
    flex: 1, 
    fontSize: 12, 
    color: '#333',
    marginLeft: 10 // Replaces 'gap' for better compatibility
  },
  cardLink: { fontWeight: 'bold', fontSize: 12 },

  // Hybrid Section
  hybridSection: { padding: 20 },
  hybridTitle: { fontSize: 18, color: '#6A1B9A' },
  chartContainer: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 15, 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  actionItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 15 
  },
  actionText: { 
    fontSize: 13, 
    color: '#333', 
    fontWeight: '600',
    marginLeft: 8 
  },

  // Subsidiary Section (The part you requested changes for)
  subsidiarySection: { paddingVertical: 10 },
  subsidiaryScroll: { paddingLeft: 20, paddingRight: 10 },
  subCard: { 
    backgroundColor: '#fff', 
    width: width * 0.70, 
    borderRadius: 20, 
    marginRight: 15, 
    overflow: 'hidden', 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: 200,
    marginBottom: 20
  },
  subLogoHeader: { 
    height: 80, 
    padding: 15, 
    justifyContent: 'center' 
  },
  subName: { fontSize: 20, fontWeight: 'bold', letterSpacing: 0.5 },
  subTagline: { fontSize: 10, opacity: 0.9, marginTop: 2 },
  subBody: { padding: 15 },
  subDesc: { fontSize: 11, color: '#555', lineHeight: 16 },
  subFooter: { 
    position: 'absolute', 
    bottom: 10, 
    right: 15 
  },

  // Navigation Tab
  bottomTab: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    height: 75, 
    backgroundColor: '#fff', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    paddingBottom: 15
  },
  homeCircle: { 
    backgroundColor: '#F3E5F5', 
    padding: 10, 
    borderRadius: 25 
  },
  chartWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    marginTop: 10
  },
  barChart: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    justifyContent: 'space-around', 
    height: 100 // Ensures the container has height to show the bars
  },
  barGroup: { 
    alignItems: 'center' 
  },
  barPair: { 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    gap: 4 
  },
  barLabelContainer: { 
    alignItems: 'center' 
  },
  barVal: { 
    fontSize: 10, 
    color: '#666', 
    marginBottom: 4 
  },
  bar: { 
    width: 12, 
    borderRadius: 3 
  },
  monthText: { 
    fontSize: 10, 
    color: '#999', 
    marginTop: 8, 
    fontWeight: 'bold' 
  },
  legend: { 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    paddingLeft: 5
  },
  legendItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 15 
  },
  legendBox: { 
    width: 10, 
    height: 10, 
    borderRadius: 2, 
    marginRight: 5 
  },
  legendText: { 
    fontSize: 11, 
    color: '#444' 
  },
});