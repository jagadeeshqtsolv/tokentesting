import { test, expect } from '@support/fixtures';
import env from '@support/env';
import testData from '@testdata/test-data.json';

test('Admin /admin loads with User Management as default, tabs in order, header and columns render', { tag: ["@smoke","@regression","@P0","@admin-default-user-management-ui"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL + '/admin');
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — Tablist visible', async () => {
    await userManagementPage.expectTablistVisible();
  });
  await test.step('Assert text — Tab 1 label', async () => {
    await userManagementPage.expectTabLabelText(1, 'User Management');
  });
  await test.step('Assert text — Tab 2 label', async () => {
    await userManagementPage.expectTabLabelText(2, 'Roles & Access');
  });
  await test.step('Assert text — Tab 3 label', async () => {
    await userManagementPage.expectTabLabelText(3, 'Audit Log');
  });
  await test.step('Assert selected — User Management tab is active', async () => {
    await userManagementPage.expectTabSelectedByLabel('User Management');
  });
  await test.step('Assert visible — User count label', async () => {
    await userManagementPage.expectUserCountLabelVisible();
  });
  await test.step('Assert contains — "N Users" label contains \'Users\'', async () => {
    await userManagementPage.expectUserCountLabelContainsText('Users');
  });
  await test.step('Assert visible — Search input with placeholder', async () => {
    await userManagementPage.expectSearchInputVisible();
  });
  await test.step('Assert visible — Invite user button', async () => {
    await userManagementPage.expectInviteUserButtonVisible();
  });
  await test.step('Assert contains — Invite user button text', async () => {
    await userManagementPage.expectInviteUserButtonContainsText('Invite user');
  });
  await test.step('Assert text — Column 1 header', async () => {
    await userManagementPage.expectColumnHeaderText(1, 'User information');
  });
  await test.step('Assert text — Column 2 header', async () => {
    await userManagementPage.expectColumnHeaderText(2, 'Role');
  });
  await test.step('Assert text — Column 3 header', async () => {
    await userManagementPage.expectColumnHeaderText(3, 'Status');
  });
  await test.step('Assert text — Column 4 header', async () => {
    await userManagementPage.expectColumnHeaderText(4, 'Last active');
  });
  await test.step('Assert text — Column 5 header', async () => {
    await userManagementPage.expectColumnHeaderText(5, 'Account Access');
  });
});
