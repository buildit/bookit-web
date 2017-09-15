import { fromJS } from 'immutable'

export default {
  selectedDate: '2017-09-14',
  ui: {
    loggedIn: true,
  },
  tokens: fromJS({
    authn: 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFBOWtUa2xoVnk3U0pUR0F6Ui1wMUJjSEJWTXYzM29JazYwWWNHendnVE1wR3FGN2dDSHpSQUYyZXhrUWxhWU1HS2d4cGFWV2F5OGRobnBqb254YjdLVE9JemVjVi04QmdXTWtKRDg5clhYeUNBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiSEhCeUtVLTBEcUFxTVpoNlpGUGQyVldhT3RnIiwia2lkIjoiSEhCeUtVLTBEcUFxTVpoNlpGUGQyVldhT3RnIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zN2ZjZjBlNC1jZWI4LTQ4NjYtOGUyNi0yOTNiYWIxZTI2YTgvIiwiaWF0IjoxNTA1NDE1MTQyLCJuYmYiOjE1MDU0MTUxNDIsImV4cCI6MTUwNTQxOTA0MiwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhFQUFBQU9YdmwvYUEyU2tkNE43MUZjckRWb2F2R2Ixak1uOHY1RGFFWTd2Q0RJUzA9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJCb29rSXQiLCJhcHBpZCI6IjlhOGI4MTgxLWFmYjEtNDhmOC1hODM5LWE4OTVkMzlmOWRiMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU3ByaW5nc3RlZW4iLCJnaXZlbl9uYW1lIjoiQnJ1Y2UiLCJpcGFkZHIiOiI3Mi40Ni4xNi4yMzUiLCJuYW1lIjoiQnJ1Y2UgU3ByaW5nc3RlZW4iLCJvaWQiOiJhZWE4MjhjYy04ODk1LTRjYTYtYTFhOS01ZDNlMWEyZmZkMzAiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzdGRkVBMzNCREUwRSIsInNjcCI6IkNhbGVuZGFycy5SZWFkIENhbGVuZGFycy5SZWFkLlNoYXJlZCBDYWxlbmRhcnMuUmVhZFdyaXRlIENhbGVuZGFycy5SZWFkV3JpdGUuU2hhcmVkIENvbnRhY3RzLlJlYWQgQ29udGFjdHMuUmVhZC5TaGFyZWQgQ29udGFjdHMuUmVhZFdyaXRlIENvbnRhY3RzLlJlYWRXcml0ZS5TaGFyZWQgUGVvcGxlLlJlYWQgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCIsInN1YiI6ImRUVjlWSVJhOGgwbDhTRzRZeEZrMjItSVhzQmswbDJEM2h0WmFqV2NSY2ciLCJ0aWQiOiIzN2ZjZjBlNC1jZWI4LTQ4NjYtOGUyNi0yOTNiYWIxZTI2YTgiLCJ1bmlxdWVfbmFtZSI6ImJydWNlQGJ1aWxkaXRjb250b3NvLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6ImJydWNlQGJ1aWxkaXRjb250b3NvLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6IlIxaC1QZ1k5SkVhbkdhdTQtTW9MQUEiLCJ2ZXIiOiIxLjAifQ.vkmCQyzJsF60QGjHQRntj98kBvSdd_k9wXJoU5Q7uPIR4eDS4Yfgd8i_iy26d9SqyAaAbkNlWGGsO8HFGFxcF6hx0yFWzBsEj5SeCH6Qse01XAz4hMsvXihZbAn2GaXaN1P2zAdC5KrMVJpcs0kWdcOZFzsRgW1RKAz2JtZ4SFo0WOa88vDsvO0wb7alPh7ajZVqPdB4VA6Cjtn6LTs2qxFy0FBoZ4gnKWhDVKB7lCOS-y277jb6dnlpkcIpxbxck5POGynP-MxoOJ9yCnHWUwLExRpd_lRuFBYaJs4wAQpVPY0HxLuFiF38kXUJt0NGCL-H-vu0Z46bn6wZXUCCZw',
    authz: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYnJ1Y2VAYnVpbGRpdGNvbnRvc28ub25taWNyb3NvZnQuY29tIiwiaWF0IjoxNTA1NDE1NDQyLCJleHAiOjE1MDU0MTkwNDJ9.Au1n3mfC50b6csgS92sijjeg95Pv0kgPUIx-b-9iN_8',
  }),
  user: fromJS({
    email: 'bruce@builditcontoso.onmicrosoft.com',
    name: 'Bruce Springsteen',
    isAdmin: false,
  }),
  meetings: fromJS({
    entities: {
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWkAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWkAAA=',
        title: 'helper made!!',
        start: '2017-09-15T00:01:00.000Z',
        end: '2017-09-15T00:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [
          'bruce@builditcontoso.onmicrosoft.com',
        ],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAVES60AAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAVES60AAA=',
        title: 'helper made!!',
        start: '2017-09-15T00:01:00.000Z',
        end: '2017-09-15T00:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IW3AAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IW3AAA=',
        title: 'helper made!!',
        start: '2017-09-15T00:01:00.000Z',
        end: '2017-09-15T00:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWtAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWtAAA=',
        title: 'helper made!!',
        start: '2017-09-15T00:01:00.000Z',
        end: '2017-09-15T00:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAASsl6LAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAASsl6LAAA=',
        title: 'helper made!!',
        start: '2017-09-15T00:01:00.000Z',
        end: '2017-09-15T00:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWvAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWvAAA=',
        title: 'helper made!!',
        start: '2017-09-14T04:01:00.000Z',
        end: '2017-09-14T04:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IXBAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IXBAAA=',
        title: 'helper made!!',
        start: '2017-09-15T00:01:00.000Z',
        end: '2017-09-15T00:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwOAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwOAAA=',
        title: 'helper made!!',
        start: '2017-09-15T00:01:00.000Z',
        end: '2017-09-15T00:11:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwPAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwPAAA=',
        title: 'double booking before',
        start: '2017-09-14T23:55:00.000Z',
        end: '2017-09-15T00:05:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwQAAA=': {
        id: 'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwQAAA=',
        title: 'double booking after',
        start: '2017-09-15T00:05:00.000Z',
        end: '2017-09-15T00:15:00.000Z',
        owner: 'bruce@builditcontoso.onmicrosoft.com',
        room: 'red-room@builditcontoso.onmicrosoft.com',
        participants: [],
      },
    },
    result: [
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWkAAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWvAAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwPAAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IWtAAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IW3AAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAM2IXBAAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAASsl6LAAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAVES60AAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwOAAA=',
      'AAMkADg3NGI0OTZiLTY1MGQtNDc4My1hNWM3LTE1ZTRlYjMwY2M0OABGAAAAAADutZY3vM31QqsVJzVSMJ_IBwDnbJ14oVD1Q7ASLYs-71n0AAAAAAENAADnbJ14oVD1Q7ASLYs-71n0AAAXoOwQAAA=',
    ],
  }),
  rooms: fromJS({
    entities: {
      'black-room@builditcontoso.onmicrosoft.com': {
        name: 'Black',
        email: 'black-room@builditcontoso.onmicrosoft.com',
      },
      'blue-room@builditcontoso.onmicrosoft.com': {
        name: 'Blue',
        email: 'blue-room@builditcontoso.onmicrosoft.com',
      },
      'red-room@builditcontoso.onmicrosoft.com': {
        name: 'Red',
        email: 'red-room@builditcontoso.onmicrosoft.com',
      },
      'white-room@builditcontoso.onmicrosoft.com': {
        name: 'White',
        email: 'white-room@builditcontoso.onmicrosoft.com',
      },
      'green-room@builditcontoso.onmicrosoft.com': {
        name: 'Green',
        email: 'green-room@builditcontoso.onmicrosoft.com',
      },
    },
    result: [
      'black-room@builditcontoso.onmicrosoft.com',
      'blue-room@builditcontoso.onmicrosoft.com',
      'red-room@builditcontoso.onmicrosoft.com',
      'white-room@builditcontoso.onmicrosoft.com',
      'green-room@builditcontoso.onmicrosoft.com',
    ],
  }),
  participants: fromJS({
    entities: {
      'bruce@builditcontoso.onmicrosoft.com': {
        name: 'Bruce Springsteen',
        email: 'bruce@builditcontoso.onmicrosoft.com',
      },
    },
    result: [
      'bruce@builditcontoso.onmicrosoft.com',
    ],
  }),
  router: {
    location: {
      pathname: '/dashboard',
      search: '',
      hash: '',
      key: 'wunkrb',
    },
  },
  form: {},
}

