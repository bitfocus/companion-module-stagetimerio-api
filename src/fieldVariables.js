const CURRENT_PREFIX = 'currentTimerField.'
const NEXT_PREFIX = 'nextTimerField.'

/**
 * Companion drops a variable ID with other characters than letters, digits, `-`, `_` and `.`.
 *
 * @param {string} key
 * @returns {string} `VT image` becomes `vt_image`. Empty when no usable character remains.
 */
export function slugifyFieldKey (key) {
  return key
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

/**
 * @param {unknown} value - any JSON value
 * @returns {string|number|boolean|undefined} nested values as a JSON string, for `jsonpath`
 */
export function toVariableValue (value) {
  if (value === null || value === undefined) return undefined
  return typeof value === 'object' ? JSON.stringify(value) : /** @type {string|number|boolean} */ (value)
}

/**
 * @param {Record<string, unknown>} [fields]
 * @returns {string} empty when the timer has no fields
 */
export function formatFieldsJson (fields) {
  return fields && Object.keys(fields).length ? JSON.stringify(fields) : ''
}

/**
 * @param {Iterable<string>} slugs
 * @returns {{variableId: string, name: string}[]}
 */
export function fieldVariableDefinitions (slugs) {
  return [...slugs].flatMap((slug) => [
    { variableId: `${CURRENT_PREFIX}${slug}`, name: `Current timer field: ${slug}` },
    { variableId: `${NEXT_PREFIX}${slug}`, name: `Next timer field: ${slug}` },
  ])
}

/**
 * @param {Set<string>} knownSlugs
 * @param {string} prefix
 * @param {Record<string, unknown>} [fields]
 * @returns {{newSlugs: string[], values: Record<string, string|number|boolean|undefined>}}
 *   `values` holds every known slug. A key this timer lacks is undefined, or the variable keeps
 *   the previous timer's value.
 */
function buildFieldValues (knownSlugs, prefix, fields) {
  const bySlug = new Map()
  for (const [key, value] of Object.entries(fields ?? {})) {
    const slug = slugifyFieldKey(key)
    if (slug) bySlug.set(slug, toVariableValue(value))
  }

  const slugs = new Set([...knownSlugs, ...bySlug.keys()])
  const values = Object.fromEntries([...slugs].map((slug) => [`${prefix}${slug}`, bySlug.get(slug)]))
  return { newSlugs: [...bySlug.keys()].filter((slug) => !knownSlugs.has(slug)), values }
}

export const buildCurrentFieldValues = (knownSlugs, fields) => buildFieldValues(knownSlugs, CURRENT_PREFIX, fields)
export const buildNextFieldValues = (knownSlugs, fields) => buildFieldValues(knownSlugs, NEXT_PREFIX, fields)
