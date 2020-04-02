// User Model

import { Model } from '@vuex-orm/core'
import User from "./User";

export default class Sample extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'samples'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      user_id: this.attr(''),
      date: this.attr(''),
      amount: this.attr('')
    }
  }
}
