export default class KillReporter {
  unreportedKills: number;

  totalKills: number;

  constructor() {
    this.unreportedKills = 0;
    this.totalKills = 0;
  }

  addKill() {
    this.unreportedKills += 1;
  }

  acknowledge() {
    this.totalKills += this.unreportedKills;
    this.unreportedKills = 0;
  }
}
