import React, { Component } from 'react'
import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './styles'
import uberx from '../../assets/uberx.png'

export default class Details extends Component {
  render() {
    return <Container>
      <TypeTitle>Popular</TypeTitle>
      <TypeDescription>Andar com uber mais barato</TypeDescription>
      <TypeImage source={uberx}></TypeImage>
      <TypeTitle>UberX</TypeTitle>
      <RequestButton onPress={() => { }}>
        <RequestButtonText>SILICITAR</RequestButtonText>
      </RequestButton>
    </Container>
  }
}
