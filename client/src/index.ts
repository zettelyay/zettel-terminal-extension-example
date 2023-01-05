import {
  ExtensionScope,
  WindowWithExtensionFunction,
} from "@zettelproject/terminal-extension-api";

void ((window as WindowWithExtensionFunction).extensionFunction = function (
  api
) {
  this.while("activated", function ({ activatedApi }) {
    this.while("pagePanelRendered", function ({ pagePanelRenderedApi }) {
      if (!this.scopes.includes(ExtensionScope.Page)) return;

      this.register(
        pagePanelRenderedApi.registry.quickAction({
          title: api.extensionHeader.name,
          description: api.extensionHeader.description,
          avatarUrl: api.getFileUrl(api.extensionHeader.avatar.file!),
          onClick() {
            activatedApi.access.showMessage(
              "Hello World!",
              "A simple message from our example extension!",
              { variant: "success" }
            );
          },
        })
      );
    });
  });
});
