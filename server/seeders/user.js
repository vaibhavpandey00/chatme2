import { User } from "../models/userModel.js";
import { faker } from "@faker-js/faker";


const createUser = async (numUsers) => {
    try {

        const usersPromise = [];

        for (let i = 0; i < numUsers; i++) {

            const tempUser = User.create({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "password",
                bio: faker.lorem.sentence(10),
                avatar: {
                    public_id: faker.system.fileName(),
                    url: faker.image.avatar(),
                },
            });
            usersPromise.push(tempUser);
        }

        await Promise.all(usersPromise);

        console.log("Users created successfully", numUsers);
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default createUser;