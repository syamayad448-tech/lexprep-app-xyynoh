
import React, { useState } from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  Pressable,
  Alert,
  TextInput
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, borderRadius, shadows, commonStyles } from "@/styles/commonStyles";

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Tous", icon: "square.grid.2x2.fill" },
    { id: "civil", name: "Droit Civil", icon: "house.fill" },
    { id: "constitutional", name: "Droit Constitutionnel", icon: "building.columns.fill" },
    { id: "criminal", name: "Droit Pénal", icon: "exclamationmark.shield.fill" },
    { id: "history", name: "Histoire du Droit", icon: "clock.fill" },
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction au Droit Civil",
      category: "civil",
      progress: 75,
      duration: "2h 30min",
      lessons: 12,
      difficulty: "Débutant",
      description: "Les fondements du droit civil français",
      hasVideo: true,
      isCompleted: false
    },
    {
      id: 2,
      title: "Droit Constitutionnel - Les Institutions",
      category: "constitutional",
      progress: 45,
      duration: "3h 15min",
      lessons: 15,
      difficulty: "Intermédiaire",
      description: "Organisation des pouvoirs publics",
      hasVideo: true,
      isCompleted: false
    },
    {
      id: 3,
      title: "Histoire du Droit Français",
      category: "history",
      progress: 100,
      duration: "2h 45min",
      lessons: 10,
      difficulty: "Débutant",
      description: "Évolution du système juridique français",
      hasVideo: false,
      isCompleted: true
    },
    {
      id: 4,
      title: "Droit Pénal Général",
      category: "criminal",
      progress: 20,
      duration: "4h 00min",
      lessons: 18,
      difficulty: "Avancé",
      description: "Principes généraux du droit pénal",
      hasVideo: true,
      isCompleted: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return colors.success;
      case 'Intermédiaire': return colors.warning;
      case 'Avancé': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Recherche", "Fonction de recherche avancée")}
      style={styles.headerButton}
    >
      <IconSymbol name="magnifyingglass" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Cours",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.container}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un cours..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconSymbol 
                  name={category.icon as any} 
                  color={selectedCategory === category.id ? colors.card : colors.primary} 
                  size={16} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Courses List */}
          <ScrollView 
            style={styles.coursesContainer}
            contentContainerStyle={[
              styles.coursesContent,
              Platform.OS !== 'ios' && styles.coursesContentWithTabBar
            ]}
            showsVerticalScrollIndicator={false}
          >
            {filteredCourses.map((course) => (
              <Pressable
                key={course.id}
                style={[
                  commonStyles.card,
                  course.isCompleted && styles.completedCourse
                ]}
                onPress={() => Alert.alert("Cours", `Ouverture du cours: ${course.title}`)}
              >
                <View style={styles.courseHeader}>
                  <View style={styles.courseInfo}>
                    <Text style={[typography.body, styles.courseTitle]}>
                      {course.title}
                    </Text>
                    <Text style={typography.bodySecondary}>
                      {course.description}
                    </Text>
                  </View>
                  {course.isCompleted && (
                    <View style={styles.completedBadge}>
                      <IconSymbol name="checkmark.circle.fill" color={colors.success} size={24} />
                    </View>
                  )}
                </View>

                <View style={styles.courseDetails}>
                  <View style={styles.courseMetrics}>
                    <View style={styles.metric}>
                      <IconSymbol name="clock.fill" color={colors.textSecondary} size={14} />
                      <Text style={styles.metricText}>{course.duration}</Text>
                    </View>
                    <View style={styles.metric}>
                      <IconSymbol name="book.fill" color={colors.textSecondary} size={14} />
                      <Text style={styles.metricText}>{course.lessons} leçons</Text>
                    </View>
                    {course.hasVideo && (
                      <View style={styles.metric}>
                        <IconSymbol name="play.circle.fill" color={colors.accent} size={14} />
                        <Text style={styles.metricText}>Vidéo</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.difficultyBadge}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(course.difficulty) }
                    ]}>
                      {course.difficulty}
                    </Text>
                  </View>
                </View>

                {!course.isCompleted && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                      <Text style={typography.bodySecondary}>Progression</Text>
                      <Text style={[typography.bodySecondary, { color: colors.primary }]}>
                        {course.progress}%
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${course.progress}%` }
                        ]} 
                      />
                    </View>
                  </View>
                )}
              </Pressable>
            ))}

            {filteredCourses.length === 0 && (
              <View style={styles.emptyState}>
                <IconSymbol name="book.closed.fill" color={colors.textSecondary} size={48} />
                <Text style={[typography.body, styles.emptyStateText]}>
                  Aucun cours trouvé
                </Text>
                <Text style={typography.bodySecondary}>
                  Essayez de modifier vos critères de recherche
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.small,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
  categoriesContainer: {
    paddingVertical: spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  categoryTextActive: {
    color: colors.card,
  },
  coursesContainer: {
    flex: 1,
  },
  coursesContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  coursesContentWithTabBar: {
    paddingBottom: 120,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  completedBadge: {
    marginLeft: spacing.sm,
  },
  completedCourse: {
    opacity: 0.8,
    borderColor: colors.success,
    borderWidth: 1,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  courseMetrics: {
    flexDirection: 'row',
    gap: spacing.md,
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
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
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
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyStateText: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  headerButton: {
    padding: spacing.sm,
  },
});
