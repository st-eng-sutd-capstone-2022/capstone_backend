import { IS_PUBLIC } from '@modules/publicEndpoint.decorator';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAll(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    // TODO revert back
    return true;
    if (isPublic.some((flag) => flag)) {
      return true;
    }

    return super.canActivate(context);
  }
}
