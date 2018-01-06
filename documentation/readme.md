## Modules

<dl>
<dt><a href="#module_Universe/menu/buttonManager">Universe/menu/buttonManager</a></dt>
<dd><p>This submodule contains all operations linked to manipulation of the site
buttons.</p>
</dd>
<dt><a href="#module_Universe/frameManager">Universe/frameManager</a></dt>
<dd><p>This module contains all operations linked to manipulation of the
webviews.</p>
</dd>
<dt><a href="#module_Universe/i18n">Universe/i18n</a></dt>
<dd><p>This module allows the application content to be translated to multiple languages.
If you want to introduce translations for another element than those initialized
in i18n, you have to give it an id in the HTML code, to reference it in i18n, and
then to write your translations.</p>
</dd>
<dt><a href="#module_Universe/menu">Universe/menu</a></dt>
<dd><p>This module contains all operations linked to the side menu of the
application.</p>
</dd>
<dt><a href="#module_Universe/notification">Universe/notification</a></dt>
<dd><p>This modules contains all operations linked to communication of
information to the user, being by desktop or site notifications.</p>
</dd>
<dt><a href="#module_Universe/storage">Universe/storage</a></dt>
<dd><p>This module contains all operations linked to manipulation of user
settings and their storage.</p>
</dd>
<dt><a href="#module_Universe/subscription">Universe/subscription</a></dt>
<dd><p>This module contains all operations linked to manipulation of the
&quot;new subscription&quot; window, which is used for the user to add a new site
to its application.</p>
</dd>
<dt><a href="#module_Universe/tutorial">Universe/tutorial</a></dt>
<dd><p>This module contains all operations linked to the tutorial mode.</p>
</dd>
<dt><a href="#module_Universe/updater">Universe/updater</a></dt>
<dd><p>This module contains all operations linked the the application versionning.</p>
</dd>
</dl>

<a name="module_Universe/menu/buttonManager"></a>

## Universe/menu/buttonManager
This submodule contains all operations linked to manipulation of the sitebuttons.

**Author**: Rémy Raes  

