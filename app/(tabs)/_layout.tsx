import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useNavigation, useRouter } from 'expo-router'
import TabBar from '@/components/tabBar'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}} tabBar={(props) => {
      return <TabBar {...props} />;
    }}>
      <Tabs.Screen name='settings' options={{title: "Settings"}}/>
      <Tabs.Screen  name='home' options={{title: "Home"}}/>
      <Tabs.Screen name='coffee' options={{title: "Coffee"}}/>
    </Tabs>
  )
}