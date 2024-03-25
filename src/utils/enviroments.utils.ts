import 'dotenv/config';
class TEnviroments {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_DATABASE: string;
  PORT: number;
  MODE: 'DEV' | 'PRD' | 'TST';
  DATABASE_TYPE: 'mysql' | 'postgres';
}

enum EEnviroments {
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_DATABASE = 'DATABASE_DATABASE',
  PORT = 'PORT',
  MODE = 'MODE',
  DATABASE_TYPE = 'DATABASE_TYPE',
}

const toNumber = [EEnviroments.DATABASE_PORT, EEnviroments.PORT];

class Enviroments {
  constructor(private enviroment: { [env: string]: string | undefined }) {}

  public envs: TEnviroments = {
    DATABASE_HOST: '',
    DATABASE_PORT: null,
    DATABASE_USER: '',
    DATABASE_PASSWORD: '',
    DATABASE_DATABASE: '',
    PORT: null,
    MODE: 'DEV',
    DATABASE_TYPE: 'postgres',
  };

  private toNumber(env: string, eEnv: string): number | string {
    if (toNumber.find((env) => env === eEnv)) return parseFloat(env);
    return env;
  }

  private getValue(eEnv: string, throwOnMissing = true): string | number {
    const value = this.enviroment[eEnv];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${eEnv}`);
    }
    this.envs[eEnv] = this.toNumber(value, eEnv);
    return this.envs[eEnv];
  }

  public takeValues(enviroments: Array<string>) {
    enviroments.forEach((env) => this.getValue(env, true));
    return this;
  }

  public isProduction() {
    //todo: add to enum
    return this.envs.MODE != 'DEV';
  }
}

const configEnviroments = new Enviroments(process.env).takeValues(
  Object.values(EEnviroments),
);

const enviroments: TEnviroments = configEnviroments.envs;

export { Enviroments, configEnviroments, enviroments };
