
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  // Define the tabs configuration for the law student app
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Accueil',
    },
    {
      name: 'courses',
      route: '/(tabs)/courses',
      icon: 'book.fill',
      label: 'Cours',
    },
    {
      name: 'revision',
      route: '/(tabs)/revision',
      icon: 'brain.head.profile',
      label: 'Révision',
    },
    {
      name: 'forum',
      route: '/(tabs)/forum',
      icon: 'bubble.left.and.bubble.right.fill',
      label: 'Forum',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profil',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Accueil</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="courses">
          <Icon sf="book.fill" drawable="ic_book" />
          <Label>Cours</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="revision">
          <Icon sf="brain.head.profile" drawable="ic_brain" />
          <Label>Révision</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="forum">
          <Icon sf="bubble.left.and.bubble.right.fill" drawable="ic_forum" />
          <Label>Forum</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profil</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="courses" />
        <Stack.Screen name="revision" />
        <Stack.Screen name="forum" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
