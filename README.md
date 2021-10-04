# svelte-themable-ui

A set of themable UI elements.

## Usage

```bash
npm i --save-dev @jerrythomas/svelte-themable-ui@beta
```

In your svelte components

```svelte
import { Icon, Heart } from 'svelte-icons'

<Icon icon={Heart} title={Heart} />
```

Refer to the [examples](example) for examples of all available UI elements.

## Component States

These states are used for higlighting current elements or for using a style appropriate for teh state (`pass`, `fail`, `warn`, `info`).

- isCurrent
- isInfo
- isError
- isSuccess
- isWarning
- isFocussed

## Validation states

Used for showing validation states for input elements

- hasPassed
- hasWarnings
- hasErrors

## Icons

An Icon wrapper component and a collection of vector icons as svelte components.

- All icons are 24x24 pixels by default.
- Size of the icon can be customized using `em`, `%` or `px` values
- Text color property is used as icon color
- Most if not all of the icons have been taken from [heroicons](https://heroicons.com/)

### Custom Icons

You can create any number of custom icons to be used with the icon wrapper.

- Icon should be designed with 24x24 size.
- The svelte component should only contain the vector shapes.
