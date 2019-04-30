# Welcome to myUIAutoProject
This is a sample UI automation project created using Protractor Cucumber framework for Web based applications

## Clone Project
git clone https://github.com/jyothichigullapally/myUIAutoProject.git

### Installations and Setup
```
npm install
```
```
node_modules/protractor/bin/webdriver-manager update
```

#### command to run the sample test using the protractor
```
node_modules/protractor/bin/protractor conf/baseConf.js
```

#### command run the sample test using the grunt
```
grunt test --conf=conf/baseconf.js --test-suite=testSuite
```