* [Universe/menu/buttonManager](#module_Universe/menu/buttonManager)
    * [._this.create_new_button(site)](#module_Universe/menu/buttonManager._this.create_new_button)
    * [.create_site_menu_separation()](#module_Universe/menu/buttonManager.create_site_menu_separation)
    * [.delete_button(site)](#module_Universe/menu/buttonManager.delete_button)
    * [._this.update_tooltip_title(site, title)](#module_Universe/menu/buttonManager._this.update_tooltip_title)
    * [._this.update_button_image(site, image_url)](#module_Universe/menu/buttonManager._this.update_button_image)
    * [._this.add_loader(site)](#module_Universe/menu/buttonManager._this.add_loader)
    * [._this.remove_loader(site)](#module_Universe/menu/buttonManager._this.remove_loader)

<a name="module_Universe/menu/buttonManager._this.create_new_button"></a>

### Universe/menu/buttonManager._this.create_new_button(site)
Creates a component representing a websiteon the side menu.

**Kind**: static method of [<code>Universe/menu/buttonManager</code>](#module_Universe/menu/buttonManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/menu/buttonManager.create_site_menu_separation"></a>

### Universe/menu/buttonManager.create_site_menu_separation()
Inserts a separator into the side menu.

**Kind**: static method of [<code>Universe/menu/buttonManager</code>](#module_Universe/menu/buttonManager)  
**Author**: Rémy Raes  
<a name="module_Universe/menu/buttonManager.delete_button"></a>

### Universe/menu/buttonManager.delete_button(site)
Deletes a button from the menu.

**Kind**: static method of [<code>Universe/menu/buttonManager</code>](#module_Universe/menu/buttonManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/menu/buttonManager._this.update_tooltip_title"></a>

### Universe/menu/buttonManager._this.update_tooltip_title(site, title)
Updates the tooltip containing the title of a site.

**Kind**: static method of [<code>Universe/menu/buttonManager</code>](#module_Universe/menu/buttonManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |
| title | <code>String</code> | new site title to put into its tooltip |

<a name="module_Universe/menu/buttonManager._this.update_button_image"></a>

### Universe/menu/buttonManager._this.update_button_image(site, image_url)
Updates the image of a site button.

**Kind**: static method of [<code>Universe/menu/buttonManager</code>](#module_Universe/menu/buttonManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |
| image_url | <code>String</code> | url of the new background image |

<a name="module_Universe/menu/buttonManager._this.add_loader"></a>

### Universe/menu/buttonManager._this.add_loader(site)
Sets a button state to loading (adds a CSS animation).

**Kind**: static method of [<code>Universe/menu/buttonManager</code>](#module_Universe/menu/buttonManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/menu/buttonManager._this.remove_loader"></a>

### Universe/menu/buttonManager._this.remove_loader(site)
Removes the loading state of a button.

**Kind**: static method of [<code>Universe/menu/buttonManager</code>](#module_Universe/menu/buttonManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/frameManager"></a>

## Universe/frameManager
This module contains all operations linked to manipulation of thewebviews.

**Author**: Rémy Raes  

* [Universe/frameManager](#module_Universe/frameManager)
    * [.check_loaded_frames()](#module_Universe/frameManager.check_loaded_frames)
    * [._this.hide_loading_screen()](#module_Universe/frameManager._this.hide_loading_screen)
    * [.hide_all_frames()](#module_Universe/frameManager.hide_all_frames)
    * [._this.create_new_frame(site)](#module_Universe/frameManager._this.create_new_frame)
    * [.frame_is_focused(url)](#module_Universe/frameManager.frame_is_focused) ⇒ <code>Boolean</code>
    * [._this.delete_frame(site)](#module_Universe/frameManager._this.delete_frame)
    * [._this.reset_frame(site)](#module_Universe/frameManager._this.reset_frame)
    * [._this.trigger_tutorial_mode()](#module_Universe/frameManager._this.trigger_tutorial_mode)

<a name="module_Universe/frameManager.check_loaded_frames"></a>

### Universe/frameManager.check_loaded_frames()
Checks if all webviews have loaded their content;if that's the case, removes the loading screen.

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Author**: Rémy Raes  
<a name="module_Universe/frameManager._this.hide_loading_screen"></a>

### Universe/frameManager._this.hide_loading_screen()
Hides the loading screen, and launch the tutorial mode if theapplication is started for the first time (or reset).

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Author**: Rémy Raes  
<a name="module_Universe/frameManager.hide_all_frames"></a>

### Universe/frameManager.hide_all_frames()
Hides all webviews.

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Author**: Rémy Raes  
<a name="module_Universe/frameManager._this.create_new_frame"></a>

### Universe/frameManager._this.create_new_frame(site)
Creates a webview showing a certain website.

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/frameManager.frame_is_focused"></a>

### Universe/frameManager.frame_is_focused(url) ⇒ <code>Boolean</code>
Returns if a webview is focused.

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Returns**: <code>Boolean</code> - is the frame focused or not  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | url of the site webview |

<a name="module_Universe/frameManager._this.delete_frame"></a>

### Universe/frameManager._this.delete_frame(site)
Deletes a webview.

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/frameManager._this.reset_frame"></a>

### Universe/frameManager._this.reset_frame(site)
Resets a webview to the url it was registered with.

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/frameManager._this.trigger_tutorial_mode"></a>

### Universe/frameManager._this.trigger_tutorial_mode()
When called, tells to the frameManager to launch tutorial mode assoon as all webviews are loaded and ready to display.

**Kind**: static method of [<code>Universe/frameManager</code>](#module_Universe/frameManager)  
**Author**: Rémy Raes  
<a name="module_Universe/i18n"></a>

## Universe/i18n
This module allows the application content to be translated to multiple languages.If you want to introduce translations for another element than those initializedin i18n, you have to give it an id in the HTML code, to reference it in i18n, andthen to write your translations.

**Author**: Rémy Raes  

* [Universe/i18n](#module_Universe/i18n)
    * [._this.load_language_file(lang_code)](#module_Universe/i18n._this.load_language_file)
    * [.change_language(json)](#module_Universe/i18n.change_language)

<a name="module_Universe/i18n._this.load_language_file"></a>

### Universe/i18n._this.load_language_file(lang_code)
Launches the loading of a file containing translations of theapplication texts in a certain language.Once the file is loaded, launches the live translation of the texts;if it doesn't exists, exits.

**Kind**: static method of [<code>Universe/i18n</code>](#module_Universe/i18n)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| lang_code | <code>String</code> | code representing a language |

<a name="module_Universe/i18n.change_language"></a>

### Universe/i18n.change_language(json)
Allows the application to switch the text of certain elements toenable the understanding of it for differents languages.

**Kind**: static method of [<code>Universe/i18n</code>](#module_Universe/i18n)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>JSON</code> | Object containing all variables translated in a certain language |

<a name="module_Universe/menu"></a>

## Universe/menu
This module contains all operations linked to the side menu of theapplication.

**Author**: Rémy Raes  

* [Universe/menu](#module_Universe/menu)
    * [.menu_is_overflowed()](#module_Universe/menu.menu_is_overflowed) ⇒ <code>Boolean</code>
    * [._this.set_overflow_on_menu()](#module_Universe/menu._this.set_overflow_on_menu)
    * [.scroll_menu_up()](#module_Universe/menu.scroll_menu_up)
    * [.scroll_menu_down()](#module_Universe/menu.scroll_menu_down)

<a name="module_Universe/menu.menu_is_overflowed"></a>

### Universe/menu.menu_is_overflowed() ⇒ <code>Boolean</code>
Returns the state of the state bar, meaning if its size enables it to bedisplayed completely within the screen.

**Kind**: static method of [<code>Universe/menu</code>](#module_Universe/menu)  
**Returns**: <code>Boolean</code> - is the side menu going out of the screen or not  
**Author**: Rémy Raes  
<a name="module_Universe/menu._this.set_overflow_on_menu"></a>

### Universe/menu._this.set_overflow_on_menu()
Checks if the side menu is overflowed; if that's the case, sets thescrolling buttons state to visible.

**Kind**: static method of [<code>Universe/menu</code>](#module_Universe/menu)  
**Author**: Rémy Raes  
<a name="module_Universe/menu.scroll_menu_up"></a>

### Universe/menu.scroll_menu_up()
Used to scroll the menu up, if possible.

**Kind**: static method of [<code>Universe/menu</code>](#module_Universe/menu)  
**Author**: Rémy Raes  
<a name="module_Universe/menu.scroll_menu_down"></a>

### Universe/menu.scroll_menu_down()
Used to scroll the menu down, if possible.

**Kind**: static method of [<code>Universe/menu</code>](#module_Universe/menu)  
**Author**: Rémy Raes  
<a name="module_Universe/notification"></a>

## Universe/notification
This modules contains all operations linked to communication ofinformation to the user, being by desktop or site notifications.

**Author**: Rémy Raes  

* [Universe/notification](#module_Universe/notification)
    * [.send_notification()](#module_Universe/notification.send_notification)
    * [._this.add_notification_on_site(site)](#module_Universe/notification._this.add_notification_on_site)
    * [._this.remove_notification_from_site(site)](#module_Universe/notification._this.remove_notification_from_site)

<a name="module_Universe/notification.send_notification"></a>

### Universe/notification.send_notification()
Sends a notification informing the user that a certain website hasreceived news.

**Kind**: static method of [<code>Universe/notification</code>](#module_Universe/notification)  
**Author**: Rémy Raes  
<a name="module_Universe/notification._this.add_notification_on_site"></a>

### Universe/notification._this.add_notification_on_site(site)
Creates notification on a website button, to signal to the usersomething happened (eg: a new publication).

**Kind**: static method of [<code>Universe/notification</code>](#module_Universe/notification)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/notification._this.remove_notification_from_site"></a>

### Universe/notification._this.remove_notification_from_site(site)
Removes the notification object from a website button (eg: when the userhas read everything on the node).

**Kind**: static method of [<code>Universe/notification</code>](#module_Universe/notification)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/storage"></a>

## Universe/storage
This module contains all operations linked to manipulation of usersettings and their storage.

**Author**: Rémy Raes  

* [Universe/storage](#module_Universe/storage)
    * [.settings_model](#module_Universe/storage.settings_model)
    * [.save_sites(data)](#module_Universe/storage.save_sites)
    * [.site_already_registered(registered, site)](#module_Universe/storage.site_already_registered)
    * [._this.save_site_title(site, title)](#module_Universe/storage._this.save_site_title)
    * [._this.save_site(site)](#module_Universe/storage._this.save_site)
    * [._this.save_language(lang_code)](#module_Universe/storage._this.save_language)
    * [._this.save_parameters(params)](#module_Universe/storage._this.save_parameters)
    * [.store_parameters(params)](#module_Universe/storage.store_parameters)
    * [._this.get_parameters()](#module_Universe/storage._this.get_parameters) ⇒ <code>JSON</code>
    * [._this.subscribe_to_new_site(url)](#module_Universe/storage._this.subscribe_to_new_site)
    * [.is_valid_url(url)](#module_Universe/storage.is_valid_url) ⇒ <code>Boolean</code>
    * [.get_site_name(url)](#module_Universe/storage.get_site_name) ⇒ <code>String</code>

<a name="module_Universe/storage.settings_model"></a>

### Universe/storage.settings_model
This is the user settings model, used to store all informationrelative to the user preferences.

**Kind**: static property of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  
<a name="module_Universe/storage.save_sites"></a>

### Universe/storage.save_sites(data)
Saves user settings when its subscripted sites have been changed.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Object containing all user websites |

<a name="module_Universe/storage.site_already_registered"></a>

### Universe/storage.site_already_registered(registered, site)
Does the initialization of a new component, if the site given hasn'tbeen registered yet.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| registered | <code>Boolean</code> | is the site already registered ? |
| site | <code>Object</code> | Website object |

<a name="module_Universe/storage._this.save_site_title"></a>

### Universe/storage._this.save_site_title(site, title)
Allows the application to save the title of a page that have changedits own.Propagates the title change to the tooltip, in the sidebar menu.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |
| title | <code>String</code> | new title to give to the page |

<a name="module_Universe/storage._this.save_site"></a>

### Universe/storage._this.save_site(site)
Saves a single site into the user settings.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>Object</code> | Website object |

<a name="module_Universe/storage._this.save_language"></a>

### Universe/storage._this.save_language(lang_code)
Saves user settings when the application language is changed.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| lang_code | <code>String</code> | code of the current language |

<a name="module_Universe/storage._this.save_parameters"></a>

### Universe/storage._this.save_parameters(params)
This function is the public method that enables modules to saveuser settings.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>JSON</code> | Object containing the user settings, following the pattern @settings_model |

<a name="module_Universe/storage.store_parameters"></a>

### Universe/storage.store_parameters(params)
This function saves the user settings on the user local storage.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>JSON</code> | JSON representing user settings |

<a name="module_Universe/storage._this.get_parameters"></a>

### Universe/storage._this.get_parameters() ⇒ <code>JSON</code>
Checks if the user has settings stored on its computer, and returnsthem; if it's not the case, returns a new settings object.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Returns**: <code>JSON</code> - a JSON object representing user settings  
**Author**: Rémy Raes  
<a name="module_Universe/storage._this.subscribe_to_new_site"></a>

### Universe/storage._this.subscribe_to_new_site(url)
Realizes all the tests to see if an url can be subscribed to, or not.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Website address to check |

<a name="module_Universe/storage.is_valid_url"></a>

### Universe/storage.is_valid_url(url) ⇒ <code>Boolean</code>
Checks if a string is a valid url.

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Returns**: <code>Boolean</code> - is the parameter a valid url or not  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | String to check |

<a name="module_Universe/storage.get_site_name"></a>

### Universe/storage.get_site_name(url) ⇒ <code>String</code>
Returns a temporary site name, based on its URL (for example, using'https://www.facebook.com' will return 'Facebook').

**Kind**: static method of [<code>Universe/storage</code>](#module_Universe/storage)  
**Returns**: <code>String</code> - A human readable string reprensenting the URL  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to convert to a readable name |

<a name="module_Universe/subscription"></a>

## Universe/subscription
This module contains all operations linked to manipulation of the"new subscription" window, which is used for the user to add a new siteto its application.

**Author**: Rémy Raes  

* [Universe/subscription](#module_Universe/subscription)
    * [._this.show_new_site_subscription()](#module_Universe/subscription._this.show_new_site_subscription)
    * [._this.reset()](#module_Universe/subscription._this.reset)
    * [._this.set_new_site_warning(message)](#module_Universe/subscription._this.set_new_site_warning)

<a name="module_Universe/subscription._this.show_new_site_subscription"></a>

### Universe/subscription._this.show_new_site_subscription()
Makes the subscription window appear.

**Kind**: static method of [<code>Universe/subscription</code>](#module_Universe/subscription)  
**Author**: Rémy Raes  
<a name="module_Universe/subscription._this.reset"></a>

### Universe/subscription._this.reset()
Initializes the subscription window (style, animation, tooltip text).

**Kind**: static method of [<code>Universe/subscription</code>](#module_Universe/subscription)  
**Author**: Rémy Raes  
<a name="module_Universe/subscription._this.set_new_site_warning"></a>

### Universe/subscription._this.set_new_site_warning(message)
Sets a warning state on the subscription window.

**Kind**: static method of [<code>Universe/subscription</code>](#module_Universe/subscription)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to display to the user |

<a name="module_Universe/tutorial"></a>

## Universe/tutorial
This module contains all operations linked to the tutorial mode.

**Author**: Rémy Raes  

* [Universe/tutorial](#module_Universe/tutorial)
    * [.init_tutorial_mode()](#module_Universe/tutorial.init_tutorial_mode)
    * [._this.launch_tutorial_mode()](#module_Universe/tutorial._this.launch_tutorial_mode)

<a name="module_Universe/tutorial.init_tutorial_mode"></a>

### Universe/tutorial.init_tutorial_mode()
Initializes spotlight.js with a tutorial configuration.

**Kind**: static method of [<code>Universe/tutorial</code>](#module_Universe/tutorial)  
**Author**: Rémy Raes  
<a name="module_Universe/tutorial._this.launch_tutorial_mode"></a>

### Universe/tutorial._this.launch_tutorial_mode()
Public method that launches the tutorial mode.Will behave differently if no website has been added to the application.

**Kind**: static method of [<code>Universe/tutorial</code>](#module_Universe/tutorial)  
**Author**: Rémy Raes  
<a name="module_Universe/updater"></a>

## Universe/updater
This module contains all operations linked the the application versionning.

**Author**: Rémy Raes  

* [Universe/updater](#module_Universe/updater)
    * [.String#hashCode()](#module_Universe/updater.String+hashCode)
    * [.updateVersionIndicator()](#module_Universe/updater.updateVersionIndicator)
    * [._this.updateVersionIndicator()](#module_Universe/updater._this.updateVersionIndicator)

<a name="module_Universe/updater.String+hashCode"></a>

### Universe/updater.String#hashCode()
Returns a hash value.Used to obtain HTML identifiers for buttons and webviews.

**Kind**: static method of [<code>Universe/updater</code>](#module_Universe/updater)  
**Author**: Rémy Raes  
<a name="module_Universe/updater.updateVersionIndicator"></a>

### Universe/updater.updateVersionIndicator()
Updates the version indicator when the application starts.

**Kind**: static method of [<code>Universe/updater</code>](#module_Universe/updater)  
**Author**: Rémy Raes  
<a name="module_Universe/updater._this.updateVersionIndicator"></a>

### Universe/updater._this.updateVersionIndicator()
Public getter of the version updating method.

**Kind**: static method of [<code>Universe/updater</code>](#module_Universe/updater)  
**Author**: Rémy Raes  

