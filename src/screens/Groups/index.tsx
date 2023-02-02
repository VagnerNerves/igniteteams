import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Hightlight } from '@components/Highlight'
import { Container } from './styles'

export function Groups() {
  return (
    <Container>
      <Header />

      <Hightlight title="Turmas" subtitle="jogue com a sua turma" />

      <GroupCard title="Galera do Ignite" />
    </Container>
  )
}
