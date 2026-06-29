import { test, expect } from '@support/fixtures';
import env from '@support/env';
import testData from '@testdata/test-data.json';


test('Admin /admin loads with User Management as default, tabs in order, header and columns render', { tag: ["@smoke","@regression","@P0","@admin-default-user-management-ui"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
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
    await userManagementPage.expectTabSelected('User Management');
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


test('Switch to Roles & Access and back to User Management', { tag: ["@smoke","@regression","@P0","@switch-tabs-roles-and-back"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — User Management tab visible', async () => {
    await userManagementPage.expectTabVisible('User Management');
  });
  await test.step('Click — Click Roles & Access tab', async () => {
    await userManagementPage.clickTab('Roles & Access');
  });
  await test.step('Assert selected — Roles & Access tab is active', async () => {
    await userManagementPage.expectTabSelected('Roles & Access');
  });
  await test.step('Click — Click User Management tab', async () => {
    await userManagementPage.clickTab('User Management');
  });
  await test.step('Assert selected — User Management tab is active again', async () => {
    await userManagementPage.expectTabSelected('User Management');
  });
  await test.step('Assert visible — User table visible', async () => {
    await userManagementPage.expectUserTableVisible();
  });
});


test('Search filters users case-insensitively after 1+ character without changing N Users label', { tag: ["@smoke","@regression","@P0","@search-filters-case-insensitive"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — Search input', async () => {
    await userManagementPage.expectSearchInputVisible();
  });
  await test.step('Fill — Type uppercase to test case-insensitive match', async () => {
    await userManagementPage.fillSearchInput(testData.searchFiltersUsersCaseInsensitivelyAfter1CharacterWithoutChangingNUsersLabel.typeUppercaseToTestCaseInsensitiveMatch);
  });
  await test.step('Assert visible — Table body updates', async () => {
    await userManagementPage.expectTableBodyVisible();
  });
  await test.step('Assert count greater than — At least one matching row is shown', async () => {
    await userManagementPage.expectTableBodyRowCountGreaterThan(0);
  });
  await test.step('Assert contains — N Users label remains present (unchanged total indicator)', async () => {
    await userManagementPage.expectUserCountLabelContainsText('Users');
  });
});


test('Search with no results shows empty-state message and keeps header visible', { tag: ["@smoke","@regression","@P0","@search-no-results-message"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — Search input', async () => {
    await userManagementPage.expectSearchInputVisible();
  });
  await test.step('Fill — Type a non-matching query', async () => {
    await userManagementPage.fillSearchInput(testData.searchWithNoResultsShowsEmptyStateMessageAndKeepsHeaderVisible.typeANonMatchingQuery);
  });
  await test.step('Assert visible — Table header row remains visible', async () => {
    await userManagementPage.expectTableHeaderVisible();
  });
  await test.step('Assert contains — No results message visible with query text', async () => {
    await userManagementPage.expectTableBodyOrCellContainsText("No users found for 'zzznomatch'.");
  });
});


