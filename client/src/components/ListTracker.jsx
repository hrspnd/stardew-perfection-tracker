/**
 * ListTracker
 * Shared layout for: Produce/Forage Shipped, Golden Walnuts, Fish Caught,
 * Bundles, Cooking Recipes, Crafting Recipes.
 *
 * Renders a checklist as rows: [checkbox] [icon] [name] + N data columns.
 * Column count varies by page (e.g. Cooking/Crafting use 2 columns,
 * Shipped/Walnuts/Fish/Bundles use 3) — pass columns as a prop.
 *
 * Props (draft):
 *   title: string
 *   items: Array<{ id, name, icon, checked, columns: string[] }>
 *   columnHeaders: string[]
 *   onToggle: (id) => void
 */