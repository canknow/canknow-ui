pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        sh 'ci-init'
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [
            [url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]
          ]
        ])
      }
    }
    stage('install') {
      steps {
        sh 'node -v'
        sh 'npm config set registry https://registry.npm.taobao.org'
        sh 'npm install'
      }
    }
    stage('lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('build:example') {
      steps {
        echo 'building...'
        sh 'npm run build:example'
        echo 'build complete.'
      }
    }
    stage('build') {
      steps {
        echo 'building...'
        sh 'npm run build'
        echo 'build complete.'
      }
    }
    stage('deploy') {
      steps {
        echo 'deploying...'
        sh 'git config --global user.email "3230525823@qq.com" && git config --global user.name "Canknow"'
        sh 'cd examples/dist && git init && git add -A && git commit -m "deploy" && git remote add origin https://15927051130:Lianhubo131314%40@e.coding.net/canknow/canknow-ui-dev/canknow-ui-dev.git && git push -u origin master -f'
        echo 'deployed'
      }
    }
  }
}
