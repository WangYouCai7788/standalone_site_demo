import { ref, computed } from 'vue'

const items = ref([])
const showPanel = ref(false)

export function useQuote() {
  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty += product.qty || 1
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        nameCn: product.nameCn,
        image: product.image,
        fobMin: product.fobMin || parseFloat(product.fobPrice?.split(' - ')[0]?.replace('$', '') || 0),
        fobMax: product.fobMax || parseFloat(product.fobPrice?.split(' - ')[1]?.replace('$', '') || 0),
        moq: product.moq,
        qty: 1
      })
    }
    showPanel.value = true
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
    if (items.value.length === 0) showPanel.value = false
  }

  function updateQty(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.qty = Math.max(1, qty)
    }
  }

  function clearQuote() {
    items.value = []
    showPanel.value = false
  }

  function togglePanel() {
    showPanel.value = !showPanel.value
  }

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const quoteOpen = computed(() => showPanel.value && items.value.length > 0)

  return {
    items,
    showPanel,
    totalItems,
    quoteOpen,
    addItem,
    removeItem,
    updateQty,
    clearQuote,
    togglePanel
  }
}
