import React from 'react'
import Pokemon from '../pokemon'
import styled from 'styled-components'

const Main = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 768px;
`

const Grid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(255,255,255,.33);
  border-radius: 15px;
  width: 100%;
`

export default function (props) {
  return <Main>
    <Grid>
      {props.pokemon.map((pkmn, i) => <Pokemon key={i} selectPokemon={props.selectPokemon} {...pkmn} />)}
    </Grid>
  </Main>
}