import { Game } from '../entities/game.entity';

export class PaginatedGamesResultDto {
  games: Game[];
  page: number;
  limit: number;
  count: number;
}
