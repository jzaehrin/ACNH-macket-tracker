// User Model

import { Model } from '@vuex-orm/core'
const moment = require('moment')
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

  static insertOrUpdate(payload) {
    return super.insertOrUpdate(payload);
  }

  static getWeek(user_id, time = moment().isoWeek()) {
    return Sample.query()
      .where('user_id', user_id)
      .where((sample) => {
        return moment(sample.date) >= moment().isoWeek(time).startOf('week').isoWeekday(1) &&
          moment(sample.date) < moment().isoWeek(time).endOf('week').isoWeekday(1)
      })
      .orderBy('date', 'desc').get();
  }
}
