module.exports = {
  apps: [{
    name: 'lunar-rover.co',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-159-190-1.compute-1.amazonaws.com',
      key: '~/.ssh/lunar-rover-co.pem',
      ref: 'origin/master',
      repo: 'git@lunar-rover.co.github.com:lunar-rover/lunar-rover.co.git',
      path: '/home/ubuntu/lunar-rover.co',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
