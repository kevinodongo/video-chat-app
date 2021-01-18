<template>
  <div class="navigation">
    <v-sheet>
      <v-card-actions>
        <div class="title ml-2">Chats</div>
        <v-spacer></v-spacer>
        <v-icon class="mr-2">mdi-bell-outline</v-icon>
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
          </template>
          <v-list width="170" dense>
            <v-list-item v-for="(item, index) in objects" :key="index">
              <v-list-item-title class="grey--text">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
      <v-card-actions>
        <v-autocomplete
          v-model="values"
          :items="elements"
          outlined
          dense
          class="mr-4"
          chips
          single-line
          hide-details
          label="All Chats"
        ></v-autocomplete>
        <v-spacer></v-spacer>
        <v-text-field
          name="name"
          label="Search"
          outlined
          append-icon="mdi-magnify"
          dense
          hide-details
          single-line
        ></v-text-field>
      </v-card-actions>
      <v-divider class="mt-3"></v-divider>
    </v-sheet>
    <v-list two-line>
      <v-subheader>Today</v-subheader>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        style="border: 1px solid #BDBDBD; margin: 5px; border-radius: 10px;"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            v-html="item.title"
            style="color: #37474F"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-html="item.subtitle"
            style="color: #37474F"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text>9.15am</v-list-item-action-text>
          <v-icon color="grey lighten-1">
            mdi-star-outline
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      objects: ["New Chat", "Create Group", "Invite Others"],
      elements: ["All chats", "Friends", "Groups", "Unread", "Archive"],
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
        }
      ]
    };
  }
};
</script>
