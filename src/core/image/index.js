// Register custom Block Styles
const { __ } = wp.i18n;
const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;

registerBlockStyle('core/image', {
  name: 'default',
  label: __('Default'),
  isDefault: true,
});

registerBlockStyle('core/image', {
  name: 'cover-screen',
  label: __('Cover Screen'),
  isDefault: false,
});

// Unregister core block style
wp.domReady(() => {
  unregisterBlockStyle('core/image', 'rounded');
});
