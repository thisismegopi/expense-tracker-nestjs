import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    createTransaction(@Body() createTransactiondata: CreateTransactionDto) {
        return this.transactionService.createTransaction(createTransactiondata);
    }
}
