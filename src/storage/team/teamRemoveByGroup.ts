import AsyncStorage from '@react-native-async-storage/async-storage'
import { TEAM_COLLECTION } from '@storage/storageConfig'

import { teamGetByGroup } from './teamGetByGroup'
import { playersRemoveByGroupAndTeam } from '@storage/player/playersRemoveByGroupAndTeam'

export async function teamRemoveByGroup(teamDeleted: string, group: string) {
  try {
    const storage = await teamGetByGroup(group)

    const filtered = storage.filter(team => team !== teamDeleted)
    const teams = JSON.stringify(filtered)

    await AsyncStorage.setItem(`${TEAM_COLLECTION}-${group}`, teams)

    await playersRemoveByGroupAndTeam(group, teamDeleted)
  } catch (error) {
    throw error
  }
}
