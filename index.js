const puppeteer = require('puppeteer-extra')
require('dotenv').config();

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')

puppeteer.use(StealthPlugin())
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: process.env.TOKEN_2CAPTCHA 
    },
    visualFeedback: true
  })
)

puppeteer.launch({ headless: false }).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.google.com/recaptcha/api2/demo')

  await page.solveRecaptchas()

  await Promise.all([
    page.waitForNavigation(),
    page.click(`#recaptcha-demo-submit`)
  ])
  await page.screenshot({ path: 'response.png', fullPage: true })
  await browser.close()
})