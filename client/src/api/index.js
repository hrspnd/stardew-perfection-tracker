/**
 * api/index.js
 * The only file components and pages import data functions from
 * (e.g. `import { getSummary } from '../api'`).
 *
 * Why it exists: pages never touch storage directly. Everything goes through
 * the functions below, and this file is the one place that decides where they
 * come from. The app has no server or login - progress is saved in the
 * browser's localStorage by localApi.js. If storage ever changes (IndexedDB,
 * a server), only localApi.js needs rewriting; no page changes as long as the
 * function names and return shapes stay the same.
 *
 * Every function is async and resolves with the updated data, or rejects with
 * an Error. Pages should show a loading state and handle failures.
 *
 * Categories (the `category` argument below):
 *   shipped, walnuts, fish, bundles, cooking, crafting, obelisks, goldenClock,
 *   stardrops, monsterSlayer, museum, greatFriends
 *   (farmerLevel has its own functions and is not passed to listCategory
 *   or toggleItem.)
 *
 * Reading:
 *   listCategory(category)      -> the stored data for one category
 *   getSummary()                -> { [category]: { total, completed } } for
 *                                  every trackable category (used by the Dashboard)
 *
 * Toggling a flat checklist (fish, cooking, crafting, etc.):
 *   toggleItem(category, itemId)
 *
 * Toggling nested data (each has its own shape, so its own function):
 *   toggleGroupedItem(category, groupId, itemId)   Shipped: group > item
 *   toggleBundleItem(roomId, bundleId, itemId)     Bundles: room > bundle > item
 *
 * Farmer Level (skills are levels and professions, not simple checkboxes):
 *   toggleSkillLevel(skillId, tier, levelIndex)    tier is 5 (levels 1-5) or
 *                                                  10 (levels 6-10)
 *   setSkillProfession(skillId, tier, value)       changing the level-5 pick
 *                                                  clears the level-10 pick
 *
 * Backup (no accounts, so progress can be saved to a file and loaded back):
 *   exportData()                -> JSON string of all saved progress
 *   importData(jsonString)      -> replaces saved progress; rejects if the
 *                                  text isn't a progress file
 *   resetData()                 -> erases all saved progress (back to the
 *                                  starting data)
 */

export {
  listCategory,
  toggleItem,
  getSummary,
  toggleGroupedItem,
  toggleBundleItem,
  toggleSkillLevel,
  setSkillProfession,
  exportData,
  importData,
  resetData,
} from './localApi.js'