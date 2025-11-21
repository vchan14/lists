<template>
  <div class="collapsible-list">
    <!-- Hamburger Icon Button -->
    <button
      @click="toggleList"
      class="hamburger-btn"
      :class="{ 'expanded': isExpanded }"
      aria-label="Toggle menu"
    >
      <div class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    <!-- Collapsible List Panel -->
    <transition name="slide">
      <div v-if="isExpanded" class="list-panel">
        <div class="list-content">
          <ul class="item-list">
            <li
              v-for="item in items"
              :key="item.id"
              @click="selectItem(item.id)"
              class="list-item"
              :class="{ 'selected': selectedItemId === item.id }"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- Overlay to close menu when clicking outside -->
    <transition name="fade">
      <div
        v-if="isExpanded"
        class="overlay"
        @click="toggleList"
      ></div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)
const selectedItemId = ref(null)

const items = ref([
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
  { id: 4, label: 'Item 4' },
  { id: 5, label: 'Item 5' }
])

const toggleList = () => {
  isExpanded.value = !isExpanded.value
}

const selectItem = (itemId) => {
  selectedItemId.value = itemId
}
</script>

<style scoped>
.collapsible-list {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* Hamburger Button */
.hamburger-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 36px;
  height: 36px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1002;
}

.hamburger-btn:hover {
  background-color: #d0d0d0;
}

.hamburger-btn.expanded {
  left: calc(20% + 20px);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hamburger-icon span {
  display: block;
  width: 18px;
  height: 2px;
  background-color: #666;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* List Panel */
.list-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 20vw;
  min-width: 250px;
  height: 100vh;
  background-color: #f5f5f5;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.list-content {
  padding-top: 90px;
  height: 100%;
  overflow-y: auto;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #e0e0e0;
  color: #666;
  font-size: 14px;
}

.list-item:hover {
  background-color: #e8e8e8;
}

.list-item.selected {
  background-color: #d0d0d0;
  color: #333;
  font-weight: 500;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

