// Register custom Block Styles
const { __ } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

registerBlockStyle('core/gallery', {
  name: 'default',
  label: __('Default'),
  isDefault: true,
});

registerBlockStyle('core/gallery', {
  name: 'three',
  label: __('Three with caption'),
  isDefault: false,
});
