import { APNPage } from './app.po';

describe('apn App', function() {
  let page: APNPage;

  beforeEach(() => {
    page = new APNPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
