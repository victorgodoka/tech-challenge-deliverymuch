import React from 'react'
import styled from 'styled-components'

const MISSGNOIMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
const PokemonImg = styled.img``

export default function (props) {
  return <li onClick={() => props.selectPokemon(props)}>
    <PokemonImg src={props.sprites.front_default || MISSGNOIMG} alt={props.name} />
  </li>
}