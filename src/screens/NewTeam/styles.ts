import { SafeAreaView } from 'react-native-safe-area-context'

import styled, { css } from 'styled-components/native'

import { UsersThree, NotePencil } from 'phosphor-react-native'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`

export const Content = styled.View`
  flex: 1;
  padding-top: 24px;
`

export const Icon = styled(NotePencil).attrs(({ theme }) => ({
  size: 56,
  color: theme.COLORS.GREEN_700
}))`
  align-self: center;
`

export const TitleGroup = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}

  text-align: center;
  margin-bottom: 24px;
`
