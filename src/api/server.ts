import { rest, setupWorker } from 'msw'
import { factory, oneOf, manyOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker';
import seedrandom from 'seedrandom'
import { Client, Server as MockSocketServer } from 'mock-socket'

import { parseISO } from 'date-fns'
import { Entity, FactoryAPI } from '@mswjs/data/lib/glossary';
import { PrimaryKey } from '@mswjs/data/lib/primaryKey';
import { ManyOf, OneOf } from '@mswjs/data/lib/relations/Relation';

const NUM_USERS = 3
const POSTS_PER_USER = 3
const RECENT_NOTIFICATIONS_DAYS = 7

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000

/* RNG setup */

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = true

let rng = seedrandom()

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedString)
  }

  rng = seedrandom(randomSeedString)
  // sentence(rng)
  faker.seed(seedDate.getTime())
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array: string | any[]) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

/* MSW Data Model Setup */

export const db = factory({
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(nanoid),
    title: String,
    date: String,
    content: String,
    reactions: oneOf('reaction'),
    comments: manyOf('comment'),
    user: oneOf('user'),
  },
  comment: {
    id: primaryKey(String),
    date: String,
    text: String,
    post: oneOf('post'),
  },
  reaction: {
    id: primaryKey(nanoid),
    thumbsUp: Number,
    hooray: Number,
    heart: Number,
    rocket: Number,
    eyes: Number,
    post: oneOf('post'),
  },
})

const createUserData = () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    username: faker.internet.userName(),
  }
}

const createPostData = (user: Entity<{
        user: { id: PrimaryKey<string>; firstName: StringConstructor; lastName: StringConstructor; name: StringConstructor; username: StringConstructor; posts: ManyOf<"post", false>; }; post: { id: PrimaryKey<string>; title: StringConstructor; date: StringConstructor; content: StringConstructor; reactions: OneOf<"reaction", false>; comments: ManyOf<"comment", false>; user: OneOf<"user", false>; }; comment: {
            id: PrimaryKey<string
            // Add an extra delay to all endpoints, so loading spinners show up.
            >; date: StringConstructor; text: StringConstructor; post: OneOf<"post", false>;
        }; reaction: {
            id: PrimaryKey<string>; thumbsUp: NumberConstructor; hooray: NumberConstructor; heart // a consistent set of users / entries each time the page loads.
                : NumberConstructor; rocket: NumberConstructor; eyes: NumberConstructor; post: OneOf<"post", false>;
        };
    }, "user">) => {
  return {
    title: faker.lorem.words(),
    date: faker.date.recent(RECENT_NOTIFICATIONS_DAYS).toISOString(),
    user,
    content: faker.lorem.paragraphs(),
    reactions: db.reaction.create(),
  }
}

// Create an initial set of users and posts
for (let i = 0; i < NUM_USERS; i++) {
  const author = db.user.create(createUserData())

  for (let j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(author)
    db.post.create(newPost)
  }
}

const serializePost = (post: Entity<{ user: { id: PrimaryKey<string>; firstName: StringConstructor; lastName: StringConstructor; name: StringConstructor; username: StringConstructor; posts: ManyOf<"post", false>; }; post: { id: PrimaryKey<string>; title: StringConstructor; date: StringConstructor; content: StringConstructor; reactions: OneOf<"reaction", false>; comments: ManyOf<"comment", false>; user: OneOf<"user", false>; }; comment: { id: PrimaryKey<string>; date: StringConstructor; text: StringConstructor; post: OneOf<"post", false>; }; reaction: { id: PrimaryKey<string>; thumbsUp: NumberConstructor; hooray: NumberConstructor; heart: NumberConstructor; rocket: NumberConstructor; eyes: NumberConstructor; post: OneOf<"post", false>; }; }, "post"> | null) => ({
  ...post,
  user: post?.user?.id,
})

/* MSW REST API Handlers */

