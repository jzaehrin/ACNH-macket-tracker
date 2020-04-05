// User Model

import Vue from 'vue';

import { Model } from '@vuex-orm/core'
import User from '~/models/User';

export default class Friend extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'friends'

  static primaryKey = 'id';

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      id: this.attr(''),
      user_id1: this.attr(''),
      user_id2: this.attr(''),
      owner: this.belongsTo(User, 'id', 'user_id1'),
      friend: this.hasOne(User, 'id', 'user_id2'),
      relation: this.attr(''),
      pseudo: this.attr('')
    }
  }

}
