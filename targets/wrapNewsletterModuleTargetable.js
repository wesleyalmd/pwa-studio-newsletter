module.exports = (targetables, options = {}) => {
  const moduleOptions = {
    showOnFooter: true,
    enableModal: true,
    ...options
  };
  const { showOnFooter, enableModal } = moduleOptions;

  /**
   * Main
   */
  const MainComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/Main/main.js'
  );

  /* Import Newsletter on Footer */
  if (showOnFooter) {
    MainComponent.addImport(
      "import { NewsletterFooter } from '@wesleyalmd/pwa-studio-newsletter'"
    );
    MainComponent.insertBeforeSource('<Footer', '<NewsletterFooter />\n');
  }

  // Import Modal
  if (enableModal) {
    MainComponent.addImport(
      "import { NewsletterModal } from '@wesleyalmd/pwa-studio-newsletter'"
    );
    MainComponent.insertBeforeSource('<Footer', '<NewsletterModal />\n');
  }
};
