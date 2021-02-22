#  PerfAnalytics

This is a web project that collects user analytics and displays it in graphics.


PerfAnalytics consists of 3 different sub project. 
- PerfAnalytics.JS 
- PerfAnalytics.API
- PerfAnalytics.Dashboard


### PerfAnalytics

This is a client side library that collects analytics from client and sends data to PerfAnalytics.API.

- TTFB, FCB, Dom Load and Window Load events
- It measures network timing for documents resources (eg:Image, JS, CSS)
- Doesn't affect the client's performance
- It can be used in any web application


### PerfAnalytics.API

This is a RESTFUL API for saving analytics data and returns time specific filtered data.

### PerfAnalytics.Dashboard

This is a react project which fetches and shows analytics from PerfAnalytics.API.


#### Starting Project
- **npm run install:all** : Installs both API and Dashboard app's dependencies.
- **npm run build** : Builds react app and copies build folder to /dashboard directory for serving inside express
- **npm run start** : Starts project
- **npm run start:dashboard** : Starts React project alone


Express project serves both test page for creating data and dashboard page for presenting

You can create data by navigating **/test**
You can preview dashboard by navigation **/** or **/dashboad**

#### Preview
- **Test Page :** [https://cnb-perfanalytics.herokuapp.com/test/](https://cnb-perfanalytics.herokuapp.com/test/)
- **Dashboard :** [https://cnb-perfanalytics.herokuapp.com/test/](https://cnb-perfanalytics.herokuapp.com/)