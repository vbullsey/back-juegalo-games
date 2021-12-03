import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { PaginatedGamesResultDto } from './dto/paginated-games-results.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.gameRepository.createGame(createGameDto);
  }

  async findAll(
    paginationDto: PaginationDto,
    orderBy: string,
    title: string,
  ): Promise<PaginatedGamesResultDto> {
    const skippedGames = (paginationDto.page - 1) * paginationDto.limit;
    const count = await this.gameRepository.count();

    const order =
      orderBy === 'asc' ? 'ASC' : orderBy === 'desc' ? 'DESC' : 'ASC';

    const query = this.gameRepository.createQueryBuilder('game');

    query
      .orderBy('created_at', order)
      .offset(skippedGames)
      .limit(paginationDto.limit);

    if (title) {
      query.andWhere('(game.title LIKE :title)', { title: `%${title}%` });
    }

    try {
      const games = await query.getMany();

      return {
        count,
        page: paginationDto.page,
        limit: paginationDto.limit,
        games: games,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateGame(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.getGameById(id);

    const {
      title,
      slug,
      category,
      is_active,
      rating,
      votes,
      provider,
      images,
    } = updateGameDto;

    game.title = title;
    game.slug = slug;
    game.category = category;
    game.is_active = is_active;
    game.rating = rating;
    game.votes = votes;
    game.provider = provider;
    game.images = images;

    await game.save();

    const gameResult = await this.getGameById(id);

    return gameResult;
  }

  async getGameById(id: number) {
    const game = await this.gameRepository.findOne({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }

    return game;
  }
}
