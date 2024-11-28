import {
    Account,
    Avatars,
    Client,
    Storage,
    Databases,
    ID,
    Query,
} from "appwrite";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: "6748045e00309adc2918",
    databaseId: "674804740027388e661e",
    bucketId: "674804a2002ba4e5bec2",
    bucketId2: "67484288000d87339d44",
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

export async function getAllPictures() {
    try {
        const allPictures = await storage.listFiles(
            appwriteConfig.bucketId
        );

        return allPictures
    } catch (error) {
        console.log(error);
        throw new Error("Error : " + error)
    }
}
export async function getAllPictures2() {
    try {
        const allPictures = await storage.listFiles(
            appwriteConfig.bucketId2,
            [Query.limit(16)]
        );

        return allPictures
    } catch (error) {
        console.log(error);
        throw new Error("Error : " + error)
    }
}