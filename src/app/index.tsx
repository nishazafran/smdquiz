import * as Device from 'expo-device';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const featuredProducts = [
  { name: 'Everyday Backpack', price: '$49.00' },
  { name: 'Wireless Headphones', price: '$89.00' },
  { name: 'Travel Mug', price: '$24.00' },
];

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.heroSection}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.title}>
              Welcome to&nbsp;Expo
            </ThemedText>
          </ThemedView>
          <ThemedText type="subtitle" style={styles.studentInfo}>
            Name: Nisha Zafran
          </ThemedText>

          <ThemedText type="subtitle" style={styles.studentInfo}>
            Roll No: 23i3023
          </ThemedText>

          <ThemedView style={styles.productsSection}>
            <ThemedText type="subtitle" style={styles.productsTitle}>
              Featured Products
            </ThemedText>
            {featuredProducts.map((product) => (
              <ThemedView key={product.name} type="backgroundElement" style={styles.productCard}>
                <View style={styles.productInfo}>
                  <ThemedText type="smallBold">{product.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {product.price}
                  </ThemedText>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`View ${product.name}`}
                  onPress={() => {
                    if (Platform.OS === 'web') {
                      window.alert(`${product.name}\nPrice: ${product.price}`);
                      return;
                    }
                    Alert.alert(product.name, `Price: ${product.price}`);
                  }}
                  style={({ pressed }) => [styles.productButton, pressed && styles.buttonPressed]}>
                  <ThemedText type="smallBold" style={styles.buttonText}>
                    View Product
                  </ThemedText>
                </Pressable>
              </ThemedView>
            ))}
          </ThemedView>

          <ThemedText type="code" style={styles.code}>
            get started
          </ThemedText>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <HintRow
              title="Try editing"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow title="Dev tools" hint={getDevMenuHint()} />
            <HintRow
              title="Fresh start"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </ThemedView>

          {Platform.OS === 'web' && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  studentInfo: {
    textAlign: 'center',
  },
  productsSection: {
    alignSelf: 'stretch',
    gap: Spacing.two,
  },
  productsTitle: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 32,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  productInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  productButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#ffffff',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
