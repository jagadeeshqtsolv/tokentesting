import { test, expect } from '@support/fixtures';
import env from '@support/env';
import testData from '@testdata/test-data.json';

test('Admin /admin loads with User Management as default, tabs in order, header and columns render', { tag: ["@smoke","@regression","@P0","@admin-default-user-management-ui"] }, async ({ page, commonPage, userManagementPage }) => {
  await test.step('Navigate to URL — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button — (text=Salesforce login)', async () => {
    await commonPage.clickSalesforceLoginButton();
  });
  await test.step('Assert text (exact) — Tab 1 label — ([role=tablist] [role=tab]:nth-child(1))', async () => {
    await userManagementPage.expectUsersPaginationPage1Text('User Management');
  });
  await test.step('Assert text (exact) — Tab 2 label — ([role=tablist] [role=tab]:nth-child(2))', async () => {
    await userManagementPage.expectUsersPaginationPage2Text('Roles & Access');
  });
  await test.step('Assert text (exact) — Tab 3 label — ([role=tablist] [role=tab]:nth-child(3))', async () => {
    await userManagementPage.expectRoleText('Audit Log');
  });
  await test.step('Assert selected — User Management tab is active — ([role=tab][aria-selected=true]:has-text("User Management"))', async () => {
    await userManagementPage.selectAdminTabUsers();
  });
  await test.step('Assert visible — User count label — ([data-testid=user-count])', async () => {
    await commonPage.expectUserCountLabelVisible();
  });
  await test.step('Assert contains text — "N Users" label contains \'Users\' — ([data-testid=user-count])', async () => {
    await commonPage.expectUserCountLabelContainsText('Users');
  });
  await test.step('Assert visible — Invite user button — ([data-testid=invite-user-btn])', async () => {
    await userManagementPage.expectInviteUserVisible();
  });
  await test.step('Assert contains text — Invite user button text — ([data-testid=invite-user-btn])', async () => {
    await userManagementPage.expectInviteUserContainsText('Invite user');
  });
  await test.step('Assert text (exact) — Column 1 header — (thead th:nth-child(1))', async () => {
    await userManagementPage.expectUsersPaginationPage1Text('User information');
  });
  await test.step('Assert text (exact) — Column 2 header — (thead th:nth-child(2))', async () => {
    await userManagementPage.expectUsersPaginationPage2Text('Role');
  });
  await test.step('Assert text (exact) — Column 3 header — (thead th:nth-child(3))', async () => {
    await commonPage.expectColumn3HeaderText('Status');
  });
  await test.step('Assert text (exact) — Column 4 header — (thead th:nth-child(4))', async () => {
    await commonPage.expectColumn4HeaderText('Last active');
  });
  await test.step('Assert text (exact) — Column 5 header — (thead th:nth-child(5))', async () => {
    await commonPage.expectColumn5HeaderText('Account Access');
  });
});
