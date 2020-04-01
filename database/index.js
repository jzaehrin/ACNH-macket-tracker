import { Database } from '@vuex-orm/core'
import User from '~/models/User'
import Sample from '~/models/Sample'

const database = new Database()

database.register(User)
database.register(Sample)

export default database
