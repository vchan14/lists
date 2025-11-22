<template>
  <div class="collapsible-list">
    <!-- Hamburger Icon Button -->
    <button
      class="hamburger-btn"
      :class="{ expanded: isExpanded }"
      aria-label="Toggle menu"
      @click="toggleList"
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
            <li v-for="item in items" :key="item.id" class="list-item-wrapper">
              <!-- Parent Item -->
              <div
                class="list-item"
                :class="{
                  selected: selectedItemId === item.id,
                  'has-children': item.subItems,
                  'no-route': !item.route,
                }"
                @click="handleItemClick(item)"
              >
                <!-- Expand/Collapse Icon for items with subItems -->
                <span
                  v-if="item.subItems"
                  class="expand-icon"
                  @click.stop="toggleSubItems(item.id)"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ expanded: expandedItems.has(item.id) }"
                  >
                    <path
                      d="M4 2L8 6L4 10"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span class="item-label">{{ item.label }}</span>
              </div>

              <!-- Sub Items -->
              <transition name="slide-vertical">
                <ul
                  v-if="item.subItems && expandedItems.has(item.id)"
                  class="sub-item-list"
                >
                  <li
                    v-for="subItem in item.subItems"
                    :key="subItem.id"
                    class="list-item sub-item"
                    :class="{ selected: selectedItemId === subItem.id }"
                    @click.stop="selectItem(subItem)"
                  >
                    {{ subItem.label }}
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- Overlay to close menu when clicking outside -->
    <transition name="fade">
      <div v-if="isExpanded" class="overlay" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { menuItems } from "~/config/menuItems";

const router = useRouter();
const route = useRoute();

const isExpanded = ref(false);
const selectedItemId = ref(null);
const expandedItems = ref(new Set());

const items = ref(menuItems);

// Set selected item based on current route
watch(
  () => route.path,
  (newPath) => {
    // Check top-level items
    let matchedItem = items.value.find((item) => item.route === newPath);

    // Check sub-items
    if (!matchedItem) {
      for (const item of items.value) {
        if (item.subItems) {
          const subItem = item.subItems.find((sub) => sub.route === newPath);
          if (subItem) {
            matchedItem = subItem;
            // Auto-expand parent when child is selected
            expandedItems.value.add(item.id);
            break;
          }
        }
      }
    }

    if (matchedItem) {
      selectedItemId.value = matchedItem.id;
    }
  },
  { immediate: true },
);

const toggleList = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleSubItems = (itemId) => {
  if (expandedItems.value.has(itemId)) {
    expandedItems.value.delete(itemId);
  } else {
    expandedItems.value.add(itemId);
  }
  // Force reactivity update
  expandedItems.value = new Set(expandedItems.value);
};

const handleItemClick = (item) => {
  // If item has a route, navigate to it
  if (item.route) {
    selectItem(item);
  } else if (item.subItems) {
    // If no route but has subItems, just toggle expansion
    toggleSubItems(item.id);
  }
};

const selectItem = (item) => {
  if (item.route) {
    selectedItemId.value = item.id;
    router.push(item.route);
    // Close the menu after navigation
    isExpanded.value = false;
  }
};
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

.list-item-wrapper {
  border-bottom: 1px solid #e0e0e0;
}

.list-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-item:hover {
  background-color: #e8e8e8;
}

.list-item.selected {
  background-color: #d0d0d0;
  color: #333;
  font-weight: 500;
}

.list-item.no-route {
  cursor: default;
  font-weight: 500;
}

.list-item.no-route:hover {
  background-color: transparent;
}

.expand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #666;
  transition: transform 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;
}

.expand-icon:hover {
  color: #333;
}

.expand-icon svg {
  transition: transform 0.2s ease;
}

.expand-icon svg.expanded {
  transform: rotate(90deg);
}

.item-label {
  flex: 1;
}

.sub-item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
}

.sub-item {
  padding-left: 48px;
  font-size: 13px;
  border-bottom: none;
}

.sub-item:last-child {
  border-bottom: none;
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

/* Vertical slide for sub-items */
.slide-vertical-enter-active,
.slide-vertical-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-vertical-enter-from,
.slide-vertical-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-vertical-enter-to,
.slide-vertical-leave-from {
  max-height: 500px;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
