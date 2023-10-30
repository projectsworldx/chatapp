import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
    constructor(private readonly jwtService: JwtService) {}
    
    async createToken(payload: any) {
        return this.jwtService.sign(payload._doc);
    }
    
}
