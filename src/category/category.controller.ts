import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, GetCategoryFilterDto, UpdateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
    constructor(private catService: CategoryService) {}

    @Get()
    getAll(@Query() filter: GetCategoryFilterDto) {
        return this.catService.getCategory(filter);
    }

    @Post()
    createCategory(@Body() data: CreateCategoryDto) {
        return this.catService.createCategory(data);
    }

    @Patch(':id')
    updateCategory(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateCategoryDto) {
        return this.catService.updateCategory(id, data);
    }
}
