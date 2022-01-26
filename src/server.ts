import express from 'express'
import { createConnection } from 'typeorm'
import { Article } from './entities/Article';
import { Comment } from './entities/Comment';
import { User } from './entities/User';
import { usersRoute } from './routes/users';
import { articlesRoute } from './routes/article';
import { userRoute } from './routes/user';
import { commentsRoute } from './routes/comment';

const app = express();

app.use(express.json())

app.use('/api/users', usersRoute)
app.use('/api/articles', articlesRoute)
app.use('/api/user', userRoute)
app.use('/api/articles/', commentsRoute)

async function start() {
    
    const shouldSynchronize: boolean = process.env.DB_SYNCHRONIZE == 'false' || null? false : true
    await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Article, Comment],
        synchronize: shouldSynchronize,
        dropSchema: false,
        logging: true,
        logger: 'advanced-console'
    })

    const port = process.env.PORT || 3232
    app.listen(port, ()=>{
        console.log(`server listening on http://localhost:${port}`)
    })
}

start()
