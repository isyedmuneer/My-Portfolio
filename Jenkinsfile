pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Jenkins automatic GitHub se code pull karega
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker Images...'
                // Frontend aur Backend dynamic containers build ho rahe hain
                sh 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying Multi-Container Stack...'
                // Purane containers ko stop karke naye start karega detached mode me
                sh 'docker compose down'
                sh 'docker compose up -d'
                echo 'Application deployed successfully!'
            }
        }
    }
}