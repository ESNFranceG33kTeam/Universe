<a name="module_ESNbang/storage"></a>

## ESNbang/storage
This module contains all operations linked to manipulation of user
settings and their storage.

**Author**: Rémy Raes  

* [ESNbang/storage](#module_ESNbang/storage)
    * [.settings_model](#module_ESNbang/storage.settings_model)
    * [.save_sites(data)](#module_ESNbang/storage.save_sites)
    * [.site_already_registered(registered, site)](#module_ESNbang/storage.site_already_registered)
    * [._this.save_site_title(site, title)](#module_ESNbang/storage._this.save_site_title)
    * [._this.save_language(lang_code)](#module_ESNbang/storage._this.save_language)
    * [._this.save_parameters(params)](#module_ESNbang/storage._this.save_parameters)
    * [.store_parameters(params)](#module_ESNbang/storage.store_parameters)
    * [._this.get_parameters()](#module_ESNbang/storage._this.get_parameters) ⇒ <code>JSON</code>
    * [._this.subscribe_to_new_site(url)](#module_ESNbang/storage._this.subscribe_to_new_site)
    * [.is_valid_url(url)](#module_ESNbang/storage.is_valid_url) ⇒ <code>Boolean</code>
    * [.get_site_name(url)](#module_ESNbang/storage.get_site_name) ⇒ <code>String</code>

<a name="module_ESNbang/storage.settings_model"></a>

### ESNbang/storage.settings_model
This is the user settings model, used to store all information
relative to the user preferences.

**Kind**: static property of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  
<a name="module_ESNbang/storage.save_sites"></a>

### ESNbang/storage.save_sites(data)
This function saves user settings when its subscripted sites have been
changed.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>JSON</code> | Object containing all user websites |

<a name="module_ESNbang/storage.site_already_registered"></a>

### ESNbang/storage.site_already_registered(registered, site)
This function does the initialization of a new component, if the site given
hasn't been registered yet.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| registered | <code>Boolean</code> | is the site already registered ? |
| site | <code>JSON</code> | JSON representing a website |

<a name="module_ESNbang/storage._this.save_site_title"></a>

### ESNbang/storage._this.save_site_title(site, title)
This functions allows the application to save the title of
a page that would have changed its own.
It also propagates the title change to the tooltip, in the
sidebar menu.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>JSON</code> | JSON object representing the site to update |
| title | <code>String</code> | new title to give to the page |

<a name="module_ESNbang/storage._this.save_language"></a>

### ESNbang/storage._this.save_language(lang_code)
This function saves user settings when the application language
is changing.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| lang_code | <code>String</code> | code of the current language |

<a name="module_ESNbang/storage._this.save_parameters"></a>

### ESNbang/storage._this.save_parameters(params)
This function is the public method that enables modules to save
user settings.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>JSON</code> | Object containing the user settings, following the pattern settings_model |

<a name="module_ESNbang/storage.store_parameters"></a>

### ESNbang/storage.store_parameters(params)
This function saves the user settings on the user local
storage.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>JSON</code> | JSON representing user settings |

<a name="module_ESNbang/storage._this.get_parameters"></a>

### ESNbang/storage._this.get_parameters() ⇒ <code>JSON</code>
This function check if the user has settings stored on
its computer, and returns them ; if it's not the case,
it returns a new settings object.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Returns**: <code>JSON</code> - a JSON object representing user settings  
**Author**: Rémy Raes  
<a name="module_ESNbang/storage._this.subscribe_to_new_site"></a>

### ESNbang/storage._this.subscribe_to_new_site(url)
This function realizes all the tests to see if an url can be
subscribed to, or not.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Website address to check |

<a name="module_ESNbang/storage.is_valid_url"></a>

### ESNbang/storage.is_valid_url(url) ⇒ <code>Boolean</code>
This function checks if a string is a valid url.

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Returns**: <code>Boolean</code> - is the parameter a valid url or not  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | String to check |

<a name="module_ESNbang/storage.get_site_name"></a>

### ESNbang/storage.get_site_name(url) ⇒ <code>String</code>
This functions returns a temporary site name, based on its URL
(for example, using 'https://www.facebook.com' will return
'Facebook').

**Kind**: static method of [<code>ESNbang/storage</code>](#module_ESNbang/storage)  
**Returns**: <code>String</code> - A human readable string reprensenting the URL  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to convert to a readable name |

