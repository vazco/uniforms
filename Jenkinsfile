node {
  stage('SCM') {
    git 'https://github.com/LeongXianJun/uniforms.git'
  }
  stage('Install') {
    bat "npm ci"
  }
  stage('Lint') {
    catchError {
      bat "npm run lint"
    }
    echo currentBuild.result
  }
  stage('Test') {
    bat "npm run coverage -- --no-cache --runInBand --watchAll=false --testResultsProcessor \"jest-sonar-reporter\""
  }
  stage('SonarQube analysis') {
    def scannerHome = tool 'SonarScanner 4.4';
    withSonarQubeEnv('SonarCloud') { // If you have configured more than one global server connection, you can specify its name
      bat "${scannerHome}/bin/sonar-scanner"
    }
  }
  stage('Build') {
    catchError {
      bat "npm --prefix website run build"
    }
    echo currentBuild.result
  }
  stage('Deploy') {
    bat "echo Deployed"
    currentBuild.result = 'SUCCESS'
  }
}
