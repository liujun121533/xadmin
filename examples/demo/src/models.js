import React from 'react'
import { Textarea } from 'xadmin-form/lib/components'
import { RelateAction } from 'xadmin-model/lib/relate'
import { ChildrenModelBtn } from 'xadmin-model'
import { List } from 'xadmin-model/lib/components/Items'

export default {
  User: {
    name: 'User',
    resource_name: 'users',
    type: 'object',
    icon: 'user', // fa-icon
    title: 'User',
    properties: {
      id: {
        type: 'number',
        title: 'User ID'
      },
      name: {
        type: 'string',
        description: '用户的真实姓名'
      },
      username: {
        type: 'string'
      },
      email: {
        type: 'string',
        format: 'email'
      },
      website: {
        type: 'string'
      },
      brithday: {
        type: 'string',
        format: 'date'
      },
      loginTime: {
        type: 'string',
        format: 'date-time',
        convert: 'node-link'
      },
      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          suite: { type: 'string' }
        }
      },
      property: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            value: { type: 'string' }
          }
        }
      }
    },
    permission: { view: true, add: true, edit: true, delete: true },
    form: [ 'name', 'email', 'address', '*',
      { key: 'website', component: Textarea, attrs: { rows: 5 } } ],
    filters: {
      nav: [ 'name', 'email' ],
      sidemenu: [ 'name' ]
    },
    item_actions: [ 
      (item) => <RelateAction item={item} />,
      (item) => <ChildrenModelBtn model="Post" parent={item}>Posts</ChildrenModelBtn>
    ],
    editable_fields: ['name'],
    batch_change_fields: ['website', 'brithday'],
    search_fields: [ 'name', 'email' ],
    required: [ 'name', 'email', 'website' ],
    readonly: [ 'id' ],
    list_display: [ 'id', 'name', 'email', 'website', 'address.street' ]
  },
  Post: {
    name: 'Post',
    resource_name: 'posts',
    type: 'object',
    icon: 'file-o', // fa-icon
    title: 'Post',
    properties: {
      id: {
        type: 'number',
        title: 'User ID'
      },
      title: {
        type: 'string'
      },
      body: {
        type: 'string'
      },
      user: {
        type: 'object',
        name: 'User',
        relateTo: 'User',
        showDetail: true,
        properties: {
          id: { type: 'number' },
          name: { type: 'string' }
        }
      },
      readers: {
        type: 'array',
        name: 'Readers',
        items: {
          type: 'object',
          relateTo: 'User',
          properties: {
            name: { type: 'string' },
            value: { type: 'string' }
          }
        }
      }
    },
    permission: { view: true, add: true, edit: true, delete: true },
    form: [ 'title', 'body', 'user', 'readers' ],
    filters: {
      nav: [ 'title', 'user' ],
      sidemenu: [ 'user' ],
      submenu: [ 'id', 'user', 'title', 'body' ],
    },
    display: (post) => post.title,
    search_fields: [ 'title' ],
    required: [ 'title', 'user', 'body' ],
    readonly: [ 'id' ],
    list_display: [ 'id', 'title', 'user' ],
    components: {
      model_list: List
    }
  }
}
