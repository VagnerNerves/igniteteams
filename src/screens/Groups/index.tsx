import { useState } from 'react'
import { FlatList } from 'react-native'

import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Hightlight } from '@components/Highlight'

import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket'])

  return (
    <Container>
      <Header />

      <Hightlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  )
}
