module.exports = {
  apps: [{
    name: 'lunar-rover.co',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-222-133-16.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/website.pem',
      ref: 'origin/master',
      repo: 'git@github.com:johnwong668/lunar-rover.co.git',
      path: '/home/ubuntu/lunar-rover.co',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
