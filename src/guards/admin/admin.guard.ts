import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/constants/enums/userRole.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log("user: ", user)

    if (user?.role !== UserRoles.ADMIN) {
      throw new ForbiddenException('Access denied. Administrators only.');
    }

    return true;
  }
}
