import TrackerPage from '../components/TrackerPage'

// About (route: "/about")
// Placeholder text for now: replace the paragraphs below with the real copy.

export default function About() {
  return (
    <TrackerPage title="About">
      <section className="about-page">
        <header className="about-page__header">
          <h3>About this tracker</h3>
        </header>

        <div className="about-page__body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis
            et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin
            mauris. Integer in mauris eu nibh euismod gravida.
          </p>
        </div>
      </section>
    </TrackerPage>
  )
}