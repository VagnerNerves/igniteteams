import AsyncStorage from '@react-native-async-storage/async-storage'

import { TEAM_COLLECTION } from '@storage/storageConfig'

export async function teamGetByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${TEAM_COLLECTION}-${group}`)

    const teams: string[] = storage ? JSON.parse(storage) : []

    return teams
  } catch (error) {
    throw error
  }
}
