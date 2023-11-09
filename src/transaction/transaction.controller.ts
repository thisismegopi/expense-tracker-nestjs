import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto, getTransactionDto } from './dto';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    getTransactions(@Query() filter: getTransactionDto) {
        return this.transactionService.getTransactions(filter);
    }

    @Get(':id')
    getTransactionByID(@Param('id', ParseUUIDPipe) id: string) {
        return this.transactionService.getTransactionById(id);
    }

    @Post()
    createTransaction(@Body() createTransactiondata: CreateTransactionDto) {
        return this.transactionService.createTransaction(createTransactiondata);
    }

    @Patch(':id')
    updateTransaction(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateTransactionDto) {
        return this.transactionService.updateTransaction(id, data);
    }
}
