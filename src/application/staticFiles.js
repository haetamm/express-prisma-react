import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const setupStaticFiles = (app) => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    app.use(express.static(path.join(__dirname, '../../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
    });
};

export default setupStaticFiles;
