import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}/>
  )
}