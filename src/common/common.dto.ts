import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
    @ApiProperty({ enum: HttpStatus })
    statusCode: HttpStatus;

    @ApiProperty()
    message: any;

    @ApiProperty()
    error: string;
}
