/**
 * CardGridTracker
 * Shared layout for: Obelisks, Golden Clock, Stardrops, Monster Slayer,
 * Museum, Great Friends.
 *
 * Renders a grid of cards, each with a header checkbox + title,
 * an image placeholder, and a few sub-item rows with their own checkboxes.
 * Card size varies (Museum is bigger than Obelisks/Stardrops) — pass size prop.
 *
 * Props (draft):
 *   title: string
 *   cards: Array<{ id, title, checked, image, subItems: Array<{ id, label, checked }> }>
 *   size: "sm" | "lg"
 *   onToggleCard: (id) => void
 *   onToggleSubItem: (cardId, subItemId) => void
 */