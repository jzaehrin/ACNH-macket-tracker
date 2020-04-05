<template>
  <v-menu
    v-model="modal"
    :close-on-content-click="false"
    :nudge-width="500"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-avatar
        v-on="on"
      >
        <v-icon>mdi-human</v-icon>
      </v-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-container class="pa-0">
            <v-form class="d-block">
              <v-row align="center">
                <v-col cols="5">
                  <v-text-field
                    v-model="addFriend.id"
                    type="text"
                    label="Identifiant (uuid de l'ami)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-model="addFriend.pseudo"
                    type="text"
                    label="Pseudonyme"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="text-right">
                  <v-btn
                    color="success"
                    icon
                    @click="addFriend"
                  >
                    <v-icon>
                      mdi-account-multiple-plus
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-list-item>
        <v-list-item v-for="friend in friends">
          <v-row justify="end" align="center" :scope="friendScope">
            <v-col cols="9">
              <v-icon color="#2ecc71" v-if="friend.relation === 'active'">
                mdi-account
              </v-icon>
              <v-icon color="#f1c40f" v-if="friend.relation === 'pending'">
                mdi-account-pending
              </v-icon>
              <span v-if="friend.pseudo">
                {{friend.pseudo}}
              </span>
              <span v-else>
                {{friend.friend.uuid}}
              </span>
            </v-col>
            <v-col class="text-right">
              <div v-if="friend.relation === 'active'">
                <span v-if="!friendScope.edit">
                  <v-btn icon color="orange" @click="friendScope.edit = true">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="error" @click="deleteFriend(friend.id)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </span>
                <span v-else>
                  <v-btn icon color="green" @click="saveFriend(friend.id)">
                    <v-icon>
                      mdi-content-save
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="error" @click="friendScope.edit = false">
                    <v-icon>
                      mdi-cancel
                    </v-icon>
                  </v-btn>
                </span>
              </div>
              <div v-if="friend.relation === 'pending'">
                <v-btn icon color="success" @click="validFriend(friend.id)">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn icon color="error" @click="refuseFriend(friend.id)">
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  import User from "~/models/User";
  import Friend from "~/models/Friend";
  export default {
    data: () => {
      return {
        modal: false,
        addFriend: {
          id: '',
          pseudo: '',
        },
        friendScope: {
          edit: false
        }
      }
    },
    mounted() {
      this.getFriends();
    },
    computed: {
      user: {
        get() {
          return User.query().where('uuid', this.$cookies.get('acnh-uuid')).withAllRecursive().first();
        },
        set(val) {
          User.insertOrUpdate({data: val});
        }
      },
      friends: {
        get() {
          return Friend.query().with('friend').where('relation', 'active').orWhere('relation', 'pending').get()
        },
        set(val) {
          Friend.insertOrUpdate({data: val});
        }
      }
    },
    methods: {
      getFriends() {
        this.$axios.$get('/api/friends/'+this.$cookies.get('acnh-uuid')+'/').then((response) => {
          this.friends = response.friends;
          this.user = response.users;
        });
      },
      addFriend() {
        this.$axios.$post('/api/friends/'+this.$cookies.get('acnh-uuid')+'/add', {
          data: {

          }
        }).then((response) => {
          this.friends = response.friends;
          this.user = response.users;
        })
      }
    }
  }
</script>
