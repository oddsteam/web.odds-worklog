.PHONY: test run

run:
	npm run ng serve -- --configuration local

test:
	CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm t -- --watch=false
