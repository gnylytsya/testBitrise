import { all, put } from 'redux-saga/effects';

import utils from '../../../utils';
import config from '../../../config';

export default function* logError(action) {
  /*
      This should
        - Log the error to the db
        - Post it to Slack
        - SET_SYSTEM_MESSAGE
  */

  try {
    const data = {
      ...action.payload.error,
      uid: action.payload.uid,
      date: action.payload.date,
    };

    yield all([
      put({
        type: 'pushData',
        payload: {
          data,
        },
      }),
      put({
        type: 'post',
        payload: {
          url: config.slack.webhook,
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          parameters: {
            channel: config.slack.channel,
            username: config.slack.username,
            icon_emoji: config.slack.icon_emoji,
            text: JSON.stringify(data),
          },
        },
      }),
      put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: {
          ...action.payload.error,
        },
        error: true,
      }),
    ]);
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.app.createError(error),
      error: true,
    });
  }
}