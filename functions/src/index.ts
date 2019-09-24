import * as functions from 'firebase-functions';

import { listenGameData } from './game/game';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const OnlistenGameData: functions.CloudFunction<
  functions.Change<functions.database.DataSnapshot>
> = listenGameData;
