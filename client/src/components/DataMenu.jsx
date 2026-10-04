import { useEffect, useRef, useState } from 'react'
import { exportData, importData, resetData } from '../api'

/**
 * DataMenu
 * Hamburger button in the top bar. Opens a small menu for the saved progress:
 * Export, Import, and (set apart, in red) Reset. Reset asks first, and offers
 * a backup download, because Export is the only undo this app has.
 * All data work goes through ../api; this file never touches storage.
 */

async function downloadBackup() {
  const text = await exportData()
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `stardew-progress-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export default function DataMenu() {
  const [open, setOpen] = useState(false)
  const [backedUp, setBackedUp] = useState(false)
  const wrapperRef = useRef(null)
  const toggleRef = useRef(null)
  const listRef = useRef(null)
  const fileInput = useRef(null)
  const dialogRef = useRef(null)

  // While the menu is open: Escape or a click elsewhere closes it, and focus
  // moves to the first item so it works from the keyboard.
  useEffect(() => {
    if (!open) return undefined

    listRef.current?.querySelector('button')?.focus()

    function onPointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Up/Down arrows move between menu items.
  function handleListKeyDown(event) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = [...listRef.current.querySelectorAll('button')]
    const current = items.indexOf(document.activeElement)
    const step = event.key === 'ArrowDown' ? 1 : -1
    items[(current + step + items.length) % items.length].focus()
  }

  async function handleExport() {
    setOpen(false)
    try {
      await downloadBackup()
    } catch (err) {
      window.alert(`Export failed: ${err.message}`)
    }
  }

  // Load progress from a file made by Export. Reloads so every page shows it.
  async function handleImportFile(event) {
    const file = event.target.files?.[0]
    event.target.value = '' // lets the same file be chosen again later
    if (!file) return
    if (!window.confirm('Importing replaces your current progress. Continue?')) return

    try {
      await importData(await file.text())
      window.location.reload()
    } catch (err) {
      window.alert(`Import failed: ${err.message}`)
    }
  }

  function openResetDialog() {
    setOpen(false)
    setBackedUp(false)
    dialogRef.current?.showModal()
  }

  async function handleBackupFirst() {
    try {
      await downloadBackup()
      setBackedUp(true)
    } catch (err) {
      window.alert(`Export failed: ${err.message}`)
    }
  }

  async function handleReset() {
    try {
      await resetData()
      window.location.reload()
    } catch (err) {
      dialogRef.current?.close()
      window.alert(`Reset failed: ${err.message}`)
    }
  }

  return (
    <div className="data-menu" ref={wrapperRef}>
      <button
        type="button"
        ref={toggleRef}
        className="data-menu__toggle"
        aria-label="Progress menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <div className="data-menu__list" role="menu" ref={listRef} onKeyDown={handleListKeyDown}>
          <button type="button" role="menuitem" className="data-menu__item" onClick={handleExport}>
            Export progress
          </button>
          <button
            type="button"
            role="menuitem"
            className="data-menu__item"
            onClick={() => {
              setOpen(false)
              fileInput.current?.click()
            }}
          >
            Import progress
          </button>
          <div className="data-menu__divider" role="separator" />
          <button
            type="button"
            role="menuitem"
            className="data-menu__item data-menu__item--danger"
            onClick={openResetDialog}
          >
            Reset progress
          </button>
        </div>
      )}

      <input
        ref={fileInput}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={handleImportFile}
      />

      <dialog ref={dialogRef} className="data-menu__dialog" aria-labelledby="reset-title">
        <h2 id="reset-title">Reset all progress?</h2>
        <p>
          This clears every checkbox in every tracker and can&rsquo;t be undone. If you might want
          it back, download a backup first.
        </p>
        <div className="data-menu__actions">
          <button
            type="button"
            className="data-menu__action"
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            Cancel
          </button>
          <button type="button" className="data-menu__action" onClick={handleBackupFirst}>
            {backedUp ? 'Backup downloaded' : 'Download backup'}
          </button>
          <button
            type="button"
            className="data-menu__action data-menu__action--danger"
            onClick={handleReset}
          >
            Reset progress
          </button>
        </div>
      </dialog>
    </div>
  )
}