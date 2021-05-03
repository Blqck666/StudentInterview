// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiTeacherBaseUrl: 'http://localhost:3000/Teacher/',
  apiStudentBaseUrl: 'http://localhost:3000/Student/',
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYmxxY2s2NjYiLCJhIjoiY2tmbWg1OWZjMGNleTJ6bnhzODE4Znh0diJ9.0RZRBDufDnyEpq4IO__nmQ'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
