import { useNavigation } from '@react-navigation/native'

import { Container, Logo, BackButton, BackIcon } from './styles'

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean
  navigationGoBack?: boolean
}

export function Header({
  showBackButton = false,
  navigationGoBack = false
}: Props) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigationGoBack ? navigation.goBack() : navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
