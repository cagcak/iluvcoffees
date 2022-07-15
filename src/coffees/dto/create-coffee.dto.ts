import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'name of the coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'brand of the coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ default: '', description: 'desc of desc', nullable: true })
  @IsString({ always: false })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: 'flawors of the coffee', examples: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
