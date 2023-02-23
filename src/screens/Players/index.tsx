import { useState, useEffect, useRef, useCallback } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import {
  useRoute,
  useNavigation,
  useFocusEffect
} from '@react-navigation/native'

import { AppError } from '@utils/AppError'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playesGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { teamGetByGroup } from '@storage/team/teamGetByGroup'
import { teamRemoveByGroup } from '@storage/team/teamRemoveByGroup'

import { Header } from '@components/Header'
import { Hightlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import {
  Container,
  ContainerCenter,
  Form,
  HeaderList,
  NumberOfPlayers
} from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoadingTeams, setIsLoadingTeams] = useState(true)
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [teamIsSelected, setTeamIsSelected] = useState('')
  const [teams, setTeams] = useState<string[]>([])
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova Pessoa',
        'Informe o nome da pessoa para adicionar.'
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team: teamIsSelected
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoadingPlayer(true)

      const playersByTeam = await playersGetByGroupAndTeam(
        group,
        teamIsSelected
      )

      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado.'
      )
    } finally {
      setIsLoadingPlayer(false)
    }
  }

  async function fetchTeamsByGroup() {
    try {
      setIsLoadingTeams(true)

      const teamsByGroup = await teamGetByGroup(group)

      setTeams(teamsByGroup)

      teamsByGroup.length > 0
        ? setTeamIsSelected(teamsByGroup[0])
        : setTeamIsSelected('')
    } catch (error) {
      console.log(error)
      Alert.alert('Times', 'Não foi possível carregar os times.')
    } finally {
      setIsLoadingTeams(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  async function teamRemove() {
    try {
      await teamRemoveByGroup(teamIsSelected, group)

      await fetchTeamsByGroup()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover time', 'Não foi possível remover o time.')
    }
  }

  async function handleGroupTeam() {
    Alert.alert('Remover', `Deseja remover o time ${teamIsSelected} ?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => teamRemove()
      }
    ])
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)

      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover grupo', 'Não foi possível remover a turma.')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover a turma?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => groupRemove()
      }
    ])
  }

  function handleNewTeam() {
    navigation.navigate('newteam', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchTeamsByGroup()
    }, [])
  )

  useEffect(() => {
    fetchPlayersByTeam()
  }, [teamIsSelected])

  return (
    <Container>
      <Header showBackButton />

      <Hightlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      {isLoadingTeams ? (
        <Loading />
      ) : (
        <>
          {teams.length === 0 ? (
            <Button title="Criar Time" type="PRIMARY" onPress={handleNewTeam} />
          ) : (
            <>
              <Form>
                <Input
                  inputRef={newPlayerNameInputRef}
                  onChangeText={setNewPlayerName}
                  value={newPlayerName}
                  placeholder="Nome da pessoa"
                  autoCorrect={false}
                  onSubmitEditing={handleAddPlayer}
                  returnKeyType="done"
                />
                <ButtonIcon onPress={handleAddPlayer} icon="add" />
              </Form>

              <HeaderList>
                <FlatList
                  data={teams}
                  keyExtractor={item => item}
                  renderItem={({ item }) => (
                    <Filter
                      title={item}
                      isActive={item === teamIsSelected ? true : false}
                      onPress={() => setTeamIsSelected(item)}
                    />
                  )}
                  horizontal
                />
                <ButtonIcon onPress={handleNewTeam} icon="add" />
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
              </HeaderList>

              {isLoadingPlayer ? (
                <Loading />
              ) : (
                <FlatList
                  data={players}
                  keyExtractor={item => item.name}
                  renderItem={({ item }) => (
                    <PlayerCard
                      name={item.name}
                      onRemove={() => handlePlayerRemove(item.name)}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <ListEmpty message="Não há pessoas neste time" />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                  ]}
                />
              )}

              <ContainerCenter>
                <Button
                  title="Remover Time"
                  type="SECONDARY"
                  onPress={handleGroupTeam}
                  style={{
                    width: '80%'
                  }}
                />
              </ContainerCenter>

              <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
              />
            </>
          )}
        </>
      )}
    </Container>
  )
}
