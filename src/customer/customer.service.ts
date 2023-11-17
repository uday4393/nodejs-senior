import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCustomerInput, UpdateCustomerInput } from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async findAllCustomers() {
    return await this.prisma.customer.findMany();
  }

  async getCustomerById(id: string) {
    try {
      const customer = await this.prisma.customer.findUnique({ where: { id } });
      if (!customer)
        throw new NotFoundException(`Customer with id ${id} not found`);
      return customer;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCustomerById(id: string, data: UpdateCustomerInput) {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCustomerById(id: string) {
    try {
      return await this.prisma.customer.delete({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }
}
