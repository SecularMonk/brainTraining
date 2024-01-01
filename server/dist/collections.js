import { MongoDataSource } from "apollo-datasource-mongodb";
export class IUsers extends MongoDataSource {
    getUser(userId) {
        if (!userId)
            return;
        return this.findOneById(userId);
    }
}
export class IIcons extends MongoDataSource {
    getAnything() {
        return this.findByFields({ type: "svg" });
    }
}
export class IQuizzes extends MongoDataSource {
}
