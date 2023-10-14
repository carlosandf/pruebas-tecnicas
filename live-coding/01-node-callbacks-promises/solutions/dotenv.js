import fs, { readFileSync } from 'node:fs'

const parseEnv = (envContent = '') => {
  const lines = envContent.split('\n')
  lines.map(line => {
    // TODO
  })
}

const config = ({path = '.env'} = {}) => {
  let envContent;
  try {
    envContent = readFileSync(path, 'utf-8');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      envContent = fs.readFileSync('.env.local', 'utf-8')
    } else {
      console.error(error)
      return error
    }
  }
  parseEnv(envContent)
}
config()