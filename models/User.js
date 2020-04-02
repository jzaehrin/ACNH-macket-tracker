// User Model

import Vue from 'vue';

import { Model } from '@vuex-orm/core'
import Sample from "./Sample";

export default class User extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'users'

  static primaryKey = 'uuid';

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      suuid: this.attr(null),
      uuid: this.attr(''),
      samples: this.hasMany(Sample, 'user_uuid')
    }
  }

}