test('Account Access toggle: confirm revoke -> OFF, re-enable -> ON, cancel revoke -> stays ON', { tag: ["@smoke","@regression","@P0","@toggle-access-revoke-reenable-cancel"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Fill — Search for a known active user', async () => {
    await userManagementPage.fillSearchInput(testData.accountAccessToggleConfirmRevokeOffReEnableOnCancelRevokeStaysOn.searchForAKnownActiveUser);
  });
  await test.step('Assert visible — Row for testuserinvite1 appears', async () => {
    await userManagementPage.waitForRowVisibleByText('testuserinvite1');
  });
  await test.step('Assert checked — Access toggle is ON for the user', async () => {
    await userManagementPage.expectAccessToggleCheckedByRowText('testuserinvite1');
  });
  await test.step('Click — Click ON toggle to revoke', async () => {
    await userManagementPage.clickAccessToggleByRowText('testuserinvite1');
  });
  await test.step('Assert text — Confirmation dialog title', async () => {
    await userManagementPage.expectDialogText('Revoke access?');
  });
  await test.step('Assert contains — Confirmation message body', async () => {
    await userManagementPage.expectDialogContainsText('This will prevent');
  });
  await test.step('Click — Confirm Revoke', async () => {
    await userManagementPage.clickDialogButton('Revoke');
  });
  await test.step('Assert hidden — Dialog closed', async () => {
    await userManagementPage.waitForDialogHidden();
  });
  await test.step('Assert unchecked — Toggle is now OFF', async () => {
    await userManagementPage.expectAccessToggleUncheckedByRowText('testuserinvite1');
  });
  await test.step('Click — Click OFF toggle to re-enable (no dialog)', async () => {
    await userManagementPage.clickAccessToggleByRowText('testuserinvite1');
  });
  await test.step('Assert checked — Toggle is ON again', async () => {
    await userManagementPage.expectAccessToggleCheckedByRowText('testuserinvite1');
  });
  await test.step('Click — Attempt revoke again to test Cancel', async () => {
    await userManagementPage.clickAccessToggleByRowText('testuserinvite1');
  });
  await test.step('Assert visible — Confirmation dialog appears', async () => {
    await userManagementPage.waitForDialogVisible();
  });
  await test.step('Click — Cancel revocation', async () => {
    await userManagementPage.clickDialogButton('Cancel');
  });
  await test.step('Assert hidden — Dialog closed', async () => {
    await userManagementPage.waitForDialogHidden();
  });
  await test.step('Assert checked — Toggle remains ON after Cancel', async () => {
    await userManagementPage.expectAccessToggleCheckedByRowText('testuserinvite1');
  });
});


test("Admin's own row has disabled toggle and tooltip on hover", { tag: ["@smoke","@regression","@P0","@own-row-toggle-disabled-tooltip"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — User table visible', async () => {
    await userManagementPage.expectUserTableVisible();
  });
  await test.step('Hover — Hover disabled Account Access toggle in admin\'s own row', async () => {
    await userManagementPage.hoverAccessToggleByRowTextOrSelf();
  });
  await test.step('Assert disabled — Own toggle is non-interactive', async () => {
    await userManagementPage.expectAccessToggleDisabledByRowTextOrSelf();
  });
  await test.step('Assert visible — Tooltip text shown on hover', async () => {
    await userManagementPage.expectTooltipVisibleWithText('You cannot revoke your own access.');
  });
});


test('Pagination shows 20 rows per page and Next/Previous work when >20 users', { tag: ["@smoke","@regression","@P0","@pagination-next-prev-20-per-page"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — User table visible', async () => {
    await userManagementPage.expectUserTableVisible();
  });
  await test.step('Assert count — Page 1 shows 20 rows', async () => {
    await userManagementPage.expectTableBodyRowCount(20);
  });
  await test.step('Assert visible — Pagination controls visible', async () => {
    await userManagementPage.expectPaginationControlsVisible();
  });
  await test.step('Assert disabled — Previous is disabled on first page', async () => {
    await userManagementPage.expectPaginationPreviousDisabled();
  });
  await test.step('Click — Click Next', async () => {
    await userManagementPage.clickPaginationNext();
  });
  await test.step('Assert enabled — Previous is enabled on subsequent page', async () => {
    await userManagementPage.expectPaginationPreviousEnabled();
  });
  await test.step('Assert text — Active page indicator shows 2', async () => {
    await userManagementPage.expectPaginationActivePageText('2');
  });
});


test('Changing search query resets pagination to page 1', { tag: ["@smoke","@regression","@P0","@search-resets-to-page-1"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — Pagination controls visible (assumes >20 users)', async () => {
    await userManagementPage.expectPaginationControlsVisible();
  });
  await test.step('Click — Go to page 2 via Next', async () => {
    await userManagementPage.clickPaginationNext();
  });
  await test.step('Assert text — Active page is 2', async () => {
    await userManagementPage.expectPaginationActivePageText('2');
  });
  await test.step('Fill — Type 1-character query to change search', async () => {
    await userManagementPage.fillSearchInput(testData.changingSearchQueryResetsPaginationToPage1.type1CharacterQueryToChangeSearch);
  });
  await test.step('Assert text — Active page returns to 1', async () => {
    await userManagementPage.expectPaginationActivePageText('1');
  });
});
