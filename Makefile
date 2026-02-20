.PHONY: test run e2e

run:
	npm run ng serve -- --configuration local

test:
	CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm t -- --watch=false

e2e:
	cd e2e/cucumber && npx cucumber-js $(ARGS)
