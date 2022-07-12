import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'name of the coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'brand of the coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'flawors of the coffee', examples: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
