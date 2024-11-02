import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router';

export default function Home() {
  return (
    <Redirect href={"/(tabs)/home"}/>
  )
}