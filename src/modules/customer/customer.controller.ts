import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, InternalServerErrorException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import type { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { CustomerDto } from 'src/dtos/customer/customer.dto';
import { FindCustomersDto } from 'src/dtos/customer/findCustomers.dto';
import { Customer } from 'src/entitites/customer/customer.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('customers')
export class CustomerController {

    constructor(
        @Inject(DITokensService.CUSTOMER_SERVICE)
        private readonly customerService: ICustomerService
    ) { }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    async createCustomerAsync(@Body() customer: CustomerDto): Promise<void> {
        await this.customerService.createCustomerAsync(customer);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async updateCustomerAsync(@Param('id') id: string, @Body() customer: Customer): Promise<void> {
        await this.customerService.updateCustomerAsync(id, customer);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getCustomerAsync(@Param('id') id: string) {
        const customer = await this.customerService.getCustomerByIdAsync(id);
        return customer;
    }

    @Get('')
    @UseGuards(AuthGuard, AdminGuard)
    async getCustomersAsync(@Query() params: FindCustomersDto) {
        const customers = await this.customerService.getCustomersAsync(params);
        return customers;
    }

    @Post('/:id/disable')
    @UseGuards(AuthGuard, AdminGuard)
    @HttpCode(HttpStatus.OK)
    async disableCustomerAsync(@Param('id') id: string) {
        await this.customerService.disableCustomerAsync(id);
    }
}
