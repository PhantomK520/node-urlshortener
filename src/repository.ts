import validURL from 'valid-url';
import { customAlphabet } from 'nanoid'
import { URLStoreModel } from './models';
import { URLStore } from './interface';
export class URLStoreRepository {

    static async shortenURL(url: string): Promise<string> {
        try {
            if (validURL.isUri(url)) {
                const nanoId = customAlphabet('1234567890abcdef', 5)
                const code = nanoId();
               const savedURLStore =  await URLStoreModel.create({
                    originalURL: url,
                    shortenURL: `${process.env.BASE_URL}/${code}`,
                    shortenCode: code,

               });
                return savedURLStore.shortenURL;

            } else {
                throw new Error("Invalid URL");
            }
        }
        catch (error) {
            throw new Error(error as string)
        }
    }

    static  getOriginalURL(code: string): Promise<URLStore | null>{
        return URLStoreModel.findOne({ shortenCode: code }).exec();
    }

}