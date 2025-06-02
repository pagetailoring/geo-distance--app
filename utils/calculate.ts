// https://en.wikipedia.org/wiki/Earth_radius
// https://en.wikipedia.org/wiki/Haversine_formula

/**
 * Calculates the Haversine distance between two geographic coordinates
 * @param from - coordinates of point A
 * @param to - coordinates of point B
 * @param earthRadius - radius of the Earth in meters (default: 6371000)
 * @returns distance in meters
 */
export function calculateHaversineDistance(
  from: Coordinates,
  to: Coordinates,
  earthRadius = 6371000 // default in meters
): number {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180)

  const lat1 = toRadians(from.latitude)
  const lon1 = toRadians(from.longitude)
  const lat2 = toRadians(to.latitude)
  const lon2 = toRadians(to.longitude)

  const dLat = lat2 - lat1
  const dLon = lon2 - lon1

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

  const c = 2 * Math.asin(Math.sqrt(a))

  return getRounded(earthRadius * c)
}
