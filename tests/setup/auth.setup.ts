import { test as setup } from '@fixtures/index';
import { LoginPage } from '@pages/LoginPage';

setup('authenticate' , async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await page.waitForURL('/');
    await page.context().storageState({ path: 'tests/setup/auth.json' });

});