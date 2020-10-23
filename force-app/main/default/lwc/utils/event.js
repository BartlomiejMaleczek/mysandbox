import { ShowToastEvent } from "lightning/platformShowToastEvent";

function showToast(cmp, title, message, variant) {
  if (message) {
    cmp.dispatchEvent(
      new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
      })
    );
  }
}

function fireCustomEvent(cmp, name, propagation, detail) {
  const customEvent = new CustomEvent(name, propagation, detail);

  cmp.dispatchEvent(customEvent);
}

const _event = {
  showToast: showToast,
  fireCustomEvent: fireCustomEvent
};

export { _event };
