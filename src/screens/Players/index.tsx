import { Header } from '@components/Header'
import { Hightlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'

import { Container } from './styles'

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Hightlight
        title="Nome da Turma"
        subtitle="adicione a galera e separe os times"
      />

      <ButtonIcon />
    </Container>
  )
}
