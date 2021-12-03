import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedGamesResultDto } from './dto/paginated-games-results.dto';
import { Game } from './entities/game.entity';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/')
  create(@Body(ValidationPipe) createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get('/')
  findAll(
    @Query(ValidationPipe) paginationDto: PaginationDto,
    @Query('orderBy') orderBy: string,
    @Query('title') title: string,
  ): Promise<PaginatedGamesResultDto> {
    paginationDto.page = Number(paginationDto.page) || 1;
    paginationDto.limit = Number(paginationDto.limit) || 10;

    return this.gameService.findAll(
      {
        ...paginationDto,
        limit: paginationDto.limit > 100 ? 100 : paginationDto.limit,
      },
      orderBy,
      title,
    );
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.gameService.getGameById(id);
  }

  @Patch('/:id')
  updateGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gameService.updateGame(id, updateGameDto);
  }
}
