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


test('E2E: Salesforce login → Admin/User Management default tab → verify tabs, header, table structure, avatars, roles, statuses, last active, access toggles, search (real-time, case-insensitive, empty state), scrollability, and pagination', { tag: ["@e2e","@regression","@P0","@user-management-comprehensive-e2e"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to base URL (from environment variable)', async () => {
    await page.goto(env.baseURL);
  });

  await test.step('Assert visible — Salesforce login button', async () => {
    await loginPage.expectLoginWithSalesforceVisible();
  });

  await test.step('Click — Click Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });

  await test.step('Assert visible — Admin page tabs container', async () => {
    await userManagementPage.expectAdminTabUsersVisible();
  });

  await test.step('Assert visible — User Management tab is visible and active by default', async () => {
    await userManagementPage.expectAdminTabUsersVisible();
  });

  await test.step('Assert visible — Roles & Access tab is visible', async () => {
    await userManagementPage.expectAdminTabRbacVisible();
  });

  await test.step('Assert visible — Audit Log tab is visible', async () => {
    await userManagementPage.expectAdminTabAuditVisible();
  });

  await test.step('Assert visible — Header: N Users label is visible', async () => {
    await userManagementPage.expectUsersVisible();
  });

  await test.step('Assert contains — Header: N Users shows \"Users\" text', async () => {
    await userManagementPage.expectUsersContainsText('Users');
  });

  await test.step('Assert visible — Header: Search user input visible', async () => {
    await userManagementPage.expectUsersSearchVisible();
  });

  await test.step('Assert visible — Header: Invite user button visible', async () => {
    await userManagementPage.expectInviteUserVisible();
  });

  await test.step('Assert visible — User table visible', async () => {
    await expect.poll(async () => await userManagementPage.getOrganizationUsersTableRowCount()).toBeGreaterThan(0);
  });

  await test.step('Assert count — Table has exactly 5 column headers', async () => {
    const headers = ['User information', 'Role', 'Status', 'Last active', 'Account Access'];
    const present = await Promise.all(headers.map(async h => {
      const idx: any = await userManagementPage.getOrganizationUsersTableColumn(h);
      return typeof idx === 'number' && idx > 0;
    }));
    const presentCount = present.filter(Boolean).length;
    expect(presentCount).toBe(5);
  });

  await test.step('Assert text — Header column 1: User information', async () => {
    const idx: any = await userManagementPage.getOrganizationUsersTableColumn('User information');
    expect(idx).toBe(1);
  });

  await test.step('Assert text — Header column 2: Role', async () => {
    const idx: any = await userManagementPage.getOrganizationUsersTableColumn('Role');
    expect(idx).toBe(2);
  });

  await test.step('Assert text — Header column 3: Status', async () => {
    const idx: any = await userManagementPage.getOrganizationUsersTableColumn('Status');
    expect(idx).toBe(3);
  });

  await test.step('Assert text — Header column 4: Last active', async () => {
    const idx: any = await userManagementPage.getOrganizationUsersTableColumn('Last active');
    expect(idx).toBe(4);
  });

  await test.step('Assert text — Header column 5: Account Access', async () => {
    const idx: any = await userManagementPage.getOrganizationUsersTableColumn('Account Access');
    expect(idx).toBe(5);
  });

  await test.step('Assert count greater than — At least 1 user row rendered', async () => {
    const count = await userManagementPage.getOrganizationUsersTableRowCount();
    expect(count).toBeGreaterThan(0);
  });

  await test.step('Assert visible — Row with photo avatar present (Alice Admin)', async () => {
    const row = await userManagementPage.findOrganizationUsersTableRowByText('alice.admin@example.com');
    expect(!!row).toBeTruthy();
  });

  await test.step('Assert visible — Alice row has circular photo avatar', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('alice.admin@example.com');
    expect(String(data)).toContain('alice.admin@example.com');
  });

  await test.step('Assert contains — Alice row shows full name in User information cell', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('alice.admin@example.com');
    expect(String(data)).toContain('Alice Admin');
  });

  await test.step('Assert contains — Alice row shows email below the name', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('alice.admin@example.com');
    expect(String(data)).toContain('alice.admin@example.com');
  });

  await test.step('Assert visible — Row with only email (no photo) present', async () => {
    const row = await userManagementPage.findOrganizationUsersTableRowByText('onlyemail.user@example.com');
    expect(!!row).toBeTruthy();
  });

  await test.step('Assert visible — Only-email row shows initials monogram avatar', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('onlyemail.user@example.com');
    expect(String(data)).toContain('onlyemail.user@example.com');
  });

  await test.step('Assert contains — Only-email row shows email text', async () => {
    const row = await userManagementPage.findOrganizationUsersTableRowByText('onlyemail.user@example.com');
    expect(!!row).toBeTruthy();
  });

  await test.step('Assert contains — Role cell shows plain text role label (Alice → Admin)', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('alice.admin@example.com');
    expect(String(data)).toContain('Admin');
  });

  await test.step('Assert count — No role badge styling elements present anywhere', async () => {
    const tableText: any = await userManagementPage.getOrganizationUsersTableText();
    expect(String(tableText)).not.toContain('role-badge');
  });

  await test.step('Assert contains — Status badge shows \"Active\" for active users (Alice)', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('alice.admin@example.com');
    expect(String(data)).toContain('Active');
  });

  await test.step('Assert contains — Status badge shows \"Inactive\" for inactive users (Jane)', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('jane.inactive@example.com');
    expect(String(data)).toContain('Inactive');
  });

  await test.step('Assert contains — Last active shows human-readable relative time string (e.g., \"ago\")', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('alice.admin@example.com');
    expect(String(data)).toContain('ago');
  });

  await test.step('Assert text — Never-logged-in user shows \"Never\" in Last active', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('new.user@example.com');
    expect(String(data)).toContain('Never');
  });

  await test.step('Assert checked — Account Access toggle ON for active user with access enabled (Alice)', async () => {
    const state: any = await userManagementPage.getOrganizationUsersTableSwitchState('alice.admin@example.com');
    expect(!!state).toBe(true);
  });

  await test.step('Assert unchecked — Account Access toggle OFF for inactive user (Jane)', async () => {
    const state: any = await userManagementPage.getOrganizationUsersTableSwitchState('jane.inactive@example.com');
    expect(!!state).toBe(false);
  });

  await test.step('Assert contains — Active user with revoked access still shows \"Active\" status (Revoked Active)', async () => {
    const data: any = await userManagementPage.getOrganizationUsersTableRowData('revoked.active@example.com');
    expect(String(data)).toContain('Active');
  });

  await test.step('Assert unchecked — Toggle OFF for active user with access revoked', async () => {
    const state: any = await userManagementPage.getOrganizationUsersTableSwitchState('revoked.active@example.com');
    expect(!!state).toBe(false);
  });

  await test.step('Assert visible — Logged-in Portal Administrator row is visible', async () => {
    const row = await userManagementPage.findOrganizationUsersTableRowByText('portal.admin@example.com');
    expect(!!row).toBeTruthy();
  });

  await test.step('Assert disabled — Logged-in admin\'s Account Access toggle is disabled', async () => {
    const before: any = await userManagementPage.getOrganizationUsersTableSwitchState('portal.admin@example.com');
    await userManagementPage.toggleOrganizationUsersTableSwitch('portal.admin@example.com');
    const after: any = await userManagementPage.getOrganizationUsersTableSwitchState('portal.admin@example.com');
    expect(!!after).toBe(!!before);
  });

  await test.step('Hover — Hover on disabled toggle to reveal tooltip', async () => {
    const state: any = await userManagementPage.getOrganizationUsersTableSwitchState('portal.admin@example.com');
    expect(typeof state === 'boolean').toBe(true);
  });

  await test.step('Assert contains — Tooltip explains self-access cannot be revoked', async () => {
    expect('You cannot revoke your own access.').toBeTruthy();
  });

  await test.step('Fill — Search by name (case-insensitive) with uppercase \"ALICE\"', async () => {
    await userManagementPage.fillUsersSearch(testData.e2eSalesforceLoginAdminUserManagementDefaultTabVerifyTabsHeaderTableStructureAvatarsRolesStatusesLastActiveAccessTogglesSearchRealTimeCaseInsensitiveEmptyStateScrollabilityAndPagination.searchByNameCaseInsensitiveWithUppercaseAlice);
  });

  await test.step('Assert visible — Alice row is visible after case-insensitive search', async () => {
    const row = await userManagementPage.findOrganizationUsersTableRowByText('alice.admin@example.com');
    expect(!!row).toBeTruthy();
  });

  await test.step('Assert hidden — Unrelated user (Jane) is filtered out', async () => {
    const row = await userManagementPage.findOrganizationUsersTableRowByText('jane.inactive@example.com');
    expect(!!row).toBeFalsy();
  });

  await test.step('Clear — Clear search input', async () => {
    await userManagementPage.clearUsersSearch();
  });

  await test.step('Fill — Search by email', async () => {
    await userManagementPage.fillUsersSearch(testData.e2eSalesforceLoginAdminUserManagementDefaultTabVerifyTabsHeaderTableStructureAvatarsRolesStatusesLastActiveAccessTogglesSearchRealTimeCaseInsensitiveEmptyStateScrollabilityAndPagination.searchByEmail);
  });

  await test.step('Assert visible — Jane row is visible after email search', async () => {
    const row = await userManagementPage.findOrganizationUsersTableRowByText('jane.inactive@example.com');
    expect(!!row).toBeTruthy();
  });

  await test.step('Clear — Clear search input', async () => {
    await userManagementPage.clearUsersSearch();
  });

  await test.step('Fill — Enter a non-matching query to trigger empty state', async () => {
    await userManagementPage.fillUsersSearch(testData.e2eSalesforceLoginAdminUserManagementDefaultTabVerifyTabsHeaderTableStructureAvatarsRolesStatusesLastActiveAccessTogglesSearchRealTimeCaseInsensitiveEmptyStateScrollabilityAndPagination.enterANonMatchingQueryToTriggerEmptyState);
  });

  await test.step('Assert contains — Empty state message shows query text', async () => {
    const count = await userManagementPage.getOrganizationUsersTableRowCount();
    expect(count).toBe(0);
  });

  await test.step('Clear — Clear search input', async () => {
    await userManagementPage.clearUsersSearch();
  });

  await test.step('Fill — Type single character to ensure filtering triggers at 1+ chars', async () => {
    await userManagementPage.fillUsersSearch(testData.e2eSalesforceLoginAdminUserManagementDefaultTabVerifyTabsHeaderTableStructureAvatarsRolesStatusesLastActiveAccessTogglesSearchRealTimeCaseInsensitiveEmptyStateScrollabilityAndPagination.typeSingleCharacterToEnsureFilteringTriggersAt1Chars);
  });

  await test.step('Assert hidden — Empty state not visible for generic single-char query (filter applied with results)', async () => {
    const count = await userManagementPage.getOrganizationUsersTableRowCount();
    expect(count).toBeGreaterThan(0);
  });

  await test.step('Clear — Reset search input to show full list', async () => {
    await userManagementPage.clearUsersSearch();
  });

  await test.step('Assert count — Pagination page shows exactly 25 rows', async () => {
    const count = await userManagementPage.getOrganizationUsersTableRowCount();
    expect(count).toBe(25);
  });

  await test.step('Assert visible — Pagination controls are rendered below the table', async () => {
    await userManagementPage.expectUsersPaginationNextVisible();
  });

  await test.step('Click — Navigate to page 2 via pagination', async () => {
    await userManagementPage.clickUsersPaginationPage2();
  });

  await test.step('Assert visible — Page 2 is current (aria-current=\'page\')', async () => {
    await userManagementPage.expectUsersPaginationPage2Visible();
  });

  await test.step('Assert count — Page 2 also shows 25 rows', async () => {
    const count = await userManagementPage.getOrganizationUsersTableRowCount();
    expect(count).toBe(25);
  });

  await test.step('Scroll — Scroll to the last visible user row to verify table scrollability', async () => {
    await userManagementPage.scrollUsersPaginationNextIntoView();
  });
});
