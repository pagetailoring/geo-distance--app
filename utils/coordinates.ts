/**
 * Checks if the provided coordinates are valid geographic values.
 * @param coords - coordinates to validate
 * @returns true if valid, false otherwise
 */
export function isValidCoordinates(coords: Coordinates): boolean {
  const { latitude, longitude } = coords

  const isLatValid =
    typeof latitude === 'number' && latitude >= -90 && latitude <= 90
  const isLonValid =
    typeof longitude === 'number' && longitude >= -180 && longitude <= 180

  return isLatValid && isLonValid
}
