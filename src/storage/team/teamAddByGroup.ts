import AsyncStorage from '@react-native-async-storage/async-storage'

import { TEAM_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'

import { teamGetByGroup } from './teamGetByGroup'

export async function teamAddByGroup(group: string, newTeam: string) {
  try {
    const storedTeams = await teamGetByGroup(group)

    const teamAlreadyExists = storedTeams.includes(newTeam)

    if (teamAlreadyExists) {
      throw new AppError('Já existe um time cadastrado com esse nome.')
    }

    const storage = JSON.stringify([...storedTeams, newTeam])
    await AsyncStorage.setItem(`${TEAM_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
