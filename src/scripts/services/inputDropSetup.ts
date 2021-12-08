// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').factory('inputDropSetup', ($rootScope: any, $document: any, $sce: any, $compile: any, $timeout: any) => {
  return (scope: any, input: any, template: any, onClosed: any) => {
    let dropInstance: any,
      accountSuggestClicked = false;

    let showDrop: any;

    const handleDocumentClick = () => {
      if (!accountSuggestClicked) {
        $document.off('mousedown', handleDocumentClick);
        dropInstance.close();
      }
      accountSuggestClicked = false;

    };


    // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
    const wrap = angular.element('<div></div>').append(template);
    const content = $compile(wrap)(scope);


    input.on('focus', () => {
      $rootScope.$broadcast('drop:close');

      showDrop();
    });

    showDrop = function () {
      accountSuggestClicked = false;

      if (!dropInstance) {
        dropInstance = new Drop({
          target: input[0],
          content: content[0],
          classes: 'drop-theme-arrows-bounce drop--wide',
          openOn: null,
          position: 'bottom center',
          constrainToWindow: true,
          constrainToScrollParent: false,
            tetherOptions: {
              constraints: [{
                to: 'scrollParent'
              }, {
                to: 'window',
                attachment: 'together',
                pin: true
              }]
            }
        });

        dropInstance.on('close', () => {
          // Wait for the animation to complete
          $timeout(() => {
            onClosed && onClosed();
          }, 250);
        });
      }

      input[0].select();

      // Remove previous event handler, if exists, to prevent binding multiple
      $document.off('mousedown', handleDocumentClick);
      $document.on('mousedown', handleDocumentClick);
      dropInstance.open();
    };

    // Close on window mousedown except when the popup is clicked
    content.on('mousedown', () => {
      accountSuggestClicked = true;
    });

    content.on('click', (e: any) => {
      e.stopPropagation();
    });

    input.on('mousedown', () => {
      accountSuggestClicked = true;
    });

    return {
      destroy() {
        $document.off('mousedown', handleDocumentClick);
        dropInstance && dropInstance.destroy();
      },
      focus() {
        input[0].focus();
        showDrop();
      },
      close() {
        $document.off('mousedown', handleDocumentClick);
        dropInstance.close();
      },
      position() {
        dropInstance && dropInstance.position();
      }
    };
    
  };
});
