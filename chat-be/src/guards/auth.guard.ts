import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    HttpException, HttpStatus
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

    @Injectable()

    export class AuthGuard implements CanActivate {
        constructor(
            private jwtService: JwtService,
            private reflector: Reflector
        ) {}
    
    
        async canActivate(context: ExecutionContext): Promise<boolean> {

            const isPublic = this.reflector.get<boolean>(
                IS_PUBLIC_KEY,
                context.getHandler(),
              );

            //Allow public routes to be accessed without token  
            if (isPublic) {
                return true;
              }

            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization;

            if (!token) {
                throw new UnauthorizedException('No token provided');
            }

            try {
                const user =  this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
                return true;
            }
            catch (e) {
                throw new UnauthorizedException('Invalid token');
            }   
           
        }

    }