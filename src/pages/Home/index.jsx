import React, { Component } from 'react'
import PokemonGrid from '../../components/poke-grid'
import PokemonInfo from '../../components/poke-info'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

const Body = styled.div`
  display: flex;
  align-teims: center;
  flex-wrap: nowrap;
`
const Header = styled.div`
  background: #fff;
  height: 72px;
  width: 33%;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 270px;
  & p {
    color: #d9ad67;
    font-size: 2rem;
    margin-left: 20px;
  }
  &::before {
    display: block;
    width: 0;
    height: 0;
    border-bottom: 80px solid #efe9fc;
    border-right: 80px solid transparent;
    content: "";
    position: absolute;
    right: -82px;
    top: -8px;
  }
  &::after {
    display: block;
    width: 0;
    height: 0;
    border-bottom: 72px solid #fff;
    border-right: 72px solid transparent;
    content: "";
    position: absolute;
    right: -72px;
    top: 0;
  }
`

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      perPage: 35,
      currentPage: 0,
      maxPages: 0,
      selectedMon: undefined
    };

    // this.handlePageClick = this.handlePageClick.bind(this)
    // this.getSinglePokemonData = this.getSinglePokemonData.handlePageClick.bind(this)
    // this.getAllPokemonData = this.getAllPokemonData.handlePageClick.bind(this)
  }

  componentDidMount = () => {
    this.getAllPokemonData(false, false, true)
  }


  handlePageClick = (e) => {
    const selectedPage = e.selected;

    this.setState({
      currentPage: selectedPage
    }, () => {
      this.getAllPokemonData()
    });

  };

  selectPokemon = selectedMon => {
    this.setState({
      selectedMon
    })
  }

  getAllPokemonData = (ev, prev, first) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${this.state.perPage * this.state.currentPage}&limit=${this.state.perPage}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { results, count } = data
        let maxPages = Math.ceil(count / this.state.perPage)
        let pokemonurl = results.map(pkmn => fetch(pkmn.url).then(res => res.json()))
        Promise.all(pokemonurl)
          .then(pokemon => {
            const postData = <PokemonGrid selectPokemon={this.selectPokemon} pokemon={pokemon} />
            this.setState({
              maxPages,
              postData,
              selectedMon: first ? pokemon[0] : this.state.selectedMon
            })
          })
      });
  }

  render() {
    return <main>
      <Header>
        <p>Pokédex</p>
      </Header>
      {/* <button onClick={() => this.getAllPokemonData(true)}>Anterior</button>
      <button onClick={this.getAllPokemonData}>Próximo</button> */}
      {(this.state.postData && this.state.selectedMon)? <>
        <Body>
          {this.state.postData}
          <PokemonInfo selectedMon={this.state.selectedMon} />
        </Body>
        <ReactPaginate
          previousLabel={"anterior"}
          nextLabel={"próxima"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.maxPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </> : ""}
    </main>
  }
}
export default Home