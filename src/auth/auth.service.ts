import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";
import { AuthDto } from "./dto/auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthRepository } from "./auth.repository";
import { JwtPayload } from "./types/jwtPayload.type";
import { User } from "../models/user";
import { TokenComponent } from "../components/token.component";
import { LogoutComponent } from "../components/logout.component";

@Injectable({})
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private authRepository: AuthRepository
        ){}

    async authenticate(dto: AuthDto) : Promise<TokenComponent>{
        const user = await this.authRepository.getUserByEmail(dto.email);
        if(!user){
            throw new NotFoundException('User not found');
        }
        const passwordMatches = await argon.verify(user.hash, dto.password);
        if(!passwordMatches) throw new ForbiddenException("Acces denied");
        const payLoadData = this.createJwtPayload(user);
        const tokens = await this.getTokens(payLoadData);
        await this.authRepository.updateRefreshTokenUser(user.id!, tokens.refresh_token);
        return new TokenComponent(200, 'Authentication successful', tokens);
    }

    async register(dto: RegisterDto) : Promise<TokenComponent>{
        const user = await this.authRepository.createUser(dto);
        const payLoadData = this.createJwtPayload(user);
        const tokens = await this.getTokens(payLoadData);
        return new TokenComponent(200, 'Registration successful', tokens);
    }

    async logout(userId: number) : Promise<LogoutComponent>{
        const isLogout = await this.authRepository.updateAllRefreshTokensUser(userId);
        return new LogoutComponent(200, 'Logout successful', isLogout);
    }

    async refreshTokens(userId: number, rt: string): Promise<TokenComponent> {
        const user = await this.authRepository.getUserById(userId);
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) throw new ForbiddenException('Access Denied');
        const payLoadData = this.createJwtPayload(user);
        const tokens = await this.getTokens(payLoadData);
        await this.authRepository.updateRefreshTokenUser(user.id, tokens.refresh_token);
        return new TokenComponent(200, 'Refresh tokens successful', tokens);
      }

    async getTokens(payLoadData: JwtPayload) : Promise<Tokens> {

        const [at, rt] =  await Promise.all([
            this.jwtService.signAsync({
                sub: payLoadData.sub,
                email: payLoadData.email,
                firstName: payLoadData.firstName,
                lastName: payLoadData.lastName
            }, {
                secret: 'at-secret',
                expiresIn: 60 * 15,
            }),
            this.jwtService.signAsync({
                sub: payLoadData.sub,
                email: payLoadData.email,
                firstName: payLoadData.firstName,
                lastName: payLoadData.lastName
            }, {
                secret: 'rt-secret',
                expiresIn: 60 * 160 * 24 * 7,
            })
        ]);

        return {
            acces_token: at,
            refresh_token: rt
        }
    }

    private createJwtPayload(user: User): JwtPayload {
        return {
            sub: user.id!,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
    }
}