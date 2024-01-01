import { MongoDataSource } from "apollo-datasource-mongodb";
class Users extends MongoDataSource {
    getUser(userId) {
        if (!userId)
            return;
        return this.findOneById(userId);
    }
}
class Icons extends MongoDataSource {
    getAnything() {
        return this.findByFields({ type: "svg" });
    }
}
export { Users, Icons };
