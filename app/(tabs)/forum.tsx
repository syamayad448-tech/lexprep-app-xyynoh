
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

export default function ForumScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Tous", icon: "square.grid.2x2.fill", count: 156 },
    { id: "civil", name: "Droit Civil", icon: "house.fill", count: 45 },
    { id: "constitutional", name: "Droit Constitutionnel", icon: "building.columns.fill", count: 32 },
    { id: "criminal", name: "Droit Pénal", icon: "exclamationmark.shield.fill", count: 28 },
    { id: "help", name: "Entraide", icon: "hands.sparkles.fill", count: 51 },
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Question sur la capacité juridique des mineurs",
      category: "civil",
      author: "Marie L.",
      authorLevel: "L1",
      timeAgo: "Il y a 2h",
      replies: 8,
      views: 45,
      isAnswered: true,
      tags: ["capacité", "mineurs", "tutelle"],
      preview: "Bonjour, j'ai une question concernant la capacité juridique des mineurs émancipés...",
      isHot: false,
      isPinned: false
    },
    {
      id: 2,
      title: "Aide pour dissertation sur la séparation des pouvoirs",
      category: "constitutional",
      author: "Thomas M.",
      authorLevel: "L2",
      timeAgo: "Il y a 4h",
      replies: 12,
      views: 89,
      isAnswered: false,
      tags: ["dissertation", "séparation", "pouvoirs"],
      preview: "Salut tout le monde ! Je galère un peu sur ma dissertation concernant...",
      isHot: true,
      isPinned: false
    },
    {
      id: 3,
      title: "[ÉPINGLÉ] Ressources utiles pour les L1",
      category: "help",
      author: "Admin",
      authorLevel: "Modérateur",
      timeAgo: "Il y a 1 semaine",
      replies: 25,
      views: 234,
      isAnswered: false,
      tags: ["ressources", "L1", "conseils"],
      preview: "Voici une compilation des meilleures ressources pour réussir sa L1...",
      isHot: false,
      isPinned: true
    },
    {
      id: 4,
      title: "Différence entre crime et délit ?",
      category: "criminal",
      author: "Sophie R.",
      authorLevel: "L1",
      timeAgo: "Il y a 6h",
      replies: 5,
      views: 67,
      isAnswered: true,
      tags: ["crime", "délit", "classification"],
      preview: "Je n'arrive pas à bien comprendre la différence entre crime et délit...",
      isHot: false,
      isPinned: false
    },
    {
      id: 5,
      title: "Partage de fiches de révision Droit Civil",
      category: "help",
      author: "Lucas D.",
      authorLevel: "L3",
      timeAgo: "Il y a 1 jour",
      replies: 18,
      views: 156,
      isAnswered: false,
      tags: ["fiches", "partage", "révision"],
      preview: "Salut ! Je partage mes fiches de révision pour le droit civil...",
      isHot: true,
      isPinned: false
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'civil': return colors.primary;
      case 'constitutional': return colors.accent;
      case 'criminal': return colors.secondary;
      case 'help': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getAuthorLevelColor = (level: string) => {
    switch (level) {
      case 'L1': return colors.success;
      case 'L2': return colors.warning;
      case 'L3': return colors.error;
      case 'Modérateur': return colors.primary;
      default: return colors.textSecondary;
    }
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Nouveau post", "Création d'un nouveau post")}
      style={styles.headerButton}
    >
      <IconSymbol name="plus.circle.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Forum",
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
                placeholder="Rechercher dans le forum..."
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
                  selectedCategory === category.id && styles.categoryChipActive,
                  { borderColor: getCategoryColor(category.id) }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconSymbol 
                  name={category.icon as any} 
                  color={selectedCategory === category.id ? colors.card : getCategoryColor(category.id)} 
                  size={16} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                  { color: selectedCategory === category.id ? colors.card : getCategoryColor(category.id) }
                ]}>
                  {category.name}
                </Text>
                <View style={[
                  styles.categoryCount,
                  { backgroundColor: selectedCategory === category.id ? colors.card : getCategoryColor(category.id) }
                ]}>
                  <Text style={[
                    styles.categoryCountText,
                    { color: selectedCategory === category.id ? getCategoryColor(category.id) : colors.card }
                  ]}>
                    {category.count}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          {/* Forum Posts */}
          <ScrollView 
            style={styles.postsContainer}
            contentContainerStyle={[
              styles.postsContent,
              Platform.OS !== 'ios' && styles.postsContentWithTabBar
            ]}
            showsVerticalScrollIndicator={false}
          >
            {filteredPosts.map((post) => (
              <Pressable
                key={post.id}
                style={[
                  commonStyles.card,
                  post.isPinned && styles.pinnedPost,
                  { borderLeftColor: getCategoryColor(post.category), borderLeftWidth: 4 }
                ]}
                onPress={() => Alert.alert("Post", `Ouverture du post: ${post.title}`)}
              >
                {/* Post Header */}
                <View style={styles.postHeader}>
                  <View style={styles.postBadges}>
                    {post.isPinned && (
                      <View style={[styles.badge, { backgroundColor: colors.highlight }]}>
                        <IconSymbol name="pin.fill" color={colors.card} size={12} />
                        <Text style={styles.badgeText}>Épinglé</Text>
                      </View>
                    )}
                    {post.isHot && (
                      <View style={[styles.badge, { backgroundColor: colors.error }]}>
                        <IconSymbol name="flame.fill" color={colors.card} size={12} />
                        <Text style={styles.badgeText}>Populaire</Text>
                      </View>
                    )}
                    {post.isAnswered && (
                      <View style={[styles.badge, { backgroundColor: colors.success }]}>
                        <IconSymbol name="checkmark.circle.fill" color={colors.card} size={12} />
                        <Text style={styles.badgeText}>Résolu</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Post Title */}
                <Text style={[typography.body, styles.postTitle]}>{post.title}</Text>

                {/* Post Preview */}
                <Text style={[typography.bodySecondary, styles.postPreview]} numberOfLines={2}>
                  {post.preview}
                </Text>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                  {post.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Post Footer */}
                <View style={styles.postFooter}>
                  <View style={styles.authorInfo}>
                    <Text style={[typography.bodySecondary, styles.authorName]}>
                      {post.author}
                    </Text>
                    <View style={[
                      styles.levelBadge,
                      { backgroundColor: getAuthorLevelColor(post.authorLevel) }
                    ]}>
                      <Text style={styles.levelText}>{post.authorLevel}</Text>
                    </View>
                    <Text style={typography.bodySecondary}>• {post.timeAgo}</Text>
                  </View>

                  <View style={styles.postStats}>
                    <View style={styles.stat}>
                      <IconSymbol name="bubble.left.fill" color={colors.textSecondary} size={14} />
                      <Text style={styles.statText}>{post.replies}</Text>
                    </View>
                    <View style={styles.stat}>
                      <IconSymbol name="eye.fill" color={colors.textSecondary} size={14} />
                      <Text style={styles.statText}>{post.views}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}

            {filteredPosts.length === 0 && (
              <View style={styles.emptyState}>
                <IconSymbol name="bubble.left.and.bubble.right.fill" color={colors.textSecondary} size={48} />
                <Text style={[typography.body, styles.emptyStateText]}>
                  Aucun post trouvé
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
    gap: spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: colors.card,
  },
  categoryCount: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.xs,
  },
  categoryCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  postsContainer: {
    flex: 1,
  },
  postsContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  postsContentWithTabBar: {
    paddingBottom: 120,
  },
  pinnedPost: {
    backgroundColor: colors.highlight + '10',
  },
  postHeader: {
    marginBottom: spacing.sm,
  },
  postBadges: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.card,
  },
  postTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  postPreview: {
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tag: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  authorName: {
    fontWeight: '500',
  },
  levelBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.card,
  },
  postStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: 12,
    color: colors.textSecondary,
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
