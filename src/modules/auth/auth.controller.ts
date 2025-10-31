import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, } from '@nestjs/common';
import type { Request } from 'express';
import type { IAuthService } from 'src/constants/contracts/auth/IAuthService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { AuthRequestDto } from 'src/dtos/auth/authRequest.dto';
import { AuthResponseDto } from 'src/dtos/auth/authResponse.dto';
import { ResetPasswordDto } from 'src/dtos/reset_password/reset_password.dto';

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

  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  async recoverPassword(@Body() body: { email: string }, @Req() req: Request): Promise<void | string> {
    await this.authService.recoverPassword(body.email, `${req.ip}`);
    return req.ip;
  }

  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body() body: { token: string }, @Req() req: Request): Promise<void> {
    await this.authService.validateTokenAsync(body.token, `${req.ip}`);
  }
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    await this.authService.resetPasswordAsync(body);
  }
}
