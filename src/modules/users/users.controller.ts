import {
    Controller,
    Get,
    Query,
    Param,
    Post,
    Body,
    Delete,
    Req,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/core/guard/jwt-auth.guard';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'Returns current user data' })
    @Get('me')
    getMe(@Req() req: Request) {
        const userId = req['user'].id;
        return this.usersService.getUserMe(userId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users (admin only)' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @ApiQuery({ name: 'role', required: false, enum: Role })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiResponse({ status: 200, description: 'Paginated list of users' })
    @Get()
    getAllUsers(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('isActive') isActive?: string,
        @Query('role') role?: Role,
        @Query('search') search?: string,
    ) {
        return this.usersService.getAllUser(
            page ? +page : 1,
            limit ? +limit : 8,
            isActive === 'true' ? true : isActive === 'false' ? false : undefined,
            role,
            search,
        );
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user by ID (admin only)' })
    @ApiResponse({ status: 200, description: 'Returns user by ID' })
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }

    @ApiOperation({ summary: 'Create a new user (public)' })
    @ApiResponse({ status: 201, description: 'User successfully created' })
    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user by ID (admin only)' })
    @ApiResponse({ status: 200, description: 'User successfully deleted' })
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
