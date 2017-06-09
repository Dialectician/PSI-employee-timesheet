//iPhone button hex = #0x007aff

/*John Calderaio:
	@AriaFallah I'm not an expert with testing, but just try to create your functions as pure as possible, for example: */

class MessageStore {
  // bad
  markMessageAsRead = message => {
    if (message.status === 'new') {
      fetch({
        method: 'GET',
        path: `/notification/read/${message.id}`
      }).then(() => message.status = 'read')
    }
  }
  // good
  markMessageAsRead = message => {
    if (message.status !== 'new') {
      return Promise.reject('Message is not new')
    }
    // it's now easily mockable
    return api.markMessageAsRead(message).then(() => {
      // this is a pure function
      // you can test it easily
      return this.updateMessage(message, { status: ' read' })
    })
  }
}

TODO:
  -make "todays jobs" store
  -load it on main page, show hours
  -show all on todays charges
  -show "checks" on recent
  -new logo. new colors?
  -If duplicates, show only once in recent jobs. For todays hours, combine hours.
  -(first make a store), then Show todays_charges array on "Today's Charges"
  -(make a function in todaysChargesStore?) For "Add Charge", use authorized jobs and filter JSON to fill in component
 -Should this all be one store???

  * there will be a function to get todays charges (just a not, not a TODO)
-MOBX - REALLY FUCKING LEARN!!! BE READY TO USE NEXT WEEK!
	https://github.com/mobxjs/mobx-react-boilerplate/issues/8
	https://www.youtube.com/watch?v=5AMQaWaqjyA
-React Navigation: Learn passing props
	https://www.google.com/search?q=passing+data+between+tabs+react+navigation&oq=passing+data+between+tabs+react+navigation&aqs=chrome..69i57.10238j0j4&sourceid=chrome&ie=UTF-8
	https://github.com/react-community/react-navigation/issues/143

WHAT I DID:
-Fixed size of column width (Made row minHeight: 50 but can grow bigger if needs it)
-Added MobX (which is persistent state. I learned it in and out, so I can deal with what's coming)
-changed around the directory to proper standards in the React Native industry'
-show/hide button on password screen
-Lots of debugging (new MobX has decorators which only certain JavaScript libraries can use). The directions I found online wouldn't let me use it with Expo, so I had to find a workaround. This took a long time.
-Fixed excessive hours. Only shows if more than 24 now.
-Added Today's hours
-Fixed many of the buttons
-complain about logo

Tell Nick:
-I could not make the checkmark because I need a boolean property that I can change called "checked" in recentJobs so, I can check and uncheck it. Then, when I submit, it will need to iterate through the list and it will need the checked property to see if we add it to Today's Charges or not. Please set to "false".
-please add a similar property called "changed" in today's charges, so I know whether they changed their hours and I need to update them.

Bugs:
-Select Recent - when press either button and transferred to "Todays Charges" screen, theres 4 second lag on Android. I think it has to do with sliding the tabs, because when I turned on sliding tabs for iOS, the table looked messed up. When I took it off, it was fixed.
