import { Selector as selector } from 'testcafe';

export default class Page {
  constructor() {
    this.pathName = '/dashboard';
    this.firstMeeting = selector('.meeting').nth(0);
    this.meetingFormHeader = selector('#editor-header');
    this.deleteButton = selector('button[name="delete"]');
    this.deleteConfirmationButton = selector('button[name="confirm-delete"]');
    this.deleteAbortButton = selector('button[name="abort-delete"]');
    this.confirmationMessage = selector('.confirmation-message');
    this.editor = selector('.editor');
  }

  static meeting(id) {
    return selector(`#${id}`);
  }
}
