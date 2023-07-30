import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const args = ctx.getArgs();

    // TODO: This is a hack. I'd wish to fix it, but that probably needs a
    // custom AuthGuard.
    req.body.username = args.username;
    req.body.password = args.password;

    return req;
  }
}
