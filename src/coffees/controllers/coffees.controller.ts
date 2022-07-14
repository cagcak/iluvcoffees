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
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';
import { CoffessService } from '../services/coffess.service';

@ApiTags('coffes endpoints')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffessService) {}

  @ApiForbiddenResponse({ description: 'Forbidden response' })
  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
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
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
