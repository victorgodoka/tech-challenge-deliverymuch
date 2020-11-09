import React from 'react'
import styled from 'styled-components'
import CanvasJSReact from '../../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MISSGNOIMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"

const Main = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`

const Block = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  text-align: center;
  border-radius: 10px;
  background: #fff;
`

const PokemonName = styled.p`
  font-size: 1.5rem;
  color: #a284da;
  border-radius: 0 0 10px 10px;
  padding: 5px 0;
  text-transform: uppercase;
`

const PokemonNum = styled.p`
  font-size: 1.5rem;
  border-radius: 10px 10px 0 0;
  background: #a284da;
  padding: 5px 0;
  color: #fff;
  font-weight: 600;
`

const PokemonImg = styled.img`
  width: 100%;
  max-width: 200px;
`

const completeZeros = id => id > 99 ? id : id > 9 ? "0" + id : "00" + id

export default function (props) {
  const options = {
    animationEnabled: true,
    theme: "light2",
    // title: {
    //   text: "Most Popular Social Networking Sites"
    // },
    axisX: {
      title: "Pokémon Stats",
      reversed: true,
    },
    axisY: {
      title: "",
      includeZero: true
    },
    data: [{
      type: "bar",
      dataPoints: [
        { y: props.selectedMon.stats[0].base_stat, label: "HP" },
        { y: props.selectedMon.stats[1].base_stat, label: "ATK" },
        { y: props.selectedMon.stats[2].base_stat, label: "DEF" },
        { y: props.selectedMon.stats[3].base_stat, label: "SPATK" },
        { y: props.selectedMon.stats[4].base_stat, label: "SPDEF" },
        { y: props.selectedMon.stats[5].base_stat, label: "SPD" }
      ]
    }]
  }
  return <Main>
    <PokemonImg src={props.selectedMon.sprites.other["official-artwork"].front_default || MISSGNOIMG} alt={props.selectedMon.name} />
    <Block>
      <PokemonNum>No. {completeZeros(props.selectedMon.id)}</PokemonNum>
      <PokemonName>{props.selectedMon.name}</PokemonName>
    </Block>
    <CanvasJSChart options={options} />
  </Main> 
}