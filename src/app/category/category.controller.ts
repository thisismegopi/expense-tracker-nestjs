import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategory, GetAllCategory, UpdateCategory } from './dto/request.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Category } from './dto/response.dto';
import { DefaultException } from '../../common/common.dto';

@ApiTags('Category')
@ApiBadRequestResponse({ description: 'Bad request', type: DefaultException })
@ApiInternalServerErrorResponse({ description: 'Internal server error', type: DefaultException })
@Controller('category')
export class CategoryController {
    constructor(private catService: CategoryService) {}

    @Get()
    @ApiOperation({ operationId: 'getAllCategory' })
    @ApiOkResponse({ description: 'Get all categories', isArray: true, type: Category })
    getAllCategory(@Query() filter: GetAllCategory) {
        return this.catService.getCategory(filter);
    }

    @Post()
    @ApiOperation({ operationId: 'createCategory' })
    @ApiCreatedResponse({ description: 'Create category', type: Category })
    @ApiConflictResponse({ description: 'Conflicts', type: DefaultException })
    createCategory(@Body() data: CreateCategory) {
        return this.catService.createCategory(data);
    }

    @Patch(':id')
    @ApiOperation({ operationId: 'updateCategory' })
    @ApiParam({ name: 'id', format: 'uuid' })
    @ApiOkResponse({ description: 'Update category', type: Category })
    @ApiNotFoundResponse({ description: 'Not found', type: DefaultException })
    updateCategory(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateCategory) {
        return this.catService.updateCategory(id, data);
    }
}
