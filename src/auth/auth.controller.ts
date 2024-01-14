import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { RtGuard } from "../common/guards/rt.guard";
import { BaseComponent } from "../models/components/base.component";
import { TokenComponent } from "../models/components/token.component";
import { LogoutComponent } from "../models/components/logout.component";
import { Public } from "../common/decorators/public.decorator";
import { currentUserId } from "../common/decorators/current-user-id.decorator";
import { currentUser } from "../common/decorators/current-user.decorator";

@Controller('api/v1/auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Public()
    @Post('authenticate')
    @HttpCode(HttpStatus.OK)
    authenticate(@Body() dto: AuthDto) : Promise<TokenComponent> {
        return this.authService.authenticate(dto);
    }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() dto: RegisterDto) : Promise<TokenComponent>{
        return this.authService.register(dto);
    }

    // @UseGuards(AtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@currentUserId() userId: number) : Promise<LogoutComponent>{
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(
        @currentUserId() userId: number,
        @currentUser('refreshToken') refreshToken: string) : Promise<TokenComponent>{
        return this.authService.refreshTokens(userId, refreshToken);
    }
}