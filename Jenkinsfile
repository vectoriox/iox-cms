pipeline{
    
    agent any
    
    environment{
        REPO_NAME= 'iox-cms'
        dockerHubCred = 'dockerhub-id'
        GITHUB_CRED = credentials('github-id')
        BUILDVERSION = sh(script: "echo `date +%s`", returnStdout: true).trim()
        gitUrl = env.GIT_URL.replaceFirst("^(http[s]?://www\\.|http[s]?://|www\\.)","")
        jenkinsBuildVersion = "${env.GIT_BRANCH}.${env.BUILDVERSION}.${env.BUILD_ID}"
        dockerImageTag = "ioxweb/${REPO_NAME}:${env.jenkinsBuildVersion}"

    }
    stages{
      stage('checkout'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: env.GIT_BRANCH]], 
                doGenerateSubmoduleConfigurations: false, extensions: [],
                submoduleCfg: [],
                userRemoteConfigs: [[credentialsId: 'github-id', url: env.GIT_URL]]])
            }
      }
      stage('Docker Build'){
            steps{
              script{
                 dockerImage =  docker.build "${dockerImageTag}"
              }
            }
      }
      stage('Dockerhub Push Image'){
        steps{
          script{
            docker.withRegistry('', 'dockerhub-id'){
              dockerImage.push()
            }            
          }
        }
      }
    }
}