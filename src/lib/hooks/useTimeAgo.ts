import { useCallback } from 'react'

import { differenceInSeconds } from 'date-fns'

export type TimeAgoOptions = {
  format?: 'long' | 'short'
}

export function useGetTimeAgo() {
  return useCallback(
    (
      earlier: number | string | Date,
      later: number | string | Date,
      options?: TimeAgoOptions,
    ) => {
      return dateDiff(earlier, later, { format: options?.format })
    },
    [],
  )
}

const NOW = 5
const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const MONTH_30 = DAY * 30

/**
 * Returns the difference between `earlier` and `later` dates, formatted as a
 * natural language string.
 *
 * - All month are considered exactly 30 days.
 * - Dates assume `earlier` <= `later`, and will otherwise return 'now'.
 * - Differences >= 360 days are returned as the "M/D/YYYY" string
 * - All values round down
 */
export function dateDiff(
  earlier: number | string | Date,
  later: number | string | Date,
  options: TimeAgoOptions,
): string {
  const format = options?.format || 'short'
  const long = format === 'long'
  const diffSeconds = differenceInSeconds(new Date(later), new Date(earlier))

  if (diffSeconds < NOW) {
    return `now`
  } else if (diffSeconds < MINUTE) {
    return `${diffSeconds}${
      long
        ? ` ${plural(diffSeconds, { one: 'second', other: 'seconds' })}`
        : 's'
    }`
  } else if (diffSeconds < HOUR) {
    const diff = Math.floor(diffSeconds / MINUTE)
    return `${diff}${
      long ? ` ${plural(diff, { one: 'minute', other: 'minutes' })}` : 'm'
    }`
  } else if (diffSeconds < DAY) {
    const diff = Math.floor(diffSeconds / HOUR)
    return `${diff}${
      long ? ` ${plural(diff, { one: 'hour', other: 'hours' })}` : 'h'
    }`
  } else if (diffSeconds < MONTH_30) {
    const diff = Math.floor(diffSeconds / DAY)
    return `${diff}${
      long ? ` ${plural(diff, { one: 'day', other: 'days' })}` : 'd'
    }`
  } else {
    const diff = Math.floor(diffSeconds / MONTH_30)
    if (diff < 12) {
      return `${diff}${
        long ? ` ${plural(diff, { one: 'month', other: 'months' })}` : 'mo'
      }`
    } else {
      const str = new Date(earlier).toLocaleDateString()

      if (long) {
        return `on ${str}`
      }
      return str
    }
  }
}

function plural(time: number, { one, other }: { one: string; other: string }) {
  return time > 1 ? other : one
}
