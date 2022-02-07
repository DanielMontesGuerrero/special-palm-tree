const DefaultVaules = {
  health: 100,
  defense: 10,
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

  applyDamage(attack: number) {
    this.health -= Math.max(0, attack - 4 * this.defense ** (1 / 1.7));
    if (this.health < 0) this.health = 0;
  }

  applyDefense(defense: number) {
    if (this.isAlive()) {
      this.defense = Math.min(100, this.defense + defense);
    }
  }

  applyHealth(health: number) {
    if (this.isAlive()) {
      this.health = Math.min(100, this.health + health);
    }
  }
}
