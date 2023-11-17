import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import { GetCustomerInput, UpdateCustomerInput } from './dto/customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }

  @Query(() => [Customer])
  async findAllcustomers() {
    return this.customerService.findAllCustomers();
  }

  @Query(() => Customer || Error)
  async getCustomerById(@Args('id') id: string) {
    return this.customerService.getCustomerById(id);
  }

  @Mutation(() => Customer)
  async updateCustomerById(
    @Args('id') id: string,
    @Args('data') data: UpdateCustomerInput,
  ) {
    return this.customerService.updateCustomerById(id, data);
  }

  @Mutation(() => Customer)
  async deleteCustomerById(@Args('id') id: string) {
    return this.customerService.deleteCustomerById(id);
  }
}