export const handlers = [
  rest.get('/fakeApi/posts', function (req, res, ctx) {
    const posts = db.post.getAll().map(serializePost)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(posts))
  }),
  rest.post('/fakeApi/posts', function (req, res, ctx) {
    const data:any = req.body
    if (data?.content === 'error') {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(500),
        ctx.json('Server error saving this post!')
      )
    }

    data.date = new Date().toISOString()

    const user = db.user.findFirst({ where: { id: { equals: data.user } } })
    data.user = user
    data.reactions = db.reaction.create()

    const post = db.post.create(data)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePost(post)))
  }),
  rest.get('/fakeApi/posts/:postId', function (req, res, ctx) {
    const post = db.post.findFirst({
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      where: { id: { equals: <string>req.params.postId } },
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePost(post)))
  }),
  rest.patch('/fakeApi/posts/:postId', (req, res, ctx) => {
    const { id, ...data }: any = req.body
    const updatedPost = db.post.update({
      where: { id: { equals: req.params.postId as any } },
      data,
    })
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json(serializePost(updatedPost))
    )
  }),

  rest.get('/fakeApi/posts/:postId/comments', (req, res, ctx) => {
    const post = db.post.findFirst({
      where: { id: { equals: req.params.postId as any } },
    })
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json({ comments: (post as any).comments })
    )
  }),

  rest.post('/fakeApi/posts/:postId/reactions', (req, res, ctx) => {
    const postId = req.params.postId
    const reaction = (req as any).body.reaction
    const post: any = db.post.findFirst({
      where: { id: { equals: postId as any } },
    })

    const updatedPost = db.post.update({
      where: { id: { equals: postId as any } },
      data: {
        reactions: {
          ...post.reactions,
          [reaction]: (post.reactions[reaction] += 1),
        },
      },
    })

    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json(serializePost(updatedPost))
    )
  }),
  rest.get('/fakeApi/notifications', (req, res, ctx) => {
    const numNotifications = getRandomInt(1, 5)

    let notifications = generateRandomNotifications(
      undefined,
      numNotifications,
      db
    )

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(notifications))
  }),
  rest.get('/fakeApi/users', (req, res, ctx) => {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(db.user.getAll()))
  }),
]

export const worker = setupWorker(...handlers)
// worker.printHandlers() // Optional: nice for debugging to see all available route handlers that will be intercepted

/* Mock Websocket Setup */

const socketServer = new MockSocketServer('ws://localhost')

let currentSocket: Client

const sendMessage = (socket: Client, obj: { type: string; payload: { id: string; date: string; message: any; user: any; }[]; }) => {
  socket.send(JSON.stringify(obj))
}

// Allow our UI to fake the server pushing out some notifications over the websocket,
// as if other users were interacting with the system.
const sendRandomNotifications = (socket: Client, since: string | undefined) => {
  const numNotifications = getRandomInt(1, 5)

  const notifications = generateRandomNotifications(since, numNotifications, db)

  sendMessage(socket, { type: 'notifications', payload: notifications })
}

export const forceGenerateNotifications = (since: any) => {
  sendRandomNotifications(currentSocket, since)
}

socketServer.on('connection', (socket) => {
  currentSocket = socket

  socket.on('message', (data: any) => {
    const message = JSON.parse(data)

    switch (message.type) {
      case 'notifications': {
        const since = message.payload
        sendRandomNotifications(socket, since)
        break
      }
      default:
        break
    }
  })
})

/* Random Notifications Generation */

const notificationTemplates = [
  'poked you',
  'says hi!',
  `is glad we're friends`,
  'sent you a gift',
]

function generateRandomNotifications(since: string | undefined, numNotifications: number, db: FactoryAPI<{ user: { id: PrimaryKey<string>; firstName: StringConstructor; lastName: StringConstructor; name: StringConstructor; username: StringConstructor; posts: ManyOf<"post", false>; }; post: { id: PrimaryKey<string>; title: StringConstructor; date: StringConstructor; content: StringConstructor; reactions: OneOf<"reaction", false>; comments: ManyOf<"comment", false>; user: OneOf<"user", false>; }; comment: { id: PrimaryKey<string>; date: StringConstructor; text: StringConstructor; post: OneOf<"post", false>; }; reaction: { id: PrimaryKey<string>; thumbsUp: NumberConstructor; hooray: NumberConstructor; heart: NumberConstructor; rocket: NumberConstructor; eyes: NumberConstructor; post: OneOf<"post", false>; }; }>) {
  const now = new Date()
  let pastDate: string | number | Date

  if (since) {
    pastDate = parseISO(since)
  } else {
    pastDate = new Date(now.valueOf())
    pastDate.setMinutes(pastDate.getMinutes() - 15)
  }

  // Create N random notifications. We won't bother saving these
  // in the DB - just generate a new batch and return them.
  const notifications = [...Array(numNotifications)].map(() => {
    const user = randomFromArray(db.user.getAll())
    const template = randomFromArray(notificationTemplates)
    return {
      id: nanoid(),
      date: faker.date.between(pastDate, now).toISOString(),
      message: template,
      user: user.id,
    }
  })

  return notifications
}
