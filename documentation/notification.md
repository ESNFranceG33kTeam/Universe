<a name="module_ESNbang/notification"></a>

## ESNbang/notification
This modules contains all operations linked to communication of
information to the user, being by desktop or site notifications.

**Author**: Rémy Raes  

* [ESNbang/notification](#module_ESNbang/notification)
    * [._this.add_notification_on_site(url)](#module_ESNbang/notification._this.add_notification_on_site)
    * [._this.remove_notification_from_site(url)](#module_ESNbang/notification._this.remove_notification_from_site)

<a name="module_ESNbang/notification._this.add_notification_on_site"></a>

### ESNbang/notification._this.add_notification_on_site(url)
This function creates notification on a website node, to signal
to the user something happened (eg: a new publication).

**Kind**: static method of [<code>ESNbang/notification</code>](#module_ESNbang/notification)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Address of the website from which to add notification |

<a name="module_ESNbang/notification._this.remove_notification_from_site"></a>

### ESNbang/notification._this.remove_notification_from_site(url)
This function removes the notification object from a website
node (eg: when the user has read everything on the node).

**Kind**: static method of [<code>ESNbang/notification</code>](#module_ESNbang/notification)  
**Author**: Rémy Raes  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Address of the website from which to remove notification |

