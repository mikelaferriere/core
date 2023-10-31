import * as Config from '../../config'

import axios from 'axios'

/**
 * Retreives a user's activity information
 *
 * @param user
 * @returns
 */
export const getUserActivityInformation = async (
  user: string
): Promise<any> => {
  const host = Config.getHost()
  const { data } = await axios.get(
    `${host}/api/v4/fitbit/activity/${user.toLocaleLowerCase()}`
  )

  return data
}
