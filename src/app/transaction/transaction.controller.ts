import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransaction, UpdateTransaction, GetAllTransaction } from './dto/request.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DefaultException } from '../../common/common.dto';
import { GetTransactions, Transaction } from './dto/response.dto';

@ApiTags('Transaction')
@ApiBadRequestResponse({ description: 'Bad request', type: DefaultException })
@ApiInternalServerErrorResponse({ description: 'Internal server error', type: DefaultException })
@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @ApiOperation({ operationId: 'getTransactions' })
    @ApiOkResponse({ description: 'Get transactions', type: GetTransactions })
    getTransactions(@Query() filter: GetAllTransaction) {
        return this.transactionService.getTransactions(filter);
    }

    @Get(':id')
    @ApiOperation({ operationId: 'getTransactionByID' })
    @ApiParam({ name: 'id', format: 'uuid' })
    @ApiOkResponse({ description: 'Get transactions by ID', type: Transaction })
    @ApiNotFoundResponse({ description: 'Not found', type: DefaultException })
    getTransactionByID(@Param('id', ParseUUIDPipe) id: string) {
        return this.transactionService.getTransactionById(id);
    }

    @Post()
    @ApiOperation({ operationId: 'createTransaction' })
    @ApiCreatedResponse({ description: 'Create category', type: Transaction })
    @ApiConflictResponse({ description: 'Conflicts', type: DefaultException })
    createTransaction(@Body() createTransactiondata: CreateTransaction) {
        return this.transactionService.createTransaction(createTransactiondata);
    }

    @Patch(':id')
    @ApiOperation({ operationId: 'updateTransaction' })
    @ApiParam({ name: 'id', format: 'uuid' })
    @ApiConflictResponse({ description: 'Conflicts', type: DefaultException })
    @ApiNotFoundResponse({ description: 'Not found', type: DefaultException })
    updateTransaction(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateTransaction) {
        return this.transactionService.updateTransaction(id, data);
    }
}
