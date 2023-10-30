import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '12h' },
    }),
  ],
  exports: [JwtAuthService, JwtModule],  
  providers: [JwtAuthService]
})
export class JwtManager {}
