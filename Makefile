install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

mytest:
	npm test -s