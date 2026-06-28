// ============================================================
// Multi-language support for SunShine Trade
// Uses a singleton ref + provide/inject pattern for reactivity
// ============================================================
import { ref, computed, watch, inject, provide } from 'vue'

// --- Singleton state (module level, shared across all imports) ---
const locale = ref('en')
const currentLocale = computed(() => locale.value)
const isZh = computed(() => locale.value === 'zh')
const localeReady = ref(false)

// Load saved preference from localStorage
try {
  const saved = localStorage.getItem('locale')
  if (saved === 'zh' || saved === 'en') {
    locale.value = saved
  }
} catch (e) {
  // localStorage might not be available
}
localeReady.value = true

// Persist locale changes
watch(locale, (val) => {
  try {
    localStorage.setItem('locale', val)
  } catch (e) { /* ignore */ }
  document.documentElement.lang = val
})

// --- Provide the locale to the app tree ---
export const LOCALE_KEY = Symbol('locale')

export function provideLocale(app) {
  provide(LOCALE_KEY, { locale, isZh, toggleLocale, localized })
}

// --- Locale composable for components ---
export function useLocale() {
  // Try injected value first, fall back to direct singleton
  const injected = inject(LOCALE_KEY, null)
  if (injected) {
    return { ...injected, localeReady, currentLocale }
  }

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'zh' : 'en'
  }

  function localized(obj, fieldEn, fieldCn) {
    if (!obj) return ''
    return isZh.value ? (obj[fieldCn] || obj[fieldEn]) : obj[fieldEn]
  }

  return { locale, isZh, currentLocale, toggleLocale, localized, localeReady }
}

// --- Translation helper for templates ---
// Returns a reactive translation function
// Usage in template: {{ t('English text', '涓枃鏂囨湰') }}
// The computed ensures Vue tracks the dependency on locale
export function useT() {
  const { isZh } = useLocale()
  const t = computed(() => {
    return (enText, zhText) => {
      return isZh.value ? (zhText || enText) : enText
    }
  })
  return { t }
}

// --- Product localization helper ---
// For product data with bilingual fields (name/nameCn, description/descriptionCn)
// Usage: {{ productT(product, 'name', 'nameCn') }}
export function useProductT() {
  const { isZh } = useLocale()
  const productT = computed(() => {
    return (obj, enField, cnField) => {
      if (!obj) return ''
      return isZh.value ? (obj[cnField] || obj[enField]) : obj[enField]
    }
  })
  return { productT }
}
