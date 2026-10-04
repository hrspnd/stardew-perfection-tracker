/**
 * SkillTracker
 * Layout for: Farmer Level only.
 *
 * One row per skill: 5 checkboxes for levels 1-5, a dropdown for the
 * profession chosen at level 5 (with its effect shown below), 5 more
 * checkboxes for levels 6-10, and a second dropdown for the level-10
 * profession - whose OPTIONS depend on which level-5 profession was chosen,
 * matching the real game's branching profession tree.
 *
 * Props:
 *   skills: Array<{
 *     id, name,
 *     icon?: string,            (optional image URL shown in the card header)
 *     levels1to5: boolean[5],
 *     profession5: string | null,
 *     profession5Options: Array<{ name, description }>,
 *     levels6to10: boolean[5],
 *     profession10: string | null,
 *     profession10OptionsByChoice: { [profession5Name]: Array<{ name, description }> },
 *   }>
 *   onToggleLevel: (skillId, tier, levelIndex) => void
 *   onProfessionChange: (skillId, tier, value) => void
 */

function findDescription(options, name) {
  return options.find((option) => option.name === name)?.description
}

export default function SkillTracker({ skills, onToggleLevel, onProfessionChange }) {
  return (
    <div className="skill-tracker">
      {skills.map((skill) => {
        const profession10Options = skill.profession5
          ? skill.profession10OptionsByChoice[skill.profession5] ?? []
          : []

        const profession5Description = findDescription(skill.profession5Options, skill.profession5)
        const profession10Description = findDescription(profession10Options, skill.profession10)

        return (
          <section key={skill.id} className="skill-tracker__row">
            <header className="skill-tracker__row-header">
              {skill.icon && <img className="skill-tracker__icon" src={skill.icon} alt="" />}
              <h3>{skill.name}</h3>
            </header>

            <div className="skill-tracker__row-body">
              <div className="skill-tracker__tier">
                <div className="skill-tracker__tier-controls">
                  <div className="skill-tracker__levels">
                    {skill.levels1to5.map((checked, index) => (
                      <label key={`5-${index}`} className="skill-tracker__level">
                        <span>{index + 1}</span>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggleLevel(skill.id, 5, index)}
                          aria-label={`${skill.name} level ${index + 1}`}
                        />
                      </label>
                    ))}
                  </div>

                  <select
                    aria-label={`${skill.name} level 5 profession`}
                    value={skill.profession5 ?? ''}
                    onChange={(e) => onProfessionChange(skill.id, 5, e.target.value || null)}
                  >
                    <option value="">Choose profession...</option>
                    {skill.profession5Options.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                {profession5Description && (
                  <p className="skill-tracker__description">{profession5Description}</p>
                )}
              </div>

              <div className="skill-tracker__tier">
                <div className="skill-tracker__tier-controls">
                  <div className="skill-tracker__levels">
                    {skill.levels6to10.map((checked, index) => (
                      <label key={`10-${index}`} className="skill-tracker__level">
                        <span>{index + 6}</span>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggleLevel(skill.id, 10, index)}
                          aria-label={`${skill.name} level ${index + 6}`}
                        />
                      </label>
                    ))}
                  </div>

                  <select
                    aria-label={`${skill.name} level 10 profession`}
                    value={skill.profession10 ?? ''}
                    onChange={(e) => onProfessionChange(skill.id, 10, e.target.value || null)}
                    disabled={profession10Options.length === 0}
                  >
                    <option value="">
                      {skill.profession5 ? 'Choose profession...' : 'Pick a level 5 profession first'}
                    </option>
                    {profession10Options.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                {profession10Description && (
                  <p className="skill-tracker__description">{profession10Description}</p>
                )}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}