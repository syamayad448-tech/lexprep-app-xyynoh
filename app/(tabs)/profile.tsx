
import React, { useState } from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  Pressable,
  Alert,
  Switch
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [studyReminders, setStudyReminders] = useState(true);

  // Mock user data
  const userData = {
    name: "Marie Dupont",
    email: "marie.dupont@student.univ-paris1.fr",
    faculty: "Université Paris 1 Panthéon-Sorbonne",
    level: "L1 Droit",
    joinDate: "Septembre 2024",
    avatar: "👩‍🎓"
  };

  const stats = [
    { label: "Cours complétés", value: "8", icon: "book.fill", color: colors.primary },
    { label: "Flashcards étudiées", value: "127", icon: "rectangle.stack.fill", color: colors.accent },
    { label: "Quiz réussis", value: "15", icon: "checkmark.circle.fill", color: colors.success },
    { label: "Jours consécutifs", value: "7", icon: "flame.fill", color: colors.secondary },
  ];

  const menuItems = [
    {
      id: "schedule",
      title: "Emploi du temps",
      subtitle: "Gérer votre planning",
      icon: "calendar.fill",
      color: colors.primary,
      action: () => Alert.alert("Emploi du temps", "Gestion de l'emploi du temps")
    },
    {
      id: "progress",
      title: "Progression détaillée",
      subtitle: "Voir vos statistiques",
      icon: "chart.bar.fill",
      color: colors.accent,
      action: () => Alert.alert("Progression", "Affichage des statistiques détaillées")
    },
    {
      id: "achievements",
      title: "Récompenses",
      subtitle: "Vos badges et accomplissements",
      icon: "trophy.fill",
      color: colors.highlight,
      action: () => Alert.alert("Récompenses", "Affichage des récompenses")
    },
    {
      id: "study-methods",
      title: "Méthodes d'étude",
      subtitle: "Guides et techniques",
      icon: "brain.head.profile",
      color: colors.secondary,
      action: () => Alert.alert("Méthodes", "Guides des méthodes d'étude")
    },
    {
      id: "legal-search",
      title: "Recherche juridique",
      subtitle: "Codes et jurisprudence",
      icon: "magnifyingglass.circle.fill",
      color: colors.primary,
      action: () => Alert.alert("Recherche", "Moteur de recherche juridique")
    },
    {
      id: "news",
      title: "Actualités juridiques",
      subtitle: "Dernières nouvelles",
      icon: "newspaper.fill",
      color: colors.accent,
      action: () => Alert.alert("Actualités", "Actualités juridiques")
    }
  ];

  const settingsItems = [
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Recevoir des alertes",
      icon: "bell.fill",
      type: "switch",
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled
    },
    {
      id: "study-reminders",
      title: "Rappels d'étude",
      subtitle: "Notifications de révision",
      icon: "clock.fill",
      type: "switch",
      value: studyReminders,
      onToggle: setStudyReminders
    },
    {
      id: "dark-mode",
      title: "Mode sombre",
      subtitle: "Thème de l'application",
      icon: "moon.fill",
      type: "switch",
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled
    }
  ];

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Paramètres", "Paramètres avancés")}
      style={styles.headerButton}
    >
      <IconSymbol name="gear" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Profil",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={commonStyles.safeArea}>
        <ScrollView 
          style={commonStyles.container}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* User Profile Card */}
          <View style={[commonStyles.card, styles.profileCard]}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{userData.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[typography.h2, styles.userName]}>{userData.name}</Text>
              <Text style={typography.bodySecondary}>{userData.email}</Text>
              <Text style={typography.bodySecondary}>
                {userData.faculty} • {userData.level}
              </Text>
              <Text style={[typography.bodySecondary, { color: colors.primary }]}>
                Membre depuis {userData.joinDate}
              </Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={[commonStyles.card, styles.statCard]}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  <IconSymbol name={stat.icon as any} color={colors.card} size={20} />
                </View>
                <Text style={[typography.h2, { color: stat.color }]}>{stat.value}</Text>
                <Text style={[typography.bodySecondary, styles.statLabel]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Menu Items */}
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Fonctionnalités</Text>
            {menuItems.map((item) => (
              <Pressable
                key={item.id}
                style={[commonStyles.card, styles.menuItem]}
                onPress={item.action}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <IconSymbol name={item.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={[typography.body, styles.menuTitle]}>{item.title}</Text>
                  <Text style={typography.bodySecondary}>{item.subtitle}</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
              </Pressable>
            ))}
          </View>

          {/* Settings */}
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Paramètres</Text>
            {settingsItems.map((item) => (
              <View key={item.id} style={[commonStyles.card, styles.settingItem]}>
                <View style={[styles.settingIcon, { backgroundColor: colors.textSecondary }]}>
                  <IconSymbol name={item.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[typography.body, styles.settingTitle]}>{item.title}</Text>
                  <Text style={typography.bodySecondary}>{item.subtitle}</Text>
                </View>
                {item.type === 'switch' && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={colors.card}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Account Actions */}
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Compte</Text>
            
            <Pressable
              style={[commonStyles.card, styles.actionItem]}
              onPress={() => Alert.alert("Aide", "Centre d'aide et support")}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="questionmark.circle.fill" color={colors.card} size={20} />
              </View>
              <View style={styles.actionContent}>
                <Text style={[typography.body, styles.actionTitle]}>Aide et support</Text>
                <Text style={typography.bodySecondary}>FAQ et contact</Text>
              </View>
              <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
            </Pressable>

            <Pressable
              style={[commonStyles.card, styles.actionItem]}
              onPress={() => Alert.alert("À propos", "Informations sur l'application")}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="info.circle.fill" color={colors.card} size={20} />
              </View>
              <View style={styles.actionContent}>
                <Text style={[typography.body, styles.actionTitle]}>À propos</Text>
                <Text style={typography.bodySecondary}>Version 1.0.0</Text>
              </View>
              <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
            </Pressable>

            <Pressable
              style={[commonStyles.card, styles.actionItem, styles.dangerItem]}
              onPress={() => Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
                { text: "Annuler", style: "cancel" },
                { text: "Déconnexion", style: "destructive" }
              ])}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.error }]}>
                <IconSymbol name="rectangle.portrait.and.arrow.right.fill" color={colors.card} size={20} />
              </View>
              <View style={styles.actionContent}>
                <Text style={[typography.body, styles.actionTitle, { color: colors.error }]}>
                  Déconnexion
                </Text>
                <Text style={typography.bodySecondary}>Se déconnecter du compte</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  scrollContentWithTabBar: {
    paddingBottom: 120,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    fontSize: 40,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    marginBottom: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statLabel: {
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  dangerItem: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  headerButton: {
    padding: spacing.sm,
  },
});
