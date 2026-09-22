/**
 * SkillTracker
 * Layout for: Farmer Level only.
 *
 * Renders rows of small checkboxes followed by a dropdown (level/skill select).
 * Distinct from ListTracker/CardGridTracker — don't force this into either.
 *
 * Props (draft):
 *   rows: Array<{ id, checkboxes: boolean[], dropdownValue: string, dropdownOptions: string[] }>
 *   onCheckboxToggle: (rowId, index) => void
 *   onDropdownChange: (rowId, value) => void
 */