import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersgetByGroup } from './playesGetByGroup'

export async function playersRemoveByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playersgetByGroup(group)

    const filtered = storage.filter(player => player.team !== team)
    const players = JSON.stringify(filtered)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
  } catch (error) {
    throw error
  }
}
