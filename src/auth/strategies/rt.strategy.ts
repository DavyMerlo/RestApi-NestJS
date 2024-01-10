import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../types/jwtPayload.type";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rt-secret',
            passReqToCallback: true,
        })
    }

    validate(req: Request ,paylaod: any){
        const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
        return {
            ...paylaod,
            refreshToken,
        }
    }
}