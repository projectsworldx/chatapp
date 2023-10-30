import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JwtManager } from './modules/jwt/jwt.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
              MongooseModule.forRoot('mongodb+srv://chatuser:4zw0O3QtRy8qkdHV@protox.uboqmzp.mongodb.net/chatapp'),
              UserModule,
              JwtManager
           ],
  controllers: [AppController],
  providers: [
    AppService
/*     {
      provide: 'AuthGuard',
      useClass: AuthGuard
    } */
  ],
})
export class AppModule {}
