import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import type { ICustomerService } from 'src/constants/contracts/customer/ICustomerService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { CustomerDto } from 'src/dtos/customer/customer.dto';
import { FindCustomersDto } from 'src/dtos/customer/findCustomers.dto';
import { Customer } from 'src/entitites/customer/customer.entity';

@Controller('customers')
export class CustomerController {

    constructor(
        @Inject(DITokensService.CUSTOMER_SERVICE)
        private readonly customerService: ICustomerService
    ) { }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    async createCustomerAsync(@Body() customer: CustomerDto): Promise<void> {
        try {
            await this.customerService.createCustomerAsync(customer);

        } catch (error: any) {
            // 🧠 Caso já seja um erro do Nest (por ex. BadRequestException)
            if (error instanceof HttpException) {
                throw error;
            }

            // 🧩 Caso o serviço tenha lançado um erro conhecido
            if (error.name === 'BadRequestException') {
                throw new BadRequestException(error.message);
            }

            // 💥 Caso seja um erro inesperado (bug, falha de DB etc.)
            throw new InternalServerErrorException(
                error.message || 'Erro interno no servidor',
            );
        }
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async updateCustomerAsync(@Param('id') id: string, @Body() customer: Customer): Promise<void> {
        try {
            await this.customerService.updateCustomerAsync(id, customer);

        } catch (error: any) {
            // 🧠 Caso já seja um erro do Nest (por ex. BadRequestException)
            if (error instanceof HttpException) {
                throw error;
            }

            // 🧩 Caso o serviço tenha lançado um erro conhecido
            if (error.name === 'BadRequestException') {
                throw new BadRequestException(error.message);
            }

            // 💥 Caso seja um erro inesperado (bug, falha de DB etc.)
            throw new InternalServerErrorException(
                error.message || 'Erro interno no servidor',
            );
        }
    }

    @Get('/:id')
    async getCustomerAsync(@Param('id') id: string) {
        try {
            const customer = await this.customerService.getCustomerByIdAsync(id);
            return customer;
        } catch (error: any) {
            // 🧠 Caso já seja um erro do Nest (por ex. BadRequestException)
            if (error instanceof HttpException) {
                throw error;
            }

            // 🧩 Caso o serviço tenha lançado um erro conhecido
            if (error.name === 'BadRequestException') {
                throw new BadRequestException(error.message);
            }

            // 💥 Caso seja um erro inesperado (bug, falha de DB etc.)
            throw new InternalServerErrorException(
                error.message || 'Erro interno no servidor',
            );
        }
    }

    @Get('')
    async getCustomersAsync(@Query() params: FindCustomersDto) {
        try {
            const customers = await this.customerService.getCustomersAsync(params);
            return customers;

        } catch (error: any) {
            // 🧠 Caso já seja um erro do Nest (por ex. BadRequestException)
            if (error instanceof HttpException) {
                throw error;
            }

            // 🧩 Caso o serviço tenha lançado um erro conhecido
            if (error.name === 'BadRequestException') {
                throw new BadRequestException(error.message);
            }

            // 💥 Caso seja um erro inesperado (bug, falha de DB etc.)
            throw new InternalServerErrorException(
                error.message || 'Erro interno no servidor',
            );
        }
    }

    @Post('/:id/disable')
    @HttpCode(HttpStatus.OK)
    async disableCustomerAsync(@Param('id') id: string) {
        try {
            await this.customerService.disableCustomerAsync(id);

        } catch (error: any) {
            // 🧠 Caso já seja um erro do Nest (por ex. BadRequestException)
            if (error instanceof HttpException) {
                throw error;
            }

            // 🧩 Caso o serviço tenha lançado um erro conhecido
            if (error.name === 'BadRequestException') {
                throw new BadRequestException(error.message);
            }

            // 💥 Caso seja um erro inesperado (bug, falha de DB etc.)
            throw new InternalServerErrorException(
                error.message || 'Erro interno no servidor',
            );
        }
    }
}
