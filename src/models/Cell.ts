const DefaultVaules = {
  health: 100,
  defense: 100,
};

export default class Cell {
  health: number;

  defense: number;

  constructor(health: number = DefaultVaules.health, defense: number = DefaultVaules.defense) {
    this.health = health;
    this.defense = defense;
  }

  isAlive() {
    return this.health > 0;
  }
}
