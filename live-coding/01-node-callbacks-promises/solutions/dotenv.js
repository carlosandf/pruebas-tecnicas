import fs from 'node:fs';

const hasQuotes = (string = '') => {
  const hasSingleQuotes = string.startsWith("'") && string.endsWith("'");
  const hasDoubleQuotes = string.startsWith('"') && string.endsWith('"');
  if (hasSingleQuotes || hasDoubleQuotes) {
    return true;
  }
  return false;
}

const parseEnv = (envContent = '') => {
  const lines = envContent.split('\n');

  lines.forEach(line => {
    const charList = line.split('');
    const equalSignIndex = charList.findIndex(char => char === '=');

    const key = charList.slice(0, equalSignIndex).join('');
    const value = charList.slice(equalSignIndex + 1, charList.length).join('');

    const finalValue = hasQuotes(value) ?  value.slice(1, -1) : value;

    process.env[key] = finalValue;
  })
}

const config = ({path = '.env'} = {}) => {
  let envContent;
  try {
    envContent = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      try {
        envContent = fs.readFileSync('.env.local', 'utf-8');
      } catch {}
    }
  }
  parseEnv(envContent);
}


export {
  config
};
config()