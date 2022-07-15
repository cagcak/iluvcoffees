import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLoggingDto {
  @ApiProperty({ description: 'name of the log' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'timestamp of the log' })
  @IsString()
  readonly timestamp: string;

  @ApiProperty({ description: 'description of the log', nullable: true })
  readonly description: string;

  @ApiProperty({ description: 'messages of the log', examples: [] })
  @IsString({ each: true })
  readonly messages: string[];
}
