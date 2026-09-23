/**
 * CardGridTracker
 * Shared layout for: Farm Progress (Obelisks / Golden Clock / Stardrops),
 * Monster Slayer, Museum, Great Friends.
 *
 * Renders a grid of cards. Two card shapes are supported:
 *
 * 1. GROUPED card (e.g. Farm Progress "Obelisks"): a title + several
 *    sub-items, each with its own checkbox. The card header checkbox
 *    reflects whether all sub-items are checked, and is not directly
 *    clickable itself.
 *
 * 2. LEAF card (e.g. one card per monster type, museum item, or villager):
 *    no sub-items — the header checkbox IS the card's own checked state,
 *    and clicking it toggles that one item. Pass `details` (plain text
 *    lines, not checkboxes) for extra info like a kill count or heart level.
 *
 * A card is a leaf card when it has no `subItems` (or an empty array) and
 * instead has a top-level `checked` boolean.
 *
 * Props:
 *   cards: Array<{
 *     id: string,
 *     title: string,
 *     image?: string,
 *     checked?: boolean,                        // leaf cards
 *     details?: string[],                        // leaf cards, optional
 *     subItems?: Array<{ id, label, checked }>,   // grouped cards
 *   }>
 *   size?: "sm" | "lg"
 *   onToggleCard?: (cardId) => void               // leaf cards
 *   onToggleSubItem?: (cardId, subItemId) => void  // grouped cards
 */

export default function CardGridTracker({ cards, size = 'sm', onToggleCard, onToggleSubItem }) {
  return (
    <div className={`card-grid-tracker card-grid-tracker--${size}`}>
      {cards.map((card) => {
        const isLeaf = !card.subItems || card.subItems.length === 0
        const headerChecked = isLeaf
          ? Boolean(card.checked)
          : card.subItems.every((item) => item.checked)

        return (
          <section key={card.id} className="card-grid-tracker__card">
            <header className="card-grid-tracker__card-header">
              <input
                type="checkbox"
                checked={headerChecked}
                readOnly={!isLeaf}
                onChange={isLeaf ? () => onToggleCard(card.id) : undefined}
              />
              <h3>{card.title}</h3>
            </header>

            <div className="card-grid-tracker__card-body">
              {card.image ? (
                <img className="card-grid-tracker__image" src={card.image} alt="" />
              ) : (
                <span className="card-grid-tracker__image card-grid-tracker__image--placeholder" />
              )}

              {isLeaf ? (
                (card.details ?? []).length > 0 && (
                  <ul className="card-grid-tracker__details">
                    {card.details.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                )
              ) : (
                <ul className="card-grid-tracker__sub-items">
                  {card.subItems.map((item) => (
                    <li key={item.id}>
                      <input
                        type="checkbox"
                        checked={Boolean(item.checked)}
                        onChange={() => onToggleSubItem(card.id, item.id)}
                      />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}