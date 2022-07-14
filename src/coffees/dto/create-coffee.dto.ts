import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'name of the coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'brand of the coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'description of the coffee', nullable: true })
  // @IsNotEmpty({ message: 'must be string if exist' })
  // @IsString({ always: false, message: 'description must be exsit' })
  readonly description: string;

  @ApiProperty({ description: 'flawors of the coffee', examples: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
