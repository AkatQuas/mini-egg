class UserService {
    async greet ({
                     who, when
                 }) {
        const now = '[' + (who || 'hello world') + ']: ' + (when || (new Date * 1));
        return new Promise(res => {
            setTimeout(() => {
                res(now);
            }, 200);
        });
    }
}

module.exports = UserService;
