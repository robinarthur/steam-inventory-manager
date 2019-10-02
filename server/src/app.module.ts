import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccessControlModule } from './access-control/access-control.module';
import { PermissionsGuard } from './access-control/guards/permissions.guard';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ConfigModule } from './config/config.module';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './item/item.module';
import { rolesConfig } from './roles.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '../..', 'client/dist') }), // todo: only in prod
    TypeOrmModule.forRoot(),
    ConfigModule,
    AccessControlModule.register(rolesConfig),
    AuthModule,
    ItemModule,
    BotModule,
    InventoryModule,
    UserModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: PermissionsGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_PIPE, useValue: new ValidationPipe({ skipMissingProperties: true, whitelist: true }) },
  ],
})
export class AppModule {}
