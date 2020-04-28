import React from 'react'
import {
  ContainerInfo,
  InfoWrapper,
  Info,
} from './styles'

const ShowInfo = (bucket, isVisible) => {

  return (
    <ContainerInfo isVisible={bucket.isVisible}>
    
      <InfoWrapper>
        <Info>Index do bucket</Info>
        {bucket.bucket?.index}
      </InfoWrapper>
      <InfoWrapper>
        <Info>Index da página</Info>
        {bucket.bucket?.paginaId}
      </InfoWrapper>
      <InfoWrapper>
        <Info>Index da palavra</Info>
        {bucket.bucket?.palavraId}
      </InfoWrapper>
      <InfoWrapper>
        <Info>Palavra</Info>
        {bucket.bucket?.element}
      </InfoWrapper>

    </ContainerInfo>
  )
}

export default ShowInfo