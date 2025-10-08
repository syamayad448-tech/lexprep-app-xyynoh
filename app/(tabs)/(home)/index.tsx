
import React, { useState } from "react";
import { Stack } from "expo-router";
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  Pressable,
  Alert
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  const [userName] = useState("Marie"); // This would come from user profile
  const [faculty] = useState("Université Paris 1 Panthéon-Sorbonne");
  const [level] = useState("L1 Droit");

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Examen Droit Civil",
      date: "15 Mars 2024",
      type: "exam",
      priority: "high"
    },
    {
      id: 2,
      title: "TD Droit Constitutionnel",
      date: "18 Mars 2024",
      type: "assignment",
      priority: "medium"
    },
    {
      id: 3,
      title: "Dissertation Histoire du Droit",
      date: "22 Mars 2024",
      type: "assignment",
      priority: "low"
    }
  ];

  // Mock data for today's schedule
  const todaySchedule = [
    {
      id: 1,
      time: "09:00",
      subject: "Droit Civil",
      type: "Cours Magistral",
      room: "Amphi A"
    },
    {
      id: 2,
      time: "14:00",
      subject: "Droit Constitutionnel",
      type: "TD",
      room: "Salle 205"
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: "Flashcards",
      subtitle: "Réviser rapidement",
      icon: "rectangle.stack.fill",
      color: colors.primary,
      action: () => Alert.alert("Navigation", "Redirection vers les flashcards")
    },
    {
      id: 2,
      title: "Quiz",
      subtitle: "Tester ses connaissances",
      icon: "questionmark.circle.fill",
      color: colors.accent,
      action: () => Alert.alert("Navigation", "Redirection vers les quiz")
    },
    {
      id: 3,
      title: "Forum",
      subtitle: "Poser une question",
      icon: "bubble.left.and.bubble.right.fill",
      color: colors.secondary,
      action: () => Alert.alert("Navigation", "Redirection vers le forum")
    },
    {
      id: 4,
      title: "Actualités",
      subtitle: "Dernières nouvelles",
      icon: "newspaper.fill",
      color: colors.highlight,
      action: () => Alert.alert("Navigation", "Redirection vers les actualités")
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Notifications", "Aucune nouvelle notification")}
      style={styles.headerButton}
    >
      <IconSymbol name="bell.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => Alert.alert("Menu", "Ouverture du menu latéral")}
      style={styles.headerButton}
    >
      <IconSymbol name="line.horizontal.3" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Accueil",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
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
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={[typography.h2, styles.welcomeText]}>
              Bonjour {userName} 👋
            </Text>
            <Text style={[typography.bodySecondary, styles.facultyText]}>
              {faculty} • {level}
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Actions rapides</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <Pressable
                  key={action.id}
                  style={[styles.quickActionCard, { borderLeftColor: action.color }]}
                  onPress={action.action}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                    <IconSymbol name={action.icon as any} color={colors.card} size={20} />
                  </View>
                  <View style={styles.quickActionContent}>
                    <Text style={[typography.body, styles.quickActionTitle]}>
                      {action.title}
                    </Text>
                    <Text style={typography.bodySecondary}>
                      {action.subtitle}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Today's Schedule */}
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Emploi du temps d&apos;aujourd&apos;hui</Text>
            <View style={commonStyles.card}>
              {todaySchedule.map((item, index) => (
                <View key={item.id}>
                  <View style={styles.scheduleItem}>
                    <View style={styles.scheduleTime}>
                      <Text style={[typography.body, { color: colors.primary }]}>
                        {item.time}
                      </Text>
                    </View>
                    <View style={styles.scheduleContent}>
                      <Text style={typography.body}>{item.subject}</Text>
                      <Text style={typography.bodySecondary}>
                        {item.type} • {item.room}
                      </Text>
                    </View>
                  </View>
                  {index < todaySchedule.length - 1 && <View style={commonStyles.divider} />}
                </View>
              ))}
            </View>
          </View>

          {/* Upcoming Deadlines */}
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Prochaines échéances</Text>
            <View style={commonStyles.card}>
              {upcomingDeadlines.map((deadline, index) => (
                <View key={deadline.id}>
                  <View style={styles.deadlineItem}>
                    <View style={[
                      styles.priorityIndicator, 
                      { backgroundColor: getPriorityColor(deadline.priority) }
                    ]} />
                    <View style={styles.deadlineContent}>
                      <Text style={typography.body}>{deadline.title}</Text>
                      <Text style={typography.bodySecondary}>{deadline.date}</Text>
                    </View>
                    <IconSymbol 
                      name={deadline.type === 'exam' ? 'doc.text.fill' : 'pencil.circle.fill'} 
                      color={colors.textSecondary} 
                      size={20} 
                    />
                  </View>
                  {index < upcomingDeadlines.length - 1 && <View style={commonStyles.divider} />}
                </View>
              ))}
            </View>
          </View>

          {/* Study Progress */}
          <View style={styles.section}>
            <Text style={[typography.h3, styles.sectionTitle]}>Progression cette semaine</Text>
            <View style={commonStyles.card}>
              <View style={styles.progressItem}>
                <Text style={typography.body}>Flashcards révisées</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '75%', backgroundColor: colors.primary }]} />
                </View>
                <Text style={typography.bodySecondary}>45/60</Text>
              </View>
              <View style={commonStyles.divider} />
              <View style={styles.progressItem}>
                <Text style={typography.body}>Quiz complétés</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '60%', backgroundColor: colors.accent }]} />
                </View>
                <Text style={typography.bodySecondary}>6/10</Text>
              </View>
              <View style={commonStyles.divider} />
              <View style={styles.progressItem}>
                <Text style={typography.body}>Heures d&apos;étude</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '85%', backgroundColor: colors.success }]} />
                </View>
                <Text style={typography.bodySecondary}>17/20h</Text>
              </View>
            </View>
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
    paddingBottom: 120, // Extra padding for floating tab bar
  },
  welcomeSection: {
    paddingVertical: spacing.lg,
  },
  welcomeText: {
    marginBottom: spacing.xs,
  },
  facultyText: {
    marginBottom: spacing.sm,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    gap: spacing.sm,
  },
  quickActionCard: {
    ...commonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    marginVertical: spacing.xs,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  scheduleTime: {
    width: 60,
    marginRight: spacing.md,
  },
  scheduleContent: {
    flex: 1,
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  deadlineContent: {
    flex: 1,
  },
  progressItem: {
    paddingVertical: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginVertical: spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  headerButton: {
    padding: spacing.sm,
  },
});
