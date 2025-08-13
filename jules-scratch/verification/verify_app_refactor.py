from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://127.0.0.1:8083/")

    # Give the app time to boot
    page.wait_for_timeout(10000)

    # Unlock the screen
    try:
        page.click('button:has-text("Unlock Screen")')
        page.wait_for_timeout(1000)
    except Exception as e:
        print("Could not find unlock screen button. Assuming screen is already unlocked.")
        page.screenshot(path="jules-scratch/verification/00_error.png")


    page.screenshot(path="jules-scratch/verification/01_home_screen.png")

    # Open the app drawer
    page.click('button:has-text("Apps")')
    page.wait_for_timeout(1000)
    page.screenshot(path="jules-scratch/verification/02_app_drawer.png")

    # Open the calculator app
    page.click('div.grid >> text=Calculator')
    page.wait_for_timeout(1000)
    page.screenshot(path="jules-scratch/verification/03_calculator_app.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
