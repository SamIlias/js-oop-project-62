install:
	npm ci

lint:
	npx eslint ./src

lint-fix:
	npx eslint ./src --fix

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

mytest:
	npm test -s