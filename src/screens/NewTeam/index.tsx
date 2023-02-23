import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Hightlight } from '@components/Highlight'
import { Input } from '@components/Input'

import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'

import { Container, Content, Icon } from './styles'

type RouteParams = {
  group: string
}

export function NewTeam() {
  const [team, setTeam] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  async function handleNew() {
    try {
      if (team.trim().length === 0) {
        return Alert.alert('Novo Time', 'Informe o nome do time.')
      }

      // await groupCreate(group)
      navigation.goBack()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Time', error.message)
      } else {
        Alert.alert('Novo Time', 'Não foi possivel criar um novo time.')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        {/* <Hightlight title={group} subtitle="" /> */}
        <Icon />

        <Hightlight
          title="Novo Time"
          subtitle="crie um time para adicionar as pessoas"
        />

        <Input placeholder="Nome do Time" onChangeText={setTeam} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
