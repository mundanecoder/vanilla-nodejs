import fs from 'fs';
import path from 'path';

export function loadEnv(envFilePath = '.env') {
  

    const envPath = path.resolve(process.cwd(), envFilePath);


    if (!fs.existsSync(envPath)) {
        console.warn(`.env file not found at ${envPath}`);
        return;
    }

    const envFileContent = fs.readFileSync(envPath, 'utf-8');

    envFileContent.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine === '' || trimmedLine.startsWith('#')) return;
    
        const [key, value] = line.split('=');

        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}