# PWA Studio Newsletter extension

[image]

### Requeriments

- Magento 2.4.1

### Footer component

![Footer Component](https://github.com/wesleyalmd/pwa-studio-newsletter/raw/master/docs/preview1.png 'Preview Footer Component')

### Modal component

![Modal Component](https://github.com/wesleyalmd/pwa-studio-newsletter/raw/master/docs/preview2.png 'Preview Modal Component')

### Extension options

| props        | type  | default value |
| ------------ | :---: | ------------: |
| showOnFooter | bool  |          true |
| enableModal  | bool  |          true |

### Install

```
yarn add @wesleyalmd/pwa-studio-newsletter
```

Wrap module in your `local-intercept.js`:

```
const { Targetables } = require('@magento/pwa-buildpack');

module.exports = targets => {
  const targetables = Targetables.using(targets);

  /** Newsletter extension */
  const {
    wrapNewsletterModuleTargetable
  } = require('@wesleyalmd/pwa-studio-newsletter/targets');
  wrapNewsletterModuleTargetable(targetables, {
    showOnFooter: true,
    enableModal: true
  });
};

```
