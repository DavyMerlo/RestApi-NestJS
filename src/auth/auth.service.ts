import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";
import { AuthDto } from "./dto/auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthRepository } from "./auth.repository";
import { JwtPayload } from "./types/jwtPayload.type";
import { User } from "../models/user";
import { BaseComponent } from "../models/components/base.component";

@Injectable({})
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private authRepository: AuthRepository
        ){}

    async authenticate(dto: AuthDto){
        const user = await this.authRepository.getUserByEmail(dto.email);
        if(!user){
            throw new UnauthorizedException('Unable to login. Invalid credentials');
        }
        const passwordMatches = await argon.verify(user.hash, dto.password);
        if(!passwordMatches) {
            throw new UnauthorizedException('Unable to login. Invalid credentials');
        }
        const payLoadData = this.createJwtPayload(user);
        const tokens = await this.getTokens(payLoadData);
        await this.authRepository.updateRefreshTokenUser(user.id!, tokens.refresh_token);
        return new BaseComponent(200, 'Authentication successful', tokens);
    }

    async register(dto: RegisterDto){
        const emailExists = await this.authRepository.getUserByEmail(dto.email);
        if(emailExists?.email){
            throw new NotAcceptableException('Email already in use');
        }
        const user = await this.authRepository.createUser(dto);
        const payLoadData = this.createJwtPayload(user);
        const tokens = await this.getTokens(payLoadData);
        return new BaseComponent(200, 'Registration successful', tokens);
    }

    async logout(userId: number) {
        const isLogout = await this.authRepository.updateAllRefreshTokensUser(userId);
        if(!isLogout){
            throw new NotFoundException('Logout unsuccesfull');
        }
        return new BaseComponent(200, 'Logout successful', isLogout);
    }

    async refreshTokens(userId: number, rt: string) {
        const user = await this.authRepository.getUserById(userId);
        if (!user || !user.hashedRt) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) {
            throw new UnauthorizedException('Refresh token mismatch');
        }
        const payLoadData = this.createJwtPayload(user);
        const tokens = await this.getTokens(payLoadData);
        await this.authRepository.updateRefreshTokenUser(user.id, tokens.refresh_token);
        return new BaseComponent(200, 'Refresh tokens successful', tokens);
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
            lastName: user.lastName,
        }
    }
}