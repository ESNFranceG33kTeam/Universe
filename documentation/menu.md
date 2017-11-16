## Modules

<dl>
<dt><a href="#module_ESNbang/menu">ESNbang/menu</a></dt>
<dd><p>This module contains all operations linked to the side menu of the
application.</p>
</dd>
<dt><a href="#module_ESNbang/menu/siteButton">ESNbang/menu/siteButton</a></dt>
<dd><p>This submodule contains all operations linked to manipulation of the site
buttons.</p>
</dd>
</dl>

<a name="module_ESNbang/menu"></a>

## ESNbang/menu
This module contains all operations linked to the side menu of the
application.

**Author**: Rémy Raes  

* [ESNbang/menu](#module_ESNbang/menu)
    * [._this.get_added_sites_number()](#module_ESNbang/menu._this.get_added_sites_number) ⇒ <code>Integer</code>
    * [.menu_is_overflowed()](#module_ESNbang/menu.menu_is_overflowed) ⇒ <code>Boolean</code>
    * [._this.set_overflow_on_menu()](#module_ESNbang/menu._this.set_overflow_on_menu)
    * [.scroll_menu_up()](#module_ESNbang/menu.scroll_menu_up)
    * [.scroll_menu_down()](#module_ESNbang/menu.scroll_menu_down)

<a name="module_ESNbang/menu._this.get_added_sites_number"></a>

### ESNbang/menu._this.get_added_sites_number() ⇒ <code>Integer</code>
This function gives the number of sites that has been added by the user.

**Kind**: static method of [<code>ESNbang/menu</code>](#module_ESNbang/menu)  
**Returns**: <code>Integer</code> - the number of added sites  
**Author**: Rémy Raes  
<a name="module_ESNbang/menu.menu_is_overflowed"></a>

### ESNbang/menu.menu_is_overflowed() ⇒ <code>Boolean</code>
This functions returns the state of the state bar, meaning if its size
enables it to display completely within the screen.

**Kind**: static method of [<code>ESNbang/menu</code>](#module_ESNbang/menu)  
**Returns**: <code>Boolean</code> - is the side menu going out of the screen or not  
**Author**: Rémy Raes  
<a name="module_ESNbang/menu._this.set_overflow_on_menu"></a>

### ESNbang/menu._this.set_overflow_on_menu()
This functions checks if the side menu is overflowed, if that's
the case, it sets the scrolling buttons state to visible.

**Kind**: static method of [<code>ESNbang/menu</code>](#module_ESNbang/menu)  
**Author**: Rémy Raes  
<a name="module_ESNbang/menu.scroll_menu_up"></a>

### ESNbang/menu.scroll_menu_up()
This function is used to scroll the menu up, if possible.

**Kind**: static method of [<code>ESNbang/menu</code>](#module_ESNbang/menu)  
**Author**: Rémy Raes  
<a name="module_ESNbang/menu.scroll_menu_down"></a>

### ESNbang/menu.scroll_menu_down()
This function is used to scroll the menu down, if possible.

**Kind**: static method of [<code>ESNbang/menu</code>](#module_ESNbang/menu)  
**Author**: Rémy Raes  
<a name="module_ESNbang/menu/siteButton"></a>

## ESNbang/menu/siteButton
This submodule contains all operations linked to manipulation of the site
buttons.

**Author**: Rémy Raes  

* [ESNbang/menu/siteButton](#module_ESNbang/menu/siteButton)
    * [._this.create_new_button(url)](#module_ESNbang/menu/siteButton._this.create_new_button)
    * [.create_site_menu_separation()](#module_ESNbang/menu/siteButton.create_site_menu_separation)
    * [.delete_button(url)](#module_ESNbang/menu/siteButton.delete_button)
    * [._this.update_tooltip_title(url, title)](#module_ESNbang/menu/siteButton._this.update_tooltip_title)
    * [._this.update_button_image(url, image_url)](#module_ESNbang/menu/siteButton._this.update_button_image)

<a name="module_ESNbang/menu/siteButton._this.create_new_button"></a>

### ESNbang/menu/siteButton._this.create_new_button(url)
This function creates a component representing a website
on the side menu.

**Kind**: static method of [<code>ESNbang/menu/siteButton</code>](#module_ESNbang/menu/siteButton)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL of the new website |

<a name="module_ESNbang/menu/siteButton.create_site_menu_separation"></a>

### ESNbang/menu/siteButton.create_site_menu_separation()
This function appends an HR element into the side menu.

**Kind**: static method of [<code>ESNbang/menu/siteButton</code>](#module_ESNbang/menu/siteButton)  
**Author**: Rémy Raes  
<a name="module_ESNbang/menu/siteButton.delete_button"></a>

### ESNbang/menu/siteButton.delete_button(url)
This functions deletes a button from the menu.

**Kind**: static method of [<code>ESNbang/menu/siteButton</code>](#module_ESNbang/menu/siteButton)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | hashed url of the website to delete |

<a name="module_ESNbang/menu/siteButton._this.update_tooltip_title"></a>

### ESNbang/menu/siteButton._this.update_tooltip_title(url, title)
This function updates the tooltip containing the title of a site.

**Kind**: static method of [<code>ESNbang/menu/siteButton</code>](#module_ESNbang/menu/siteButton)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | hashed url of the site to update |
| title | <code>String</code> | new site title to put into its tooltip |

<a name="module_ESNbang/menu/siteButton._this.update_button_image"></a>

### ESNbang/menu/siteButton._this.update_button_image(url, image_url)
This function updates the image of a site button.

**Kind**: static method of [<code>ESNbang/menu/siteButton</code>](#module_ESNbang/menu/siteButton)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | hashed url of the site to update |
| image_url | <code>String</code> | url of the new background image |

