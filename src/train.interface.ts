import { ApiProperty } from '@nestjs/swagger';

export interface Train {
  number: number;
  departureCity: string;
  arrivalCity: string;
  departureTime: number;
  travelTime: number;
  seatsAvailable: number;
}

export class TrainResponse implements Train {
  @ApiProperty({
    type: 'number',
    example: 42,
  })
  number: number;
  @ApiProperty({
    type: 'string',
    example: 'Новороссийск',
  })
  departureCity: string;
  @ApiProperty({
    type: 'string',
    example: 'Краснодар',
  })
  arrivalCity: string;
  @ApiProperty({
    type: 'number',
    example: 12 * 60 + 42,
  })
  departureTime: number;
  @ApiProperty({
    type: 'number',
    example: 42666,
  })
  travelTime: number;
  @ApiProperty({
    type: 'number',
    example: 13,
  })
  seatsAvailable: number;
}
