/* eslint-disable import/first */
import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"

dotenvConfig({ path: resolve(process.cwd(), ".env") })

import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AdminsModule } from "./admins/admins.module"
import { AuthModule } from "./auth/auth.module"
import { GroupsModule } from "./groups/groups.module"
import { InvitesModule } from "./invites/invites.module"

type DB_TYPE = "mysql" | "sqlite" | "postgres"

@Module({
    imports: [
        AuthModule,
        AdminsModule,
        InvitesModule,
        GroupsModule,
        TypeOrmModule.forRoot({
            type: (process.env.DB_TYPE as DB_TYPE) || "postgres",
            url: process.env.DB_URL,
            ...(process.env.DB_TYPE === "sqlite" && {
                database: process.env.DB_URL
            }),
            autoLoadEntities: true,
            synchronize: process.env.NODE_ENV !== "production"
        })
    ]
})
export class AppModule {}
