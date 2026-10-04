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
 *     subItems?: Array<{ id, label, checked, note?, disabled? }>,   // grouped cards
 *                       // note: small text under the label; disabled: shown but not clickable
 *   }>
 *   size?: "sm" | "lg"
 *   onToggleCard?: (cardId) => void               // leaf cards (clicks are ignored if omitted)
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
                id={`card-${card.id}`}
                checked={headerChecked}
                disabled={!isLeaf}
                aria-label={isLeaf ? undefined : `${card.title}: all items`}
                onChange={isLeaf ? () => onToggleCard?.(card.id) : undefined}
              />
              <h3>{isLeaf ? <label htmlFor={`card-${card.id}`}>{card.title}</label> : card.title}</h3>
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
                        id={`card-${card.id}-${item.id}`}
                        checked={Boolean(item.checked)}
                        disabled={item.disabled}
                        onChange={() => onToggleSubItem?.(card.id, item.id)}
                      />
                      <label htmlFor={`card-${card.id}-${item.id}`}>
                        {item.label}
                        {item.note && <small className="card-grid-tracker__note">{item.note}</small>}
                      </label>
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