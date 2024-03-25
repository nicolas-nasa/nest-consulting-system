import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  size?: number = 10;

  @ApiProperty()
  page?: number = 0;

  constructor(PaginationDto) {
    Object.assign(this, PaginationDto);
  }
}
