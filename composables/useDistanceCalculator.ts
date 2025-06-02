export function useDistanceCalculator() {
  const config = useRuntimeConfig()
  const isDev = config.app.buildId === 'dev'

  // endpoint path – full URL in development, relative path in production
  const path = isDev
    ? 'http://localhost:3001/api/calculate.php'
    : '/api/calculate.php'

  /**
   * @param pointA – coordinates of the first point
   * @param pointB – coordinates of the second point
   * @returns BackendTest object or null in case of error
   */
  const calculate = async (
    pointA: Coordinates,
    pointB: Coordinates
  ): Promise<BackendTest | null> => {
    try {
      const result = await $fetch<BackendTest>(path, {
        method: 'POST',
        body: { pointA, pointB },
      })
      return result
    } catch (err) {
      console.warn('API error:', err)
      return null
    }
  }

  return { calculate }
}
