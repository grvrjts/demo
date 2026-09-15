import { router, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#6A1B9A' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        
        // BACK ARROW LOGIC: Redirects to the previous screen
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 5 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        ),

        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 5 }}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
          </TouchableOpacity>
        ),
      }}
    >
      
      {/* Root index screen with no header */}
      <Stack.Screen name="index" options={{ headerShown: false,
         headerStyle: { backgroundColor: '#fff' },  // White background for this screen
        headerTintColor: '#000',  // Black text for this screen
        statusBarStyle: 'dark',
      }} />
      
      {/* Ensure the name matches your file name exactly */}
      <Stack.Screen name="book-seat" options={{ title: 'BOOK SEAT' }} />
      <Stack.Screen name="time-slots" options={{ 
        title: 'Book Seat for Time Slots',
        headerStyle: { backgroundColor: '#fff' },  // White background for this screen
        headerTintColor: '#000',  // Black text for this screen
        statusBarStyle: 'dark',  // Black status bar text for visibility on white header
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 5 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 5 }}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
          </TouchableOpacity>
        )
      }} />
    </Stack>
  );
}
