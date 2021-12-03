import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import slugify from 'slugify';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { title, category, is_active, provider, images } = createGameDto;

    const game = new Game();
    game.title = title;
    game.slug = slugify(title, {
      lower: true,
    });
    game.category = category;
    game.is_active = is_active;
    game.provider = provider;
    game.images = images;

    try {
      await game.save();

      return game;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
