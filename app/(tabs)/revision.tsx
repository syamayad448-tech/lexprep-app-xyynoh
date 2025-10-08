
import React, { useState } from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  Pressable,
  Alert
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from "@/styles/commonStyles";

export default function RevisionScreen() {
  const [selectedMode, setSelectedMode] = useState("flashcards");

  const revisionModes = [
    { id: "flashcards", name: "Flashcards", icon: "rectangle.stack.fill" },
    { id: "quiz", name: "Quiz", icon: "questionmark.circle.fill" },
    { id: "pomodoro", name: "Pomodoro", icon: "timer.circle.fill" },
  ];

  const flashcardSets = [
    {
      id: 1,
      title: "Droit Civil - Personnes",
      subject: "Droit Civil",
      cardCount: 45,
      studiedToday: 12,
      difficulty: "Moyen",
      lastStudied: "Il y a 2 heures",
      progress: 75,
      color: colors.primary
    },
    {
      id: 2,
      title: "Constitution de 1958",
      subject: "Droit Constitutionnel",
      cardCount: 32,
      studiedToday: 8,
      difficulty: "Facile",
      lastStudied: "Hier",
      progress: 90,
      color: colors.accent
    },
    {
      id: 3,
      title: "Infractions Pénales",
      subject: "Droit Pénal",
      cardCount: 28,
      studiedToday: 0,
      difficulty: "Difficile",
      lastStudied: "Il y a 3 jours",
      progress: 45,
      color: colors.secondary
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: "QCM Droit Civil",
      subject: "Droit Civil",
      questions: 20,
      duration: "15 min",
      difficulty: "Moyen",
      bestScore: 85,
      attempts: 3,
      color: colors.primary
    },
    {
      id: 2,
      title: "Quiz Constitution",
      subject: "Droit Constitutionnel",
      questions: 15,
      duration: "10 min",
      difficulty: "Facile",
      bestScore: 92,
      attempts: 5,
      color: colors.accent
    },
    {
      id: 3,
      title: "Test Droit Pénal",
      subject: "Droit Pénal",
      questions: 25,
      duration: "20 min",
      difficulty: "Difficile",
      bestScore: 68,
      attempts: 2,
      color: colors.secondary
    }
  ];

  const pomodoroSessions = [
    {
      id: 1,
      subject: "Droit Civil",
      duration: 25,
      type: "Révision",
      completed: true,
      startTime: "14:00"
    },
    {
      id: 2,
      subject: "Droit Constitutionnel",
      duration: 25,
      type: "Exercices",
      completed: true,
      startTime: "14:30"
    },
    {
      id: 3,
      subject: "Pause",
      duration: 5,
      type: "Repos",
      completed: false,
      startTime: "15:00"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return colors.success;
      case 'Moyen': return colors.warning;
      case 'Difficile': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const renderFlashcards = () => (
    <View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={[typography.h2, { color: colors.primary }]}>127</Text>
          <Text style={typography.bodySecondary}>Cartes étudiées</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[typography.h2, { color: colors.success }]}>89%</Text>
          <Text style={typography.bodySecondary}>Taux de réussite</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[typography.h2, { color: colors.accent }]}>7</Text>
          <Text style={typography.bodySecondary}>Jours de suite</Text>
        </View>
      </View>

      {flashcardSets.map((set) => (
        <Pressable
          key={set.id}
          style={[commonStyles.card, { borderLeftColor: set.color, borderLeftWidth: 4 }]}
          onPress={() => Alert.alert("Flashcards", `Démarrage des flashcards: ${set.title}`)}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardInfo}>
              <Text style={[typography.body, styles.cardTitle]}>{set.title}</Text>
              <Text style={typography.bodySecondary}>{set.subject}</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(set.difficulty) }]}>
              <Text style={styles.difficultyText}>{set.difficulty}</Text>
            </View>
          </View>

          <View style={styles.cardMetrics}>
            <View style={styles.metric}>
              <IconSymbol name="rectangle.stack.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.metricText}>{set.cardCount} cartes</Text>
            </View>
            <View style={styles.metric}>
              <IconSymbol name="checkmark.circle.fill" color={colors.success} size={16} />
              <Text style={styles.metricText}>{set.studiedToday} aujourd&apos;hui</Text>
            </View>
            <View style={styles.metric}>
              <IconSymbol name="clock.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.metricText}>{set.lastStudied}</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={typography.bodySecondary}>Progression</Text>
              <Text style={[typography.bodySecondary, { color: set.color }]}>
                {set.progress}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${set.progress}%`, backgroundColor: set.color }
                ]} 
              />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );

  const renderQuizzes = () => (
    <View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={[typography.h2, { color: colors.primary }]}>15</Text>
          <Text style={typography.bodySecondary}>Quiz complétés</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[typography.h2, { color: colors.success }]}>82%</Text>
          <Text style={typography.bodySecondary}>Score moyen</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[typography.h2, { color: colors.accent }]}>3h</Text>
          <Text style={typography.bodySecondary}>Temps total</Text>
        </View>
      </View>

      {quizzes.map((quiz) => (
        <Pressable
          key={quiz.id}
          style={[commonStyles.card, { borderLeftColor: quiz.color, borderLeftWidth: 4 }]}
          onPress={() => Alert.alert("Quiz", `Démarrage du quiz: ${quiz.title}`)}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardInfo}>
              <Text style={[typography.body, styles.cardTitle]}>{quiz.title}</Text>
              <Text style={typography.bodySecondary}>{quiz.subject}</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quiz.difficulty) }]}>
              <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
            </View>
          </View>

          <View style={styles.cardMetrics}>
            <View style={styles.metric}>
              <IconSymbol name="questionmark.circle.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.metricText}>{quiz.questions} questions</Text>
            </View>
            <View style={styles.metric}>
              <IconSymbol name="clock.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.metricText}>{quiz.duration}</Text>
            </View>
            <View style={styles.metric}>
              <IconSymbol name="trophy.fill" color={colors.highlight} size={16} />
              <Text style={styles.metricText}>Meilleur: {quiz.bestScore}%</Text>
            </View>
          </View>

          <View style={styles.attemptsSection}>
            <Text style={typography.bodySecondary}>
              {quiz.attempts} tentative{quiz.attempts > 1 ? 's' : ''}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );

  const renderPomodoro = () => (
    <View>
      <View style={[commonStyles.card, styles.pomodoroTimer]}>
        <View style={styles.timerDisplay}>
          <Text style={[typography.h1, { fontSize: 48, color: colors.primary }]}>25:00</Text>
          <Text style={typography.body}>Session de révision</Text>
        </View>
        <View style={styles.timerControls}>
          <Pressable 
            style={[commonStyles.button, styles.timerButton]}
            onPress={() => Alert.alert("Pomodoro", "Démarrage de la session")}
          >
            <IconSymbol name="play.fill" color={colors.card} size={24} />
          </Pressable>
          <Pressable 
            style={[commonStyles.button, commonStyles.secondaryButton, styles.timerButton]}
            onPress={() => Alert.alert("Pomodoro", "Pause de la session")}
          >
            <IconSymbol name="pause.fill" color={colors.primary} size={24} />
          </Pressable>
        </View>
      </View>

      <Text style={[typography.h3, styles.sectionTitle]}>Sessions d&apos;aujourd&apos;hui</Text>
      
      {pomodoroSessions.map((session) => (
        <View key={session.id} style={commonStyles.card}>
          <View style={styles.sessionItem}>
            <View style={[
              styles.sessionStatus,
              { backgroundColor: session.completed ? colors.success : colors.warning }
            ]} />
            <View style={styles.sessionInfo}>
              <Text style={typography.body}>{session.subject}</Text>
              <Text style={typography.bodySecondary}>
                {session.type} • {session.duration} min • {session.startTime}
              </Text>
            </View>
            <IconSymbol 
              name={session.completed ? "checkmark.circle.fill" : "clock.fill"} 
              color={session.completed ? colors.success : colors.warning} 
              size={20} 
            />
          </View>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (selectedMode) {
      case "flashcards": return renderFlashcards();
      case "quiz": return renderQuizzes();
      case "pomodoro": return renderPomodoro();
      default: return renderFlashcards();
    }
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Statistiques", "Affichage des statistiques détaillées")}
      style={styles.headerButton}
    >
      <IconSymbol name="chart.bar.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Révision",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.container}>
          {/* Mode Selector */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.modesContainer}
            contentContainerStyle={styles.modesContent}
          >
            {revisionModes.map((mode) => (
              <Pressable
                key={mode.id}
                style={[
                  styles.modeChip,
                  selectedMode === mode.id && styles.modeChipActive
                ]}
                onPress={() => setSelectedMode(mode.id)}
              >
                <IconSymbol 
                  name={mode.icon as any} 
                  color={selectedMode === mode.id ? colors.card : colors.primary} 
                  size={20} 
                />
                <Text style={[
                  styles.modeText,
                  selectedMode === mode.id && styles.modeTextActive
                ]}>
                  {mode.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Content */}
          <ScrollView 
            style={styles.contentContainer}
            contentContainerStyle={[
              styles.contentPadding,
              Platform.OS !== 'ios' && styles.contentWithTabBar
            ]}
            showsVerticalScrollIndicator={false}
          >
            {renderContent()}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  modesContainer: {
    paddingVertical: spacing.sm,
  },
  modesContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: spacing.sm,
    ...shadows.small,
  },
  modeChipActive: {
    backgroundColor: colors.primary,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  modeTextActive: {
    color: colors.card,
  },
  contentContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  contentWithTabBar: {
    paddingBottom: 120,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    ...commonStyles.card,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  cardMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metricText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressSection: {
    marginTop: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  attemptsSection: {
    marginTop: spacing.sm,
    alignItems: 'flex-end',
  },
  pomodoroTimer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    marginBottom: spacing.lg,
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerControls: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  sessionStatus: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  sessionInfo: {
    flex: 1,
  },
  headerButton: {
    padding: spacing.sm,
  },
});
