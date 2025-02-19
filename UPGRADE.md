# Upgrading

The intent of this document is to make migration of breaking changes as easy as possible.
Please note that not all breaking changes might be included here.

## 0.7.x
The mantainers of this package have changed, the project has been renamed to `react-page`, if you wish to update to the latest version, you can do so by updating your dependencies, here are the new package names:

|Old|New|
|-|-|
|ory-editor|react-page-nm-react-page|
|ory-editor-core|react-page-nm-core|
|ory-editor-plugins-divider|react-page-nm-plugins-divider|
|ory-editor-plugins-html5-video|react-page-nm-plugins-html5-video|
|ory-editor-plugins-image|react-page-nm-plugins-image|
|ory-editor-plugins-default-native|react-page-nm-plugins-default-native|
|ory-editor-plugins-slate|react-page-nm-plugins-slate|
|ory-editor-plugins-spacer|react-page-nm-plugins-spacer|
|ory-editor-plugins-video|react-page-nm-plugins-video|
|ory-editor-plugins-background|react-page-nm-plugins-background|
|ory-editor-plugins-parallax-background|react-page-nm-plugins-parallax-background|
|ory-editor-renderer|react-page-nm-renderer|
|ory-editor-ui|react-page-nm-ui|

## 0.6.x
We have added full typescript support in this release. That means you might get into trouble if you use typescript, write your own plugins and made false assumptions about props passed by ory editor.
Please report these cases if you think it's a problem on our end. Otherwise, fix your code :) As we don't want to halt your progress, if it indeed is a problem with our code, remember that you can easily override typescript types using paths property in tsconfig. Just remember to remove these dirty fixes as soon as we fix them on our end. That way you'll always end up with latest changes.
