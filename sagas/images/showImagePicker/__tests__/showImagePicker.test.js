import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import showImagePicker from '../';

const images = {
  showImagePicker: jest.fn(),
};

const action = {
  type: 'showImagePicker',
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { nextAction } };

const response = { foo: 'bar' };

describe('When testing the saga without a nextAction and without a response from the api', () => {
  const it = sagaHelper(showImagePicker(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(images.showImagePicker)));
  });

  // Insert test for default nextAction (if any)

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga without a nextAction and with a response from the api', () => {
  const it = sagaHelper(showImagePicker(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(images.showImagePicker)));

    return response;
  });

  // Insert test for default nextAction (if any)

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and without a response from the api', () => {
  const it = sagaHelper(showImagePicker(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(images.showImagePicker)));
  });

  it('and then trigger an action', (result) => {
    expect(result).toEqual(put({ ...nextAction, payload: {} }));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and with a response from the api', () => {
  const it = sagaHelper(showImagePicker(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(images.showImagePicker)));

    return response;
  });

  it('and then trigger an action', (result) => {
    expect(result).toEqual(put({ ...nextAction, payload: response }));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga when an error is thrown from the api', () => {
  const it = sagaHelper(showImagePicker(action));
  const errorMessage = 'Something went wrong';

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(images.showImagePicker)));

    return new Error(errorMessage);
  });

  it('and then trigger an error action with the error message', (result) => {
    expect(result).toEqual(
      put({
        type: 'logError',
        payload: {
          error: utils.app.createError(errorMessage),
          date: expect.any(Date),
        },
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
