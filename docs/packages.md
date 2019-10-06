# Core plugins

## Packages

The editor consists of multiple packages. A meta package available at [react-page](https://www.npmjs.com/package/react-page-nm-react-page).

## [react-page-nm-core](https://www.npmjs.com/package/react-page-nm-core)

This package is the React Page's core. It contains the logic for creating and modifying layouts and is responsible for
handling plugins.

## [react-page-nm-ui](https://www.npmjs.com/package/react-page-nm-ui)

This repository contains React Page UI React Components that are based on
[mui-org/material-ui](https://github.com/mui-org/material-ui). While there is no need for you to use them, they
offer an easy way to start working with the React Page.

## [react-page-nm-renderer](https://www.npmjs.com/package/react-page-nm-renderer)

This package contains rendering components for React Page states. Currently, only HTML rendering is supported. The
HTML rendering component is responsible for outputting static HTML and mounting dynamic plugins on the user-agent side.

## Plugins

### [react-page-nm-plugins-slate](https://www.npmjs.com/package/react-page-nm-plugins-slate)

The text editing allows you to create and modify rich-text and is optimized for use with the React Page. We strongly encourage using our text editing solution. You can check more config options about this plugin [here](plugins/slate.md).

<p>
  <figure align="center">
    <img alt="Text editing plugin" src="./images/text-editing-plugin.gif"><br>
    <figcaption>The text editing plugin based on <a href="http://slatejs.org">Slate</a></figcaption>
  </figure>
</p>

### [react-page-nm-plugins-image](https://www.npmjs.com/package/react-page-nm-plugins-image)

The image plugin allows you to add images to your content by entering their URL. The image plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Image plugin" src="./images/image-plugin.gif"><br>
    <figcaption>The image plugin</figcaption>
  </figure>
</p>

The image plugin is not configurable.

### [react-page-nm-plugins-video](https://www.npmjs.com/package/react-page-nm-plugins-video)

The image plugin allows you to add images to your content by entering their URL. The image plugin does not support
uploads.

<p>
  <figure align="center">
    <img alt="Video plugin" src="./images/video-plugin.gif"><br>
    <figcaption>The video plugin</figcaption>
  </figure>
</p>

The video plugin is not configurable.

### [react-page-nm-plugins-spacer](https://www.npmjs.com/package/react-page-nm-plugins-spacer)

The spacer is a plugin which you can use to create an empty fixed height cell.

<p>
  <figure align="center">
    <img alt="Spacer plugin" src="./images/spacer-plugin.gif"><br>
    <figcaption>The spacer plugin</figcaption>
  </figure>
</p>

The spacer plugin is not configurable.

### [react-page-nm-plugins-parallax-background](https://www.npmjs.com/package/react-page-nm-plugins-parallax-background)

The parallax background plugin is a layout plugin, allowing you to add a parallax background image to your content.

<p>
  <figure align="center">
    <img alt="Spacer plugin" src="./images/parallax-background.gif"><br>
    <figcaption>The parallax background plugin</figcaption>
  </figure>
</p>

The parallax background plugin is not configurable.


## Didn't find what you were looking for?

That's fine, you can create your own plugins and use them, check the instructions [here](plugins/create.md).