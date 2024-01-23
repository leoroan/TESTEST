import fs from 'fs';

class DocumentsManager {
    constructor(folderPath) {
        this.folderPath = folderPath;
        this.initialize();
    }

    initialize() {
        // Check if the folder exists, if  not, create it
        if (!fs.existsSync(this.folderPath)) {
            fs.mkdirSync(this.folderPath);
        }
    }

    // createDocument(fileName, content) {
    //     const filePath = `${this.folderPath}/${fileName}.txt`;

    //     fs.writeFileSync(filePath, content);
    //     console.log(`Document "${fileName}" created successfully.`);
    // }

    // readDocument(fileName) {
    //     const filePath = `${this.folderPath}/${fileName}.txt`;

    //     try {
    //         const content = fs.readFileSync(filePath, 'utf-8');
    //         console.log(`Content of "${fileName}":\n${content}`);
    //     } catch (err) {
    //         console.error(`Error reading document "${fileName}": ${err.message}`);
    //     }
    // }

    // updateDocument(fileName, newContent) {
    //     const filePath = `${this.folderPath}/${fileName}.txt`;

    //     try {
    //         fs.writeFileSync(filePath, newContent);
    //         console.log(`Document "${fileName}" updated successfully.`);
    //     } catch (err) {
    //         console.error(`Error updating document "${fileName}": ${err.message}`);
    //     }
    // }

    // deleteDocument(fileName) {
    //     const filePath = `${this.folderPath}/${fileName}.txt`;

    //     try {
    //         fs.unlinkSync(filePath);
    //         console.log(`Document "${fileName}" deleted successfully.`);
    //     } catch (err) {
    //         console.error(`Error deleting document "${fileName}": ${err.message}`);
    //     }
    // }
}