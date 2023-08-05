import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { Organization } from './organization/organization.entity';
import { MediaModule } from './media/media.module';
import { TeachersModule } from './teachers/teachers.module';
import { GroupsModule } from './groups/groups.module';
import { ClientsModule } from './clients/clients.module';
import { SessionsModule } from './sessions/sessions.module';
import { SessionDatesModule } from './session-dates/session-dates.module';
import { SessionDate } from './session-dates/sessiondate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Organization, SessionDate],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    OrganizationModule,
    MediaModule,
    TeachersModule,
    GroupsModule,
    ClientsModule,
    SessionsModule,
    SessionDatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
