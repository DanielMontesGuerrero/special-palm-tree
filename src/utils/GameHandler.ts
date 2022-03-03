import {EnqueuedEvent} from '../game/Event';
import Game from '../game/Game';
import OverviewType from './overviewType';
import {boardOverview, gameOverview, playerOverview} from './print';

type RenderConfig = {
  overviewType: OverviewType;
  selectedPlayerId: number;
};

type RenderConfigOptions = {
  playerId?: number;
};

export default class GameHandler {
  game: Game;

  renderConfig: RenderConfig;

  constructor(game = new Game([])) {
    this.game = game;
    this.renderConfig = {
      overviewType: OverviewType.GAME,
      selectedPlayerId: 0,
    };
  }

  start() {
    this.game.start();
  }

  stop() {
    this.game.stop();
  }

  update() {
    this.game.update();
  }

  pushEvent(event: EnqueuedEvent) {
    this.game.addEvent(event);
  }

  changeRenderConfig(type: OverviewType, options: RenderConfigOptions) {
    this.renderConfig.overviewType = type;
    if (type === OverviewType.PLAYER) {
      this.renderConfig.selectedPlayerId = options.playerId ?? 0;
    }
  }

  renderText() {
    let gameRenderText = '';
    switch (this.renderConfig.overviewType) {
      case OverviewType.GAME:
        gameRenderText = gameOverview(this.game);
        break;
      case OverviewType.BOARD:
        gameRenderText = boardOverview(this.game.board);
        break;
      case OverviewType.PLAYERS:
        this.game.players.forEach((player) => {
          gameRenderText += `${playerOverview(player)}\n`;
        });
        break;
      case OverviewType.PLAYER:
        gameRenderText = playerOverview(this.game.players[this.renderConfig.selectedPlayerId]);
        break;
      default:
        break;
    }
    return gameRenderText;
  }
}
