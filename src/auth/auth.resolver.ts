import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphqlLocalAuthGuard } from './graphql-local-auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GraphqlLocalAuthGuard)
  @Mutation(() => String)
  async login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
    @CurrentUser() user: User,
  ) {
    const { access_token } = await this.authService.login(user);

    return access_token;
  }
}
