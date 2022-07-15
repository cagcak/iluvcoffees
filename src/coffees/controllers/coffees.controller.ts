import { PaginationQueryDto, ParseIntPipe, Public } from '@iluvcoffee/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom, from, map, switchMap } from 'rxjs';
import { LoggingService } from '../../services';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';
import { CoffessService } from '../services/coffess.service';

@ApiTags('coffes endpoints')
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffessService,
    private readonly loggingService: LoggingService,
  ) {}

  @ApiForbiddenResponse({ description: 'Forbidden response' })
  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Public()
  @Get('logs')
  async allLogs() {
    return this.loggingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(
    // @Protocol('https') protocol: string,
    @Body() createCoffeeDto: CreateCoffeeDto,
  ) {
    return firstValueFrom(
      from(this.coffeesService.create(createCoffeeDto)).pipe(
        switchMap((coffee) => {
          return from(
            this.loggingService.create({
              name: coffee.name,
              timestamp: new Date().toLocaleDateString(),
              description: `Created coffee with id: ${coffee.id}`,
              messages: [coffee.description],
            }),
          ).pipe(map(() => coffee));
        }),
      ),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return firstValueFrom(
      from(this.coffeesService.update(id, updateCoffeeDto)).pipe(
        switchMap((coffee) => {
          return from(
            this.loggingService.create({
              name: coffee.name,
              timestamp: new Date().toLocaleDateString(),
              description: `Modified coffee with id: ${coffee.id}`,
              messages: [`Passed id: ${id}`],
            }),
          ).pipe(map(() => coffee));
        }),
      ),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return firstValueFrom(
      from(this.coffeesService.remove(id)).pipe(
        switchMap((coffee) => {
          return from(
            this.loggingService.create({
              name: coffee.name,
              timestamp: new Date().toLocaleDateString(),
              description: `Deleted coffee with id: ${coffee.id}`,
              messages: [`Passed id: ${id}`],
            }),
          ).pipe(map(() => coffee));
        }),
      ),
    );
  }
}
