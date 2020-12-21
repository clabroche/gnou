let BASE 
BASE = "gnou"

const stack = [
  {
    label: 'gnou-server',
    spawnCmd: 'npm',
    spawnArgs: ['run', 'server'],
    spawnOptions: {
      cwd:  __dirname,
      env: Object.assign({
        PORT: '5000',
      }, process.env)
    }
  },
  {
    label: 'gnou-front',
    spawnCmd: 'npm',
    spawnArgs: ['run', 'front'],
    spawnOptions: {
      cwd: __dirname,
      env: Object.assign({
        VUE_APP_SERVER_URL: 'http://localhost:5000',
      }, process.env)
    }
  },
]

module.exports = stack
