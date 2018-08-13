module.exports = {
  apps: [{
    name: 'lunar-rover.co',
    script: './bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-175-62-178.compute-1.amazonaws.com',
      key: '~/.ssh/lunar-rover-co.pem',
      ref: 'origin/master',
      repo: 'git@github.com:johnwong668/lunar-rover.co.git',
      path: '/home/ubuntu/lunar-rover.co',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
