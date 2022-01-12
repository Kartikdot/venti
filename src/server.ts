import express from 'express'
import { createConnection } from 'typeorm'
import { Article } from './entities/Article';
import { Comment } from './entities/Comment';
import { User } from './entities/User';
import { usersRoute } from './routes/users';
import { articlesRoute } from './routes/article';
import { userRoute } from './routes/user';

const app = express();

app.use(express.json())

app.use('/api/users', usersRoute)
app.use('/api/articles', articlesRoute)
app.use('/api/user', userRoute)

async function start() {
    
    await createConnection({
        type: 'postgres',
        username: 'postgres',
        password: 'Kartik123$',
        database:'venti',
        entities:[User, Article, Comment],
        synchronize: true,
        dropSchema: true,
        logging: true,
        logger: 'advanced-console'
    })

    app.listen(3232, ()=>{
        console.log('server listening on http://localhost:3232')
    })
}

start()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Hello ji")
})
