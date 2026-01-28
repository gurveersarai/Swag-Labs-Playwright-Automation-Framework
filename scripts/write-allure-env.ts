import fs from "fs"
import path from "path"

const resultsDir = path.join(__dirname, '..', 'allure-results')

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, {recursive:true})
}
const content = `
Browser=${process.env.BROWSER || 'chromium'}
Environment=${process.env.TEST_ENV || 'qa'}
Build=${process.env.GITHUB_RUN_NUMBER || 'local'}
Commit=${process.env.GITHIB_SHA || 'local'}

`;

fs.writeFileSync('allure-results/environment.properties', content.trim());

console.log("Allure Environment Properties Created")