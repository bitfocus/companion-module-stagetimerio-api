/**
 * Companion color of a `#rrggbb` group color.
 *
 * @param {string | null | undefined} hex
 * @returns {number | null} null when there is no valid color
 */
export function hexToCompanionColor (hex) {
  if (typeof hex !== 'string' || !/^#[0-9a-f]{6}$/i.test(hex)) return null
  return parseInt(hex.slice(1), 16)
}
