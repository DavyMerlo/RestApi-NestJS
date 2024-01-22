import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { RtGuard } from "../common/guards/rt.guard";
import { Public } from "../common/decorators/public.decorator";
import { currentUserId } from "../common/decorators/current-user-id.decorator";
import { currentUser } from "../common/decorators/current-user.decorator";

@Controller('api/v1/auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Public()
    @Post('authenticate')
    @HttpCode(HttpStatus.OK)
    async authenticate(@Body() dto: AuthDto) {
        return this.authService.authenticate(dto);
    }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }


    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@currentUserId() userId: number) {
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(
        @currentUserId() userId: number,
        @currentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}