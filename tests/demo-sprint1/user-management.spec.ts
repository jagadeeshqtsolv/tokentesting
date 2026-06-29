import { test, expect } from '@support/fixtures';
import env from '@support/env';
import testData from '@testdata/test-data.json';


test('Login and verify default User Management view with tabs, header, and table columns', { tag: ["@smoke","@regression","@P0","@um-001-login-and-default-view"] }, async ({ page, loginPage, aduitLogPage }) => {
  await test.step('Open — Navigate to Admin URL', async () => {
    await page.goto(env.baseURL + '/admin');
  });

  await test.step('Click — Salesforce login', async () => {
    await loginPage.clickLoginWithSalesforce();
  });

  await test.step('Assert visible — User Management tab', async () => {
    await aduitLogPage.expectUserManagementTabVisible();
  });

  await test.step('Assert checked — User Management tab is active', async () => {
    await aduitLogPage.expectUserManagementTabChecked();
  });

  await test.step('Assert text — Tab 1 text', async () => {
    await aduitLogPage.expectUserManagementTabText('User Management');
  });

  await test.step('Assert text — Tab 2 text', async () => {
    await aduitLogPage.expectRolesAndAccessTabText('Roles & Access');
  });

  await test.step('Assert text — Tab 3 text', async () => {
    await aduitLogPage.expectAuditLogTabText('Audit Log');
  });

  await test.step('Assert visible — Search user input', async () => {
    await aduitLogPage.expectSearchUserInputVisible();
  });

  await test.step('Assert visible — Invite user button', async () => {
    await aduitLogPage.expectInviteUserButtonVisible();
  });

  await test.step('Assert contains — N Users count label', async () => {
    await aduitLogPage.expectUsersCountLabelContainsText('Users');
  });

  await test.step('Assert text — Column 1 header', async () => {
    await aduitLogPage.expectUserTableHeaderCol1Text('User information');
  });

  await test.step('Assert text — Column 2 header', async () => {
    await aduitLogPage.expectUserTableHeaderCol2Text('Role');
  });

  await test.step('Assert text — Column 3 header', async () => {
    await aduitLogPage.expectUserTableHeaderCol3Text('Status');
  });

  await test.step('Assert text — Column 4 header', async () => {
    await aduitLogPage.expectUserTableHeaderCol4Text('Last active');
  });

  await test.step('Assert text — Column 5 header', async () => {
    await aduitLogPage.expectUserTableHeaderCol5Text('Account Access');
  });

  await test.step('Assert count greater than — At least one user row visible', async () => {
    await aduitLogPage.expectUserTableRowsCountGreaterThan(0);
  });
});
