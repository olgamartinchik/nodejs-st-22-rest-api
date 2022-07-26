import {createConnection} from 'typeorm'

export const databaseProvider=[
    {
        provide:"DATABASE_CONNECTION",
        useFactory: async()=>{
            await createConnection({
                type: 'postgres',
                host:'abul.db.elephantsql.com',
                port:5432,
                username:'usloqunj',
                password:'13dFnsAiNs1ovpwnsRqI7zuk6eTKVydd',
                database:'usloqunj',
                entities: ['src/**/**.entity{.ts,.js}'],
            })
        }
    }
]