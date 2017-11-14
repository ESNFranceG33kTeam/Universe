## Members

<dl>
<dt><a href="#settings_model">settings_model</a></dt>
<dd><p>This is the user settings model, used to store all information
relative to the user preferences.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#site_already_registered">site_already_registered(registered, site)</a></dt>
<dd><p>This function does the initialization of a new component, if the site given
hasn&#39;t been registered yet.</p>
</dd>
<dt><a href="#save_site_title">save_site_title(site, title)</a></dt>
<dd><p>This functions allows the application to save the title of
a page that would have changed its own.
It also propagates the title change to the tooltip, in the
sidebar menu.</p>
</dd>
<dt><a href="#save_parameters">save_parameters(params)</a></dt>
<dd><p>This function saves the user settings on the user local
storage.</p>
</dd>
<dt><a href="#get_parameters">get_parameters()</a> ⇒ <code>JSON</code></dt>
<dd><p>This function check if the user has settings stored on
its computer, and returns them ; if it&#39;s not the case,
it returns a new settings object.</p>
</dd>
<dt><a href="#subscribe_to_new_site">subscribe_to_new_site(url)</a></dt>
<dd><p>This function realizes all the tests to see if an url can be
subscribed to, or not.</p>
</dd>
<dt><a href="#is_valid_url">is_valid_url(url)</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function checks if a string is a valid url.</p>
</dd>
<dt><a href="#get_site_name">get_site_name(url)</a> ⇒ <code>String</code></dt>
<dd><p>This functions returns a temporary site name, based on its URL
(for example, using &#39;<a href="https://www.facebook.com">https://www.facebook.com</a>&#39; will return
&#39;Facebook&#39;).</p>
</dd>
</dl>

<a name="settings_model"></a>

## settings_model
This is the user settings model, used to store all information
relative to the user preferences.

**Kind**: global variable  
**Author**: Rémy Raes  
<a name="site_already_registered"></a>

## site_already_registered(registered, site)
This function does the initialization of a new component, if the site given
hasn't been registered yet.

**Kind**: global function  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| registered | <code>Boolean</code> | is the site already registered ? |
| site | <code>JSON</code> | JSON representing a website |

<a name="save_site_title"></a>

## save_site_title(site, title)
This functions allows the application to save the title of
a page that would have changed its own.
It also propagates the title change to the tooltip, in the
sidebar menu.

**Kind**: global function  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>JSON</code> | JSON object representing the site to update |
| title | <code>String</code> | new title to give to the page |

<a name="save_parameters"></a>

## save_parameters(params)
This function saves the user settings on the user local
storage.

**Kind**: global function  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>JSON</code> | JSON representing user settings |

<a name="get_parameters"></a>

## get_parameters() ⇒ <code>JSON</code>
This function check if the user has settings stored on
its computer, and returns them ; if it's not the case,
it returns a new settings object.

**Kind**: global function  
**Returns**: <code>JSON</code> - a JSON object representing user settings  
**Author**: Rémy Raes  
<a name="subscribe_to_new_site"></a>

## subscribe_to_new_site(url)
This function realizes all the tests to see if an url can be
subscribed to, or not.

**Kind**: global function  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Website address to check |

<a name="is_valid_url"></a>

## is_valid_url(url) ⇒ <code>Boolean</code>
This function checks if a string is a valid url.

**Kind**: global function  
**Returns**: <code>Boolean</code> - is the parameter a valid url or not  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | String to check |

<a name="get_site_name"></a>

## get_site_name(url) ⇒ <code>String</code>
This functions returns a temporary site name, based on its URL
(for example, using 'https://www.facebook.com' will return
'Facebook').

**Kind**: global function  
**Returns**: <code>String</code> - A human readable string reprensenting the URL  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to convert to a readable name |

