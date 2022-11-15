import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
    console.log(`One: 1--> Constructor`);
  }

  componentDidMount() {
    console.log(`Three: 3--> componentDidMount`);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }
  render() {
    console.log(`Two: 2--> Render`);
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    });

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search monsters"
          onChange={(event) => {
            console.log(`starting array is`, {
              startingArray: this.state.monsters,
            });

            const searchField = event.target.value.toLocaleLowerCase();
            this.setState(
              () => {
                return { searchField };
              },
              () => {
                console.log(`Ending Array is`, {
                  endingArray: this.state.monsters,
                });
              }
            );
          }}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
