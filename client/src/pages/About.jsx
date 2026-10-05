import TrackerPage from '../components/TrackerPage'

// About (route: "/about")
// What the tracker is, how to use it, and credits.

export default function About() {
  return (
    <TrackerPage title="About">
      <section className="about-page">
        <header className="about-page__header">
          <h3>About this tracker</h3>
        </header>

        <div className="about-page__body">
          <p>
            The Stardew Valley Perfection Tracker helps you keep track of everything you need
            for 100% perfection in one place. It covers shipped items, golden walnuts, fish,
            bundles, cooking and crafting recipes, the Museum, Great Friends, Monster Slayer
            goals, farm progress, and farmer skills. The Dashboard shows your overall progress
            and a ring for each category.
          </p>
          <p>
            Pick a category from the sidebar and tick items off as you finish them. Your
            progress is saved in your own browser, so there is no account or login. Because it
            lives in one browser, use the menu in the top bar to export a backup file, and
            import it later or on another device.
          </p>
          <p>
            This is a free fan project and is not affiliated with or endorsed by ConcernedApe.
            Stardew Valley and its artwork belong to ConcernedApe. Need more detail on an item?
            The Wiki button in the top bar opens the Stardew Valley Wiki.
          </p>
          <p>
            Built by Mary Alexa Ysabelle Pineda for CS 404, with React and Vite. I researched
            the game data myself and used Claude for help with layouts and styling. The code is
            on{' '}
            <a
              href="https://github.com/hrspnd/stardew-perfection-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </TrackerPage>
  )
}