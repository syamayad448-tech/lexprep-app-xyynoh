
import { useRouter, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 25,
  bottomMargin = 34,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  
  // Create shared values for each tab at the top level
  const animatedValues = useMemo(() => 
    tabs.map(() => useSharedValue(0)), 
    [tabs.length]
  );

  // Create animated styles for each tab at the top level
  const animatedStyles = useMemo(() => 
    animatedValues.map((animatedValue) => 
      useAnimatedStyle(() => {
        const scale = interpolate(
          animatedValue.value,
          [0, 1],
          [1, 0.9]
        );
        
        return {
          transform: [{ scale }],
        };
      })
    ), 
    [animatedValues]
  );

  const handleTabPress = (route: string, index: number) => {
    console.log('Tab pressed:', route);
    
    // Animate the pressed tab
    animatedValues[index].value = withSpring(1, {
      duration: 200,
    }, () => {
      animatedValues[index].value = withSpring(0, { duration: 200 });
    });

    router.push(route as any);
  };

  const isActive = (route: string) => {
    if (route === '/(tabs)/(home)/') {
      return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
    }
    return pathname === route || pathname.startsWith(route.replace('/(tabs)', ''));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { bottom: bottomMargin }]}>
        <BlurView
          style={[
            styles.tabBar,
            {
              width: containerWidth,
              borderRadius: borderRadius,
            },
          ]}
          intensity={80}
          tint={theme.dark ? 'dark' : 'light'}
        >
          {tabs.map((tab, index) => {
            const active = isActive(tab.route);

            return (
              <Animated.View key={tab.name} style={[styles.tabItem, animatedStyles[index]]}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    active && styles.activeTab,
                  ]}
                  onPress={() => handleTabPress(tab.route, index)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={tab.icon as any}
                    size={24}
                    color={active ? colors.primary : colors.text}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color: active ? colors.primary : colors.text,
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    pointerEvents: 'box-none',
  },
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.card + 'F0',
    ...Platform.select({
      ios: {},
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    minHeight: 60,
  },
  activeTab: {
    backgroundColor: colors.primary + '15',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});
