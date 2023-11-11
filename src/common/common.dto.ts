import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
    @ApiProperty({ type: 'string', enum: HttpStatus })
    statusCode: HttpStatus;

    @ApiProperty({ oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] })
    message: string;

    @ApiProperty()
    error: string;
}
