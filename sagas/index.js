import { takeLatest, takeEvery, fork, all } from 'redux-saga/effects';

// Analytics
import { logEvent } from './analytics';

// Auth
import {
  getAuth,
  signInAnonymously,
  getCredentialFromEmail,
  getCredentialFromFacebook,
  getCredentialFromGoogle,
  getCredentialAndSignIn,
  sendPasswordResetEmail,
  signInWithCredential,
  signOut,
} from './auth';

// Database
import { getData, updateData, setData, pushData, goOffline, goOnline } from './database';

// HTTP
import { get, post } from './http';

// Images
import { resizeImage, showImagePicker } from './images';

// Location
import { getDeviceLocation, getFormattedAddressFromCoords } from './location';

// Permissions
import { checkPermission, requestPermission, checkAndRequestPermission } from './permissions';

// Storage
import { uploadFile } from './storage';

// Errors
import { logError } from './errors';

export default function* sagas() {
  yield all([
    // Analytics
    fork(takeLatest, 'logEvent', logEvent),

    // Auth
    fork(takeLatest, 'getAuth', getAuth),
    fork(takeLatest, 'signInAnonymously', signInAnonymously),
    fork(takeLatest, 'getCredentialFromEmail', getCredentialFromEmail),
    fork(takeLatest, 'getCredentialFromFacebook', getCredentialFromFacebook),
    fork(takeLatest, 'getCredentialFromGoogle', getCredentialFromGoogle),
    fork(takeLatest, 'getCredentialAndSignIn', getCredentialAndSignIn),
    fork(takeLatest, 'sendPasswordResetEmail', sendPasswordResetEmail),
    fork(takeLatest, 'signInWithCredential', signInWithCredential),
    fork(takeLatest, 'signOut', signOut),

    // Database
    fork(takeEvery, 'getData', getData),
    fork(takeEvery, 'updateData', updateData),
    fork(takeEvery, 'setData', setData),
    fork(takeEvery, 'pushData', pushData),
    fork(takeEvery, 'goOffline', goOffline),
    fork(takeEvery, 'goOnline', goOnline),

    // HTTP
    fork(takeLatest, 'get', get),
    fork(takeLatest, 'post', post),

    // Images
    fork(takeLatest, 'resizeImage', resizeImage),
    fork(takeLatest, 'showImagePicker', showImagePicker),

    // Location
    fork(takeLatest, 'getDeviceLocation', getDeviceLocation),
    fork(takeLatest, 'getFormattedAddressFromCoords', getFormattedAddressFromCoords),

    // Permissions
    fork(takeLatest, 'checkPermission', checkPermission),
    fork(takeLatest, 'requestPermission', requestPermission),
    fork(takeLatest, 'checkAndRequestPermission', checkAndRequestPermission),

    // Storage
    fork(takeLatest, 'uploadFile', uploadFile),

    // Errors
    fork(takeLatest, 'logError', logError),
  ]);
}
