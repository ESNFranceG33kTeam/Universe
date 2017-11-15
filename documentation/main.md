## Functions

<dl>
<dt><a href="#check_loaded_frames">check_loaded_frames()</a></dt>
<dd><p>This function check if all iframes have loaded their content;
if that&#39;s the case, it removes the loading screen.</p>
</dd>
<dt><a href="#hide_loading_screen">hide_loading_screen()</a></dt>
<dd><p>This function hides the loading screen, enabling the user to
access the application functionnalities.</p>
</dd>
<dt><a href="#create_site_menu_component">create_site_menu_component(url)</a></dt>
<dd><p>This function creates a component representing a website
on the side menu.</p>
</dd>
<dt><a href="#create_site_menu_separation">create_site_menu_separation()</a></dt>
<dd><p>This function appends an HR element into the side menu.</p>
</dd>
<dt><a href="#create_site_frame_component">create_site_frame_component(site)</a></dt>
<dd><p>This function creates a frame encapsulating a website
on the side menu.</p>
</dd>
<dt><a href="#show_new_site_subscription">show_new_site_subscription()</a></dt>
<dd><p>This function makes the subscription window appear.</p>
</dd>
<dt><a href="#reset_new_site_subscription">reset_new_site_subscription()</a></dt>
<dd><p>This function initializes the subscription window (style, animation, tooltip text).</p>
</dd>
<dt><a href="#set_new_site_warning">set_new_site_warning(message)</a></dt>
<dd><p>This function sets a warning state on the subscription window.</p>
</dd>
<dt><a href="#set_overflow_on_menu">set_overflow_on_menu()</a></dt>
<dd><p>This functions checks if the side menu is overflowed, if that&#39;s
the case, it sets the scrolling buttons state to visible.</p>
</dd>
<dt><a href="#menu_is_overflowed">menu_is_overflowed()</a> ⇒ <code>Boolean</code></dt>
<dd><p>This functions returns the state of the state bar, meaning if its size
enables it to display completely within the screen.</p>
</dd>
</dl>

<a name="check_loaded_frames"></a>

## check_loaded_frames()
This function check if all iframes have loaded their content;
if that's the case, it removes the loading screen.

**Kind**: global function  
**Author**: Rémy Raes  
<a name="hide_loading_screen"></a>

## hide_loading_screen()
This function hides the loading screen, enabling the user to
access the application functionnalities.

**Kind**: global function  
**Author**: Rémy Raes  
<a name="create_site_menu_component"></a>

## create_site_menu_component(url)
This function creates a component representing a website
on the side menu.

**Kind**: global function  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL of the new website |

<a name="create_site_menu_separation"></a>

## create_site_menu_separation()
This function appends an HR element into the side menu.

**Kind**: global function  
**Author**: Rémy Raes  
<a name="create_site_frame_component"></a>

## create_site_frame_component(site)
This function creates a frame encapsulating a website
on the side menu.

**Kind**: global function  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| site | <code>String</code> | The URL of the new website |

<a name="show_new_site_subscription"></a>

## show_new_site_subscription()
This function makes the subscription window appear.

**Kind**: global function  
**Author**: Rémy Raes  
<a name="reset_new_site_subscription"></a>

## reset_new_site_subscription()
This function initializes the subscription window (style, animation, tooltip text).

**Kind**: global function  
**Author**: Rémy Raes  
<a name="set_new_site_warning"></a>

## set_new_site_warning(message)
This function sets a warning state on the subscription window.

**Kind**: global function  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to display to the user |

<a name="set_overflow_on_menu"></a>

## set_overflow_on_menu()
This functions checks if the side menu is overflowed, if that's
the case, it sets the scrolling buttons state to visible.

**Kind**: global function  
**Author**: Rémy Raes  
<a name="menu_is_overflowed"></a>

## menu_is_overflowed() ⇒ <code>Boolean</code>
This functions returns the state of the state bar, meaning if its size
enables it to display completely within the screen.

**Kind**: global function  
**Returns**: <code>Boolean</code> - is the side menu going out of the screen or not  
**Author**: Rémy Raes  
**Todo**

- [ ] doesn't work when the subscribe button is above the application bottom

