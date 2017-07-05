import { BootstrapStudyPage } from './app.po';

describe('bootstrap-study App', () => {
  let page: BootstrapStudyPage;

  beforeEach(() => {
    page = new BootstrapStudyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
