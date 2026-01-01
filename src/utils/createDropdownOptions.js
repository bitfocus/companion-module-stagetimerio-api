/**
 * Converts an enum object to an array of objects for creating Companion action dropdowns.
 *
 * @param {Object.<string, string>} enumObj
 * @returns {CompanionDropdownOptions}
 */
export function createDropdownOptions (enumObj) {
  const optionsList = Object.entries(enumObj).map(([key, val]) => ({ id: key, label: val }))

  return [
    { id: 0, label: '(Default)' },
    ...optionsList,
  ]
}
