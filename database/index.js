import { Database } from '@vuex-orm/core'
import User from '~/models/User'
import Sample from '~/models/Sample'
import Friend from "~/models/Friend"

const database = new Database()

database.register(User)
database.register(Sample)
database.register(Friend)

export default database
