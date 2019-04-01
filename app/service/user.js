const { models, getUser, getUserCaseList } = require('../dao/mongo');

class UserService {
    async greet({
        who, when
    }) {
        const now = '[' + (who || 'hello world') + ']: ' + (when || (new Date * 1));
        return new Promise(res => {
            setTimeout(() => {
                res(now);
            }, 200);
        });
    }
    async mongoCreate() {
        const now = new Date;
        let mobile = '111222' + ~~(Math.random() * 100000);
        while (mobile.length < 11) {
            mobile += '0';
        }
        return models.User.create({
            first_name: 'first',
            last_name: 'last',
            mobile,
            age: 24,
            created_at: now,
            updated_at: now,
            cases: [
                { name: mobile, time: now },
                { name: 'assassin', time: now }
            ]
        });
    }
    async userList() {
        return models.User.find().lean();
    }
    async removeOne(uid) {
        const res = await models.User.remove({ _id: uid });
        return (res.n > 0) ? { success: true } : {
            success: false
        };
        /*
        // or another way
        const user = await models.User.findById(uid);
        if (user) {
            await user.remove();
            return { success: true };
        } else {
            return { success: false, message: `user not found ${uid}` };
        }
        */
    }
    async mongoOne(uid) {
        return getUser(uid);
    }
    async mongoCase(uid) {
        const res = await getUserCaseList(uid);
        return res;
    }
    async addHobbies(uid, hobbies) {
        return models.User.findOneAndUpdate(
            {
                _id: uid
            },
            {
                $push: { hobbies: hobbies }
            }, {
                'new': true
            });
    }
}

module.exports = UserService;
