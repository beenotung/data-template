import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export let env = {
  NODE_ENV: 'development',
  PORT: 8100,
}

populateEnv(env, { mode: 'halt' })
