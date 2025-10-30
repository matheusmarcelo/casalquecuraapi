import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(DITokensService.AUTH_SERVICE)
    private readonly authService: IAuthService
  ) { }

  @Post('')
  async signIn(@Body() auth: AuthRequestDto): Promise<AuthResponseDto> {
    const authReponse = await this.authService.signIn(auth);
    return authReponse;
  }
}